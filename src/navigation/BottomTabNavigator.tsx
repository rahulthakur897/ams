import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AttendanceStack from '../screens/attendance/AttendanceStack';
import MyCalendar from '../screens/calendar';
import Reports from '../screens/reports';
import {COLOR} from '../constants';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      activeColor="#e91e63"
      barStyle={{backgroundColor: COLOR.white, width: '100%'}}
      screenOptions={{
        tabBarActiveTintColor: 'red', // Color of the selected tab
        tabBarInactiveTintColor: 'gray', // Color of unselected tabs
        tabBarStyle: {
          height: Platform.OS === 'android' ? 70 : 100, // Adjusts the height of the tab bar
          paddingBottom: 10, // Adjusts the padding for content within the tab bar
          paddingTop: 5,
        },
      }}>
      <Tab.Screen
        name="Apply Attendance"
        component={AttendanceStack}
        options={{
          headerShown: false,
          tabBarLabel: 'Apply Attendance',
          tabBarIcon: ({color, focused}) => (
            <FeatherIcon
              name={'user-check'}
              size={22}
              color={focused ? 'red' : COLOR.gray}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Calendar"
        component={MyCalendar}
        options={{
          tabBarLabel: 'Employee Calendar',
          tabBarIcon: ({color, focused}) => (
            <FeatherIcon
              name={'calendar'}
              size={22}
              color={focused ? 'red' : COLOR.gray}
            />
          ),
        }}
      />
      {/* <Tab.Screen
        name="Reports"
        component={Reports}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: ({color, focused}) => (
            <FeatherIcon
              name={'file-text'}
              size={22}
              color={focused ? 'red' : COLOR.gray}
            />
          ),
        }}
      /> */}
    </Tab.Navigator>
  );
}
