import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Pressable,
  Image,
  Alert,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../constants';
import {Storage, transformDealerData, validateAttendanceTiming} from '../../utils';
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
    useSelector((state: any) => state.userReducer);
  const {attendanceData, empAttID, taskSaveError} = useSelector(
    (state: any) => state.attendanceReducer,
  );

  useEffect(() => {
    if(_.size(taskSaveError)){
      setBtnClicked(false);
    }
  }, [taskSaveError]);

  const [selectedDealerHook, setSelectedDealer] = useState(selectedDealer);
  const [newDealerName, setNewDealerName] = useState('');
  const [cameraStatus, setIsCameraReady] = useState(false);
  const [locationStatus, setIsLocationReady] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const getTaskList = () => {
    const userData = Storage.getAsyncItem('userData');
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
        setSelectedDealer(selected);
        setNewDealerName(attendanceData.Remarks);
        dispatch(updateDealer(selected));
        dispatch(updateAttFlag('ReadyForCheckOut'));
      }
      getTaskList();
    }
  }, [attendanceData]);

  const getDealer = () => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getDealerList(config));
  };

  const getAttendanceRecord = () => {
    const userData = Storage.getAsyncItem('userData');
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
  }, []);

  const callChildMethod = async () => {
    if (cameraRef.current) {
      const photoResp = await cameraRef.current.takePhoto();
      return photoResp;
    }
  };

  const enableChildComponent = () => {
    cameraRef?.current?.clearPhotoPath();
    locRef?.current?.checkForLocationEnabled();
  };

  const updateDropdownValue = (item: any) => {
    if(item.label !== 'Others'){
      setNewDealerName('');
    }
    setSelectedDealer(item);
    dispatch(updateDealer(item));
    enableChildComponent();
  };

  const closeDialog = () => {
    dispatch(resetUserLatLong());
    setIsCameraReady(false);
    enableChildComponent();
    refRBSheet.current.close();
  };

  const punchAttendance = async () => {
    //validate time check
    // const isPunchTimeValid = validateAttendanceTiming();
    // if(!isPunchTimeValid){
    //   Alert.alert('Warning', 'Attendance can be marked between 8 AM and 8 PM');
    //   return;
    // }
    //check for other selection
    if(selectedDealerHook?.value === 'Others'){
      if(!newDealerName){
        Alert.alert('Error', 'Please enter location detail');
        return;
      }
    }
    if(btnClicked) {return;}
    setBtnClicked(true);
    const userData = Storage.getAsyncItem('userData');
    const imageBase64Data = await callChildMethod();
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/PunchInOut`,
      data: {
        EmployeeId: userData.EmployeeID,
        Longitude: longitude,
        Latitude: latitude,
        DealerID: selectedDealerHook?.value,
        EmpAttID: 0,
        DeviceIPAddress: '',
        Browser: 'MobileApp',
        Operatingsystems: 'Mobile',
        Hardwaretypes: 'Mobile',
        DeviceID: '',
        UserAgent: '',
        GeolocationMsg: '',
        Remarks: newDealerName,
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

  // const checkSelectedDealer = () => {
  //   if (!_.size(selectedDealerHook)) {
  //     Alert.alert('', 'Please select Dealer');
  //     return;
  //   }
  // };

  const getLocationCurrentStatus = (currentState: boolean) => {
    console.log("getLocationCurrentStatus", currentState);
    setIsLocationReady(currentState);
    checkBtnStatus();
  };

  const getCameraCurrentStatus = (currentState: boolean) => {
    console.log("getCameraCurrentStatus", currentState);
    setIsCameraReady(currentState);
    checkBtnStatus();
  };

  const checkBtnStatus = () => {
    let btnStatus = true;
    if(_.size(selectedDealerHook)){
      if(selectedDealerHook.label === 'Others' && !newDealerName){
        btnStatus = false;
      }
    } else {
      btnStatus = false;
    }
    if(!locationStatus || !(latitude && longitude)){
      btnStatus = false;
    }
    return btnStatus;
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
          {selectedDealerHook?.label === 'Others' ? (
            <TextInput
              value={newDealerName}
              placeholderTextColor={COLOR.gray}
              placeholder="Enter location detail"
              onChangeText={txt => setNewDealerName(txt)}
              editable={attFlag === 'ReadyForCheckIn' ? true : false}
              style={[styles.inputText, {backgroundColor: attFlag === 'ReadyForCheckIn' ? COLOR.white : COLOR.hexgray}]}
            />
          ) : null}
          {/* Card with Camera & Location Permissions */}
          {/* show camera */}
          <View style={styles.cameraContainer}>
            <GetCamera
              ref={cameraRef}
              cbCameraReady={getCameraCurrentStatus}
            />
            {/* {_.size(selectedDealerHook) ? (
              <GetCamera
                ref={cameraRef}
                cbCameraReady={getCameraCurrentStatus}
              />
            ) : (
              <View style={styles.permissionCard}>
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
                <Pressable
                  style={styles.allowAccessButton}
                  onPress={checkSelectedDealer}>
                  <Text style={styles.allowAccessText}>Allow Access</Text>
                </Pressable>
              </View>
            )} */}
          </View>

          {/* show location */}
          <GetUserCurrentLocation
            ref={locRef}
            cbLocationReady={getLocationCurrentStatus}
            currentAttStatus={attFlag}
          />
          {/* Check-In Button */}
          {attFlag === 'ReadyForCheckOut' ? (
            <Pressable
              style={
                checkBtnStatus()
                  ? styles.checkInButton
                  : styles.checkInButtonDisable
              }
              disabled={
                checkBtnStatus()
                  ? false
                  : true
              }
              onPress={() => getTaskListCount()}>
              <Text style={styles.checkInText}>Proceed Next for Check Out</Text>
            </Pressable>
          ) : null}
          {attFlag === 'ReadyForCheckIn' ? (
            <Pressable
              style={
                checkBtnStatus()
                  ? styles.checkInButton
                  : styles.checkInButtonDisable
              }
              disabled={
                checkBtnStatus()
                  ? false
                  : true
              }
              onPress={() => punchAttendance()}>
              <Text style={styles.checkInText}>Check In</Text>
            </Pressable>
          ) : null}
        </View>
        {/* success msg bottom sheet */}
        <RBSheet
          ref={refRBSheet}
          useNativeDriver={false}
          closeOnPressMask={false}
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
