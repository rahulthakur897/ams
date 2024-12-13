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
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {APP_IMAGE, BASEURL, COLOR} from '../../../constants';
import {Storage, transformDealerData} from '../../../utils';
import {getDealerList, updateDealer} from '../../../store/actions/user';
import {markAttn} from '../../../store/actions/attendance';
import {MyDropdown} from '../../../components/MyDropdown';
import {GetCamera} from '../../../components/GetCamera';
import {useStateCallback} from '../../../components/useStateCallback';
import {GetUserCurrentLocation} from '../../../components/GetLocation';
import styles from '../style';
const _ = require('lodash');

export default function MarkInAttendance({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const cameraRef = useRef();
  const locRef = useRef();

  const {attFlag, dealerList, selectedDealer, latitude, longitude} =
    useSelector((state: any) => state.userReducer);
  const {taskSaveError} = useSelector((state: any) => state.attendanceReducer);

  useEffect(() => {
    if (_.size(taskSaveError)) {
      setBtnClicked(false);
    }
  }, [taskSaveError]);

  const [newDealerName, setNewDealerName] = useState('');
  const [cameraStatus, setIsCameraReady] = useStateCallback(false);
  const [locationStatus, setIsLocationReady] = useStateCallback(false);
  const [btnClicked, setBtnClicked] = useState(false);

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

  useEffect(() => {
    getDealer();
  }, []);

  const callChildMethod = async () => {
    if (cameraRef.current) {
      const photoResp = await cameraRef.current.takePhoto();
      return photoResp;
    }
  };

  const updateDropdownValue = (item: any) => {
    if (item.label !== 'Others') {
      setNewDealerName('');
    }
    dispatch(updateDealer(item));
  };

  const getLocationCurrentStatus = (currentState: boolean) => {
    setIsLocationReady(currentState, () => checkBtnStatus());
  };

  const getCameraCurrentStatus = (currentState: boolean) => {
    setIsCameraReady(currentState, () => checkBtnStatus());
  };

  const checkBtnStatus = () => {
    let btnStatus = true;
    if (_.size(selectedDealer)) {
      if (selectedDealer.label === 'Others' && !newDealerName) {
        btnStatus = false;
      }
    } else {
      btnStatus = false;
    }
    if (!locationStatus) {
      btnStatus = false;
    }
    if (!cameraStatus) {
      btnStatus = false;
    }
    return btnStatus;
  };

  const punchAttendance = async () => {
    if (selectedDealer?.value === 'Others') {
      if (!newDealerName) {
        Alert.alert('Error', 'Please enter location detail');
        return;
      }
    }
    if (btnClicked) {
      return;
    }
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
        DealerID: selectedDealer?.value,
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

  const closeDialog = () => {
    refRBSheet.current.close();
    navigation.navigate('AttendanceDashboard');
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.container}>
          {/* Dropdown to Choose Dealer */}
          <MyDropdown
            dropdownList={transformDealerData(dealerList)}
            selectedItem={selectedDealer}
            placeholder="Select Dealer"
            callback={updateDropdownValue}
          />
          {selectedDealer?.label === 'Others' ? (
            <TextInput
              value={newDealerName}
              placeholderTextColor={COLOR.gray}
              placeholder="Enter location detail"
              onChangeText={txt => setNewDealerName(txt)}
              style={[styles.inputText, {backgroundColor: COLOR.white}]}
            />
          ) : null}
          {/* Card with Camera & Location Permissions */}
          {/* show camera */}
          <View style={styles.cameraContainer}>
            <GetCamera ref={cameraRef} cbCameraReady={getCameraCurrentStatus} />
          </View>

          {/* show location */}
          <GetUserCurrentLocation
            ref={locRef}
            cbLocationReady={getLocationCurrentStatus}
            currentAttStatus={attFlag}
          />
          {/* Check-In Button */}
          <Pressable
            style={
              checkBtnStatus()
                ? styles.checkInButton
                : styles.checkInButtonDisable
            }
            disabled={checkBtnStatus() ? false : true}
            onPress={() => punchAttendance()}>
            <Text style={styles.checkInText}>Check In</Text>
          </Pressable>
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
