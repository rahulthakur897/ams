import React, {useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  Image,
  ImageBackground,
  Pressable,
  Alert,
  ActivityIndicator,
} from 'react-native';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../../constants';
import {
  fetchUserTask,
  fetchTaskNameList,
  removeTask,
  markAttn,
} from '../../../store/actions/attendance';
import {
  resetUserLatLong,
} from '../../../store/actions/user';
import {Storage} from '../../../utils';
import styles from './style';
const _ = require('lodash');

const RenderTaskRow = ({item, allTaskList, removeRow}) => {
  const getTaskName = () => {
    const selectedRow = allTaskList.find(
      task => task.AirtelTaskID === item.TaskId,
    );
    if (_.size(selectedRow)) {
      return selectedRow.TaskName;
    }
    return '';
  };

  const getSubTaskName = () => {
    const selectedRow = allTaskList.find(
      task => task.AirtelTaskID === item.SubTaskId,
    );
    if (_.size(selectedRow)) {
      return selectedRow.TaskName;
    }
    return '';
  };

  const showConfirmDialog = () => {
    Alert.alert('Confirm Action', 'Are you sure you want to proceed?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => removeRow()},
    ]);
  };

  return (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.taskTitle}>{getTaskName(item.TaskId)}</Text>
        <Text style={styles.taskSubtitle}>
          {getSubTaskName(item.SubTaskId)}
        </Text>
      </View>
      <Pressable>
        <FeatherIcon
          onPress={showConfirmDialog}
          name={'trash-2'}
          size={20}
          color={COLOR.gray}
        />
      </Pressable>
    </View>
  );
};

export default function TaskList() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const refRBSheet = useRef();

  const {empAttID, allUserTasks, allTaskList} = useSelector(
    state => state.attendanceReducer,
  );

  const getTaskNameList = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTasksDetail`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskNameList(config));
  };

  useEffect(() => {
    getTaskNameList();
  }, []);

  const removeUserTask = async taskGroupId => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/RemoveAirtelTaskAsDraft`,
      data: {
        GroupId: taskGroupId,
      },
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(removeTask(config));
  };

  const getUserTask = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetAirtelDraftedTasksSubTasks?EmpAttID=${empAttID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchUserTask(config));
  };

  useEffect(() => {
    getUserTask();
  }, []);

  const punchAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const selectedDealer = await Storage.getAsyncItem('selectedDealer');
    const latlong = await Storage.getAsyncItem('latlong');
    const imgBase64 = await Storage.getAsyncItem('imgBase64');
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/PunchInOut`,
      data: {
        EmployeeId: userData.EmployeeID,
        Longitude: latlong.latitude,
        Latitude: latlong.longitude,
        DealerID: selectedDealer?.value,
        EmpAttID: empAttID || 0,
        DeviceIPAddress: '',
        Browser: 'MobileApp',
        Operatingsystems: 'Mobile',
        Hardwaretypes: 'Mobile',
        DeviceID: '',
        UserAgent: '',
        GeolocationMsg: '',
        Remarks: '',
        ImageSavefullPath: imgBase64,
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
    dispatch(resetUserLatLong());
    Storage.clearAsyncItem('selectedDealer');
    navigation.navigate(Screen.MARKATTENDANCE);
  };

  return (
    <View>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.flatListContainer}>
          {_.size(allTaskList) > 0 ? (
            <FlatList
              extraData={allUserTasks}
              data={allUserTasks}
              renderItem={({item, index}) => (
                <RenderTaskRow
                  item={item}
                  allTaskList={allTaskList}
                  removeRow={() => removeUserTask(item.GroupID)}
                />
              )}
              keyExtractor={item => item.GroupID}
              contentContainerStyle={styles.listContainer}
            />
          ) : (
            <ActivityIndicator size={'large'} color={COLOR.blue} />
          )}
        </View>
        <Pressable
          style={
            _.size(allUserTasks)
              ? styles.checkInButton
              : styles.checkInButtonDisable
          }
          disabled={_.size(allUserTasks) ? false : true}
          onPress={() => punchAttendance()}>
          <Text style={styles.checkInText}>Checkout</Text>
        </Pressable>
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
              Your Check Out has been marked at
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
    </View>
  );
}
