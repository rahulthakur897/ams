import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MarkAttendance from './MarkAttendance';
import SelectTask from './SelectTask';
import TaskListHeader from './TaskList/TaskListHeader';
import TaskList from './TaskList';
import AddTasks from './AddTasks';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarkAttendance"
        options={{
          title: 'Apply Attendance',
          headerLeft: ()=> null,
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
          headerTitle: () => <TaskListHeader />, // Set the custom header component 
        }}
        component={TaskList}
      />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
