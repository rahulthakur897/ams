import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Pressable,
  Image,
  Alert,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../constants';
import {Storage, transformDealerData} from '../../utils';
import {
  getDealerList,
  fetchTaskList,
  updateDealer,
  resetUserLatLong,
  updateAttFlag,
} from '../../store/actions/user';
import {markAttn, checkAttnStatus} from '../../store/actions/attendance';
import {MyDropdown} from '../../components/MyDropdown';
import {GetCamera} from '../../components/GetCamera';
import {GetUserCurrentLocation} from '../../components/GetLocation';
import styles from './style';
const _ = require('lodash');

export default function MarkAttendance() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const cameraRef = useRef();
  const locRef = useRef();

  const {dealerList, selectedDealer, taskList, latitude, longitude, attFlag} =
    useSelector(state => state.userReducer);
  const {attendanceData, empAttID} = useSelector(
    state => state.attendanceReducer,
  );

  const [selectedDealerHook, setSelectedDealer] = useState(selectedDealer);
  const [cameraStatus, setIsCameraReady] = useState(false);
  const [locationStatus, setIsLocationReady] = useState(false);

  const getTaskList = async () => {
    const userData = await Storage.getAsyncItem('userData');
    // const selDealer = await Storage.getAsyncItem('selectedDealer');
    // setSelectedDealer(selDealer);
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetAirtelDraftedTasksSubTasks?EmpAttID=${empAttID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskList(config));
  };

  useEffect(() => {
    if (_.size(attendanceData)) {
      if (
        attendanceData.TimeOut === null &&
        attendanceData.ApprovedOrRejected === 'P'
      ) {
        const selected = {
          label: attendanceData.DealerName,
          value: attendanceData.DealerID,
        };
        dispatch(updateDealer(selected));
        //dispatch(updateAttFlag('ReadyForCheckOut'));
      }
      getTaskList();
    }
  }, [attendanceData]);

  const getDealer = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getDealerList(config));
  };

  const getAttendanceRecord = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/PendingApprovalAttendanceCheck?EmployeeID=${
        userData.EmployeeID
      }&AppliedOn=${moment().format('MM-DD-YYYY')}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(checkAttnStatus(config));
  };

  useEffect(() => {
    getDealer();
    getAttendanceRecord();
  }, [attFlag]);

  const callChildMethod = async () => {
    if (cameraRef.current) {
      const photoResp = await cameraRef.current.takePhoto();
      return photoResp;
    }
  };

  const enableChildComponent = () => {
    cameraRef?.current?.clearPhotoPath();
    locRef?.current?.requestLocationPermission();
  };

  const updateDropdownValue = item => {
    setSelectedDealer(item);
    dispatch(updateDealer(item));
    enableChildComponent();
  };

  const closeDialog = () => {
    dispatch(resetUserLatLong());
    dispatch(updateAttFlag('ReadyForCheckOut'));
    enableChildComponent();
    refRBSheet.current.close();
  };

  const punchAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const imageBase64Data = await callChildMethod();
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/PunchInOut`,
      data: {
        EmployeeId: userData.EmployeeID,
        Longitude: latitude,
        Latitude: longitude,
        DealerID: selectedDealerHook?.value,
        EmpAttID: 0,
        DeviceIPAddress: '',
        Browser: 'MobileApp',
        Operatingsystems: 'Mobile',
        Hardwaretypes: 'Mobile',
        DeviceID: '',
        UserAgent: '',
        GeolocationMsg: '',
        Remarks: '',
        ImageSavefullPath: imageBase64Data,
        IsImageBase64: true,
      },
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(markAttn(config));
    refRBSheet.current.open();
  };

  const getTaskListCount = () => {
    callChildMethod();
    if (_.size(taskList)) {
      navigation.navigate(Screen.TASKLIST);
    } else {
      navigation.navigate(Screen.ADDTASKS);
    }
  };

  const checkSelectedDealer = () => {
    if (!_.size(selectedDealerHook)) {
      Alert.alert('', 'Please select Dealer');
      return;
    }
  };

  const getLocationCurrentStatus = (currentState) => {
    setIsLocationReady(currentState);
  };

  const getCameraCurrentStatus = (currentState) => {
    setIsCameraReady(currentState);
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.container}>
          {/* Dropdown to Choose Dealer */}
          <MyDropdown
            dropdownList={transformDealerData(dealerList)}
            selectedItem={selectedDealerHook}
            placeholder="Select Dealer"
            disable={attFlag === 'ReadyForCheckIn' ? false : true}
            callback={updateDropdownValue}
          />
          {/* Card with Camera & Location Permissions */}
          {/* show camera */}
          <View style={styles.cameraContainer}>
          {_.size(selectedDealerHook) ? (
            <GetCamera ref={cameraRef} cbCameraReady={getCameraCurrentStatus} />
            ) : (
              <View style={styles.permissionCard}>
                {/* Placeholder for Icon */}
                <View style={styles.iconss}>
                  <Icon name="camera-alt" size={74} color="#ccc" />
                  <Icon
                    name="location-pin"
                    size={74}
                    color="#ccc"
                    style={{marginLeft: 5}}
                  />
                </View>
                <Text style={styles.cardTitle}>
                  Enable Camera & Location Access
                </Text>
                <Text style={styles.cardSubtitle}>
                  We need your permission to access the camera and location
                </Text>
                {/* Allow Access Button */}
                <Pressable
                  style={styles.allowAccessButton}
                  onPress={checkSelectedDealer}>
                  <Text style={styles.allowAccessText}>Allow Access</Text>
                </Pressable>
              </View>
            )}
          </View>

          {/* show location */}
          <GetUserCurrentLocation ref={locRef} cbLocationReady={getLocationCurrentStatus} currentAttStatus={attFlag} />
          {/* Check-In Button */}
          {attFlag === 'ReadyForCheckOut' ? (
            <Pressable
              style={
                _.size(selectedDealerHook) && locationStatus && cameraStatus
                  ? styles.checkInButton
                  : styles.checkInButtonDisable
              }
              disabled={_.size(selectedDealerHook) && locationStatus && cameraStatus ? false : true}
              onPress={() => getTaskListCount()}>
              <Text style={styles.checkInText}>Proceed Next for Check Out</Text>
            </Pressable>
          ) : null}
          {attFlag === 'ReadyForCheckIn' ? (
            <Pressable
              style={
                _.size(selectedDealerHook) && locationStatus && cameraStatus
                  ? styles.checkInButton
                  : styles.checkInButtonDisable
              }
              disabled={_.size(selectedDealerHook) && locationStatus && cameraStatus ? false : true}
              onPress={() => punchAttendance()}>
              <Text style={styles.checkInText}>Check In</Text>
            </Pressable>
          ) : null}
        </View>
        {/* success msg bottom sheet */}
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          height={280}
          customStyles={{
            wrapper: {
              backgroundColor: COLOR.lightBlack,
            },
            container: {
              borderTopLeftRadius: 32,
              borderTopRightRadius: 32,
            },
            draggableIcon: {
              backgroundColor: COLOR.black,
            },
          }}
          customModalProps={{
            animationType: 'slide',
            statusBarTranslucent: true,
          }}
          customAvoidingViewProps={{
            enabled: true,
          }}>
          <View style={{margin: 20, alignItems: 'center'}}>
            <Image source={APP_IMAGE.success} style={styles.successImg} />
            <Text style={styles.successText}>Success</Text>
            <Text style={styles.successAddText}>
              Your Check In has been marked at
            </Text>
            <Text style={styles.successAddText}>
              {moment().format('DD/MM/YYYY')} {moment().format('LTS')}
            </Text>
            <Pressable style={styles.popupButton} onPress={() => closeDialog()}>
              <Text style={styles.popupButtonText}>Close</Text>
            </Pressable>
          </View>
        </RBSheet>
      </ImageBackground>
    </ScrollView>
  );
}
