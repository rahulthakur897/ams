import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  FlatList,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import {APP_IMAGE, BASEURL, COLOR} from '../../../constants';
import {fetchUserTask, removeTask} from '../../../store/actions/attendance';
import {Storage} from '../../../utils';
import styles from './style';

type Task = {
  id: string;
  title: string;
  subtitle: string;
};

export default function TaskList() {
  const dispatch = useDispatch();
  const {selectedBiller, taskList, latitude, longitude} = useSelector(
    state => state.userReducer,
  );
  const {parentList, selectedParentTask, childTaskList} = useSelector(
    state => state.attendanceReducer,
  );

  const removeTaskName = async () => {
    //api call object
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/RemoveAirtelTaskAsDraft?GroupId==${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(removeTask(config));
  };

  const getUserTask = async () => {
    //api call object
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/RemoveAirtelTaskAsDraft?GroupId==${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchUserTask(config));
  };

  useEffect(() => {
    // removeTaskName();
  }, []);

  const showConfirmAlert = () => {
    console.log('Hello');
  };

  const tasks: Task[] = [
    {id: '1', title: 'Task 1', subtitle: 'Sub task'},
    {id: '2', title: 'Task 2', subtitle: 'Sub task'},
    {id: '3', title: 'Task 3', subtitle: 'Sub task'},
    {id: '4', title: 'Task 4', subtitle: 'Sub task'},
    {id: '5', title: 'Task 5', subtitle: 'Sub task'},
  ];

  const renderItem = ({item}: {item: Task}) => (
    <View style={styles.taskCard}>
      <View>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <Text style={styles.taskSubtitle}>{item.subtitle}</Text>
      </View>
      <TouchableOpacity>
        <FeatherIcon
          onPress={showConfirmAlert}
          name={'trash-2'}
          size={20}
          color={COLOR.gray}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        {/* Card with Camera & Location Permissions */}
        <View style={{marginLeft: 20, marginRight: 10}}>
          {/* Select Box */}
          <FlatList
            data={tasks}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.listContainer}
          />
        </View>
        {/* Checkout Out */}
      </View>
    </ImageBackground>
  );
}
