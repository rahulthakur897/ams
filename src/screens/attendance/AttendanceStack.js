import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MarkAttendance from './MarkAttendance';
import PhotoAndLocation from './PhotoAndLocation';

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
    </Stack.Navigator>
  );
};

export default AttendanceStack;
