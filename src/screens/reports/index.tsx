import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  PermissionsAndroid,
  Alert,
  Linking,
  Platform,
} from 'react-native';
import {APP_IMAGE, BASEURL} from '../../constants';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import * as XLSX from 'xlsx';
import {downloadEmpReport} from '../../store/actions/report';
import {Storage} from '../../utils';
import styles from './style';
const RNFS = require('react-native-fs');
const _ = require('lodash');

export default function Reports() {
  const dispatch = useDispatch();

  const {userReport} = useSelector(state => state.reportReducer);

  const exportDataToExcel = () => {
    let wb = XLSX.utils.book_new();
    let ws = XLSX.utils.json_to_sheet(userReport);
    XLSX.utils.book_append_sheet(wb,ws,'Users');
    const wbout = XLSX.write(wb, {type:'binary', bookType:'xlsx'});

    // Write generated excel to Storage
    RNFS.writeFile(RNFS.ExternalStorageDirectoryPath + '/Download/attendance_report.xlsx', wbout, 'ascii').then((r)=>{
     console.log('Success');
    }).catch((e)=>{
      console.log('Error', e);
    });
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (!isPermitedExternalStorage) {
        // Ask for permission
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'AMS app Storage Permission Required',
            message: 'AMS app needs access to your storage to save files.',
            buttonNeutral: 'Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        console.log('storage granted', granted);
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Permission Granted (calling our exportDataToExcel function)
          exportDataToExcel();
          console.log('Permission granted');
        } else {
          // Permission denied
          console.log('Permission denied');
          if (Number(Platform.Version) >= 33) {
            exportDataToExcel();
            return;
          }
          Alert.alert(
            'Storage Permission Required',
            'Please enable storage services in settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }
      } else {
        // Already have Permission (calling our exportDataToExcel function)
        exportDataToExcel();
      }
    } catch (e) {
      console.log('Error while checking permission');
      console.log(e);
      return;
    }
  };

  useEffect(() => {
    handleClick();
  }, [userReport]);

  const downloadReport = async () => {
    const fromDate = moment().startOf('month').format('YYYY-MM-DD');
    const toDate = moment().endOf('month').format('YYYY-MM-DD');
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/TeamDetailAttendanceCheck?EmployeeID=${userData.EmployeeID}&fromdate=${fromDate}&todate=${toDate}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(downloadEmpReport(config));
  };

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        <View style={{flexDirection: 'row'}} />
        <View style={styles.permissionCard}>
          <Icon name="file-table-outline" size={100} color="#ccc" />
          <Text style={styles.heading}>Thank You</Text>
          <Text style={styles.cardSubtitle}>
            Please download your task wise report
          </Text>
        </View>
        <View style={{marginHorizontal: 15}}>
          <Pressable style={styles.checkinbutton} onPress={downloadReport}>
            <Text style={styles.checkinbuttonText}>{'Download Report'}</Text>
          </Pressable>
        </View>
      </View>
    </ImageBackground>
  );
}
