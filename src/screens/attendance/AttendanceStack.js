import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MarkAttendance from './MarkAttendance';
import PhotoAndLocation from './PhotoAndLocation';
import AddTasks from './tasks';
import SelectTask from './SelectTask';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarkAttendance"
        options={{
          title: 'Apply Attendance',
        }}
        component={MarkAttendance}
      />
      <Stack.Screen
        name="PhotoAndLocation"
        options={{
          title: 'Photo & Location',
        }}
        component={PhotoAndLocation}
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




    </Stack.Navigator>
  );
};

export default AttendanceStack;
