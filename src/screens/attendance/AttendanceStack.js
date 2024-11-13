import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ApplyAttendence from './ApplyAttendance';
import PhotoAndLocation from './PhotoAndLocation';
import AppliedAttendence from './AppliedAttendance';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="ApplyAttendance" options={{
          title: 'Apply Attendance',
        }} component={ApplyAttendence} />
      <Stack.Screen name="PhotoAndLocation" options={{
          title: 'Photo & Location',
        }} component={PhotoAndLocation} />
      <Stack.Screen name="Applied Attendance" component={AppliedAttendence} />
    </Stack.Navigator>
  );
};

export default AttendanceStack;
