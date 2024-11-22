import React, { useEffect } from 'react';
import {PermissionsAndroid, Platform, BackHandler, Alert, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {MainStackNavigator} from './src/navigation/StackNavigator';

function App() {

  const requestPermissions = async () => {
    if (Platform.OS === 'android') {
      const permissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        // Add other permissions here
      ];

      try {
        const granted = await PermissionsAndroid.requestMultiple(permissions);

        // Check if all permissions are granted
        const allGranted = permissions.every(permission => granted[permission] === PermissionsAndroid.RESULTS.GRANTED);

        if (allGranted) {
          console.log('All permissions granted');
        } else {
          console.log('Some permissions denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  useEffect(() => {
    requestPermissions();
  }, []);

  useEffect(() => {
    const backAction = () => {
      Alert.alert('Hold on!', 'Are you sure you want to go back?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );
    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;
