import React, {useEffect, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Pressable,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../constants';
import {Storage, transformBillerData} from '../../utils';
import {
  getBillerList,
  fetchTaskList,
  updateBiller,
} from '../../store/actions/user';
import {markAttn, checkAttnStatus} from '../../store/actions/attendance';
import {MyDropdown} from '../../components/MyDropdown';
import {GetUserCurrentLocation} from '../../components/GetLocation';
import styles from './style';
const _ = require('lodash');

export default function MarkAttendance() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const {billerList, selectedBiller, taskList, latitude, longitude} =
    useSelector(state => state.userReducer);
  const {attendanceData} = useSelector(state => state.attendanceReducer);

  const getBiller = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getBillerList(config));
  };

  useEffect(() => {
    if (!_.size(billerList)) {
      getBiller();
    }
  }, []);

  const updateDropdownValue = item => {
    dispatch(updateBiller(item));
  };

  const closeDialog = () => {
    refRBSheet.current.close();
  };

  const punchAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const base64Credentials = btoa(`${userData.username}:${userData.password}`);
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/PunchInOut`,
      data: {
        EmployeeId: userData.EmployeeID,
        Longitude: latitude,
        Latitude: longitude,
        DealerID: '1653', //(selectedBiller.DealerID).toString(),
        EmpAttID: 0,
        DeviceIPAddress: '',
        Browser: 'MobileApp',
        Operatingsystems: 'Mobile',
        Hardwaretypes: 'Mobile',
        DeviceID: '',
        UserAgent: '',
        GeolocationMsg: '',
        Remarks: '',
        ImageSavefullPath: '',
        IsImageBase64: true,
      },
      headers: {
        Authorization: `Basic ${base64Credentials}`,
      },
    };
    dispatch(markAttn(config));
    refRBSheet.current.open();
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
    getAttendanceRecord();
  }, []);

  const getTaskList = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetAirtelDraftedTasksSubTasks?EmpAttID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskList(config));
  };

  useEffect(() => {
    if (_.size(attendanceData)) {
      getTaskList();
    }
  }, [attendanceData]);

  const getTaskListCount = () => {
    if (_.size(taskList)) {
      navigation.navigate(Screen.TASKLIST);
    } else {
      navigation.navigate(Screen.ADDTASKS);
    }
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.container}>
          {/* Dropdown to Choose Dealer */}
          <MyDropdown
            dropdownList={transformBillerData(billerList)}
            selectedItem={selectedBiller}
            placeholder="Select Biller"
            callback={updateDropdownValue}
          />
          {/* Card with Camera & Location Permissions */}
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
            <Pressable style={styles.allowAccessButton}>
              <Text style={styles.allowAccessText}>Allow Access</Text>
            </Pressable>
          </View>
          {/* show location */}
          <GetUserCurrentLocation />
          {/* Check-In Button */}
          {!_.size(attendanceData) ? (
            <Pressable
              style={styles.checkInButton}
              // disabled={true}
              onPress={() => getTaskListCount()}>
              <Text style={styles.checkInText}>Proceed Next for Check Out</Text>
            </Pressable>
          ) : null}
          {_.size(attendanceData) ? (
            <Pressable
              style={styles.checkInButton}
              // disabled={true}
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
