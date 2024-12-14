import React, {useCallback, useEffect} from 'react';
import {
  Alert,
  ScrollView,
  View,
  Text,
  Image,
  ImageBackground,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useFocusEffect} from '@react-navigation/native';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {updateAttFlag} from '../../../store/actions/user';
import {checkAttnStatus} from '../../../store/actions/attendance';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../../constants';
import {Storage, showToast, validateAttendanceTiming} from '../../../utils';
import styles from './style';
const _ = require('lodash');

export default function AttendanceDashboard() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const {attFlag} = useSelector((state: any) => state.userReducer);
  const {isAttnLoading, attendanceData} = useSelector(
    (state: any) => state.attendanceReducer,
  );

  useEffect(() => {
    if (_.size(attendanceData)) {
      if (
        attendanceData.TimeOut === null &&
        attendanceData.ApprovedOrRejected === 'P'
      ) {
        dispatch(updateAttFlag('ReadyForCheckOut'));
      }
    }
  }, [attendanceData]);

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

  useFocusEffect(
    useCallback(() => {
      getAttendanceRecord();
    }, []),
  );

  const navigateScreen = (btnType: string) => {
    const {DealerID, DealerName, Remarks} = attendanceData || {};
    //validate time check
    const isPunchTimeValid = validateAttendanceTiming();
    if(!isPunchTimeValid){
      Alert.alert('Warning', 'Attendance can be marked between 8 AM and 8 PM');
      return;
    }
    if (btnType === 'CheckIn') {
      if (attFlag === 'ReadyForCheckIn') {
        navigation.navigate(Screen.MARKINATTENDANCE);
      } else {
        showToast('You proceed with Check Out');
      }
    } else {
      if (attFlag === 'ReadyForCheckOut') {
        navigation.navigate(Screen.MARKOUTATTENDANCE, {
          DealerID: DealerID || 0,
          DealerName: DealerName || '',
          Remarks: Remarks || '',
        });
      } else {
        showToast('Please proceed with Check In');
      }
    }
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        {isAttnLoading ? (
          <ActivityIndicator
            style={{marginVertical: 50}}
            size={'large'}
            color={COLOR.gray}
          />
        ) : (
          <View style={styles.box}>
            <Pressable
              onPress={() => navigateScreen('CheckIn')}
              style={[
                styles.boxContainer,
                {
                  backgroundColor:
                    attFlag === 'ReadyForCheckIn' ? COLOR.white : COLOR.hexgray,
                },
              ]}>
              <Image source={APP_IMAGE.checkIn} />
              <Text style={styles.boxText}>Check In</Text>
            </Pressable>
            <Pressable
              onPress={() => navigateScreen('CheckOut')}
              style={[styles.boxContainer,
                {
                  backgroundColor:
                    attFlag === 'ReadyForCheckOut' ? COLOR.white : COLOR.hexgray,
                },
              ]}>
              <Image source={APP_IMAGE.checkOut} />
              <Text style={styles.boxText}>Check Out</Text>
            </Pressable>
          </View>
        )}
        <Text style={styles.warnText}>
          * Attendance can be marked between 8 AM and 8 PM
        </Text>
      </ImageBackground>
    </ScrollView>
  );
}
