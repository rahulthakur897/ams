import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CommonActions, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch} from 'react-redux';
import MarkAttendance from './MarkAttendance';
import SelectTask from './SelectTask';
import TaskListHeader from './TaskList/TaskListHeader';
import TaskList from './TaskList';
import AddTasks from './AddTasks';
import {Storage} from '../../utils';
import {Screen, COLOR} from '../../constants';
import {doLogoutAction} from '../../store/actions/user';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const doLogout = () => {
    Storage.clearAppData();
    dispatch(doLogoutAction());
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: Screen.LOGIN}],
      }),
    );
  };

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarkAttendance"
        options={{
          title: 'Apply Attendance',
          headerLeft: () => null,
          headerRight: () => (
            <Icon
              name="logout"
              onPress={doLogout}
              size={30}
              color={COLOR.gray}
              style={{marginRight: 20}}
            />
          ),
        }}
        component={MarkAttendance}
      />
      <Stack.Screen
        name="AddTasks"
        options={{
          title: 'Add Tasks/Sub Tasks',
        }}
        component={AddTasks}
      />
      <Stack.Screen
        name="SelectTask"
        options={{
          title: 'Add Tasks/Sub Tasks',
        }}
        component={SelectTask}
      />
      <Stack.Screen
        name="TaskList"
        options={{
          headerLeft: () => null,
          headerTitle: () => <TaskListHeader />, // Set the custom header component
        }}
        component={TaskList}
      />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
