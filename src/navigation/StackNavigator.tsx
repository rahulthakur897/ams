import React from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Splash from '../screens/splash';
import Login from '../screens/registration/login';

import BottomTabNavigator from './BottomTabNavigator';

import Calendar from '../screens/calendar';
import Reports from '../screens/reports';

const MainStackNavigator = () => {
  return <Stack.Navigator
    initialRouteName="Splash"
    screenOptions={{headerShown: false}}>
    <Stack.Screen name="Splash" component={Splash} />
    <Stack.Screen name="Login" component={Login} />
    <Stack.Screen name="Dashboard" component={BottomTabNavigator} />
    <Stack.Screen name="Calendar" component={Calendar} />
    <Stack.Screen name="Reports" component={Reports} />
  </Stack.Navigator>
};

export {MainStackNavigator};
