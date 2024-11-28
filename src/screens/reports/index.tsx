import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Pressable,
  PermissionsAndroid,
  Alert,
  Linking,
  NativeModules,
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
const { RequestStorageModule } = NativeModules;

export default function Reports() {
  const dispatch = useDispatch();

  const {userReport} = useSelector((state: any) => state.reportReducer);

  const exportDataToExcel = async () => {
    const ws = XLSX.utils.json_to_sheet(userReport);
    let wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'attendance_report');
    const excelBuffer = XLSX.writeXLSX(wb, {
      bookType: 'xlsx',
      type: 'array',
  });
  if(_.size(excelBuffer) > 1){
    const storageAccess = await RequestStorageModule.fileAccessPermission('attendance_report', excelBuffer);
    const path = `${RNFS.DownloadDirectoryPath}/attendance_report.xlsx`;
    // await RNFS.writeFile(path, wbout, 'ascii');
    Alert.alert('Success', `File saved to: ${path}`);
  }
  };

  const handleClick = async () => {
    try {
      // Check for Permission (check if permission is already given or not)
      let isPermitedExternalStorage = await PermissionsAndroid.check(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );
      console.log('isPermitedExternalStorage', isPermitedExternalStorage);

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
          exportDataToExcel();
          // if (Number(Platform.Version) >= 33) {
          //
          //   return;
          // }
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
