import React, { useEffect, useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { APP_IMAGE, BASEURL } from '../../constants';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchtEmpAttendanceDetail } from '../../store/actions/report';
import { Storage } from '../../utils';
import styles from './style';
import moment from 'moment';
export default function Reports() {
  const dispatch = useDispatch();

  const { getEmpAttendanceDetail } = useSelector(state => state.attendanceReducer);
  // Fetch attendance data from the API
  const fetchEmpAttendanceSheet = async (fromDate: any, toDate: any) => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/TeamDetailAttendanceCheck?EmployeeID=${userData.EmployeeID}&fromdate=${fromDate}&todate=${toDate}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    console.log('*****************config*******************************',config);
    dispatch(fetchtEmpAttendanceDetail(config));
  };

  useEffect(() => {
    const initialStart = moment().startOf('month').format('YYYY-MM-DD');
    const initialEnd = moment().endOf('month').format('YYYY-MM-DD');
    fetchEmpAttendanceSheet(initialStart, initialEnd);
  }, []);

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row' }} />

        {/* Card with Camera & Location Permissions */}
        <View style={styles.permissionCard}>
          {/* Placeholder for Icon */}
          <Icon name="camera-alt" size={100} color="#ccc" />
          <Text style={styles.heading}>Thank You</Text>
          <Text style={styles.cardSubtitle}>
            Please download your report
          </Text>


        </View>
        <View style={{ flexDirection: 'row', marginLeft: 18 }}>
          <TouchableOpacity style={styles.checkinbutton} >
            <Text style={styles.checkinbuttonText}>{'Download Report'}</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom Navigation */}
      </View>
    </ImageBackground>
  );
}
