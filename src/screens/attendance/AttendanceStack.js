import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MarkIn from './MarkIn';
import MarkOut from './MarkOut';
import PhotoAndLocation from './PhotoAndLocation';

const Stack = createStackNavigator();

const AttendanceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MarkIn"
        options={{
          title: 'Apply Attendance',
        }}
        component={MarkIn}
      />
      <Stack.Screen
        name="MarkOut"
        options={{
          title: 'Apply Attendance',
        }}
        component={MarkOut}
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
