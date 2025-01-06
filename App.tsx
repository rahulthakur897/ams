import React, {useEffect} from 'react';
import {
  PermissionsAndroid,
  Linking,
  Platform,
  BackHandler,
  Alert,
  Text,
  NativeModules,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {getBuildId, getVersion} from 'react-native-device-info';
import { checkVersion } from 'react-native-check-version';
import {MainStackNavigator} from './src/navigation/StackNavigator';
import { Storage } from './src/utils';
const {CheckPermissionModule} = NativeModules;

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
        const allGranted = permissions.every(
          permission =>
            granted[permission] === PermissionsAndroid.RESULTS.GRANTED,
        );

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

  const checkUpdateNeeded = async () => {
    const bundleId = await getBuildId();
    const appVersion = getVersion();
    let updateNeeded: any = await checkVersion({
      platform: Platform.OS,
      country: 'us',
      bundleId: bundleId,
      currentVersion: appVersion,
    });
    if (updateNeeded?.isNeeded) {
      //Alert the user and direct to the app url
      Alert.alert('Please Update', 'Update app now to access the latest version to continue using it.',
      [{
        text: 'Update',
        onPress: () => {
          Storage.clearAppData();
          BackHandler.exitApp();
          Linking.openURL(updateNeeded?.url);
        },
      }],
      {cancelable: false});
    }
  };

  const checkDevOption = async () => {
    if (Platform.OS === 'android') {
      const devOption = await CheckPermissionModule.checkDevOptionEnable();
      if (devOption) {
        Alert.alert(
          'Attention!',
          'We have detected "Developer option enabled". Kindly disable to continue',
          [{text: 'Open Settings', onPress: () => Linking.openSettings()}],
          {cancelable: false}
        );
      }
    }
  };

  const checkAutoDateTime = async () => {
    if (Platform.OS === 'android') {
      const autoDateTime = await CheckPermissionModule.checkAutomaticDateTimeSet();
      if (!autoDateTime) {
        Alert.alert(
          'Attention!',
          'We have detected "Automatic Date & Time not set". Kindly set to automatic',
          [{text: 'Open Settings', onPress: () => Linking.openSettings()}],
          {cancelable: false}
        );
      }
    }
  };

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

  const checkInternetStatus = (isConnected: boolean) => {
    if (isConnected) {
      Toast.show('You are back online', Toast.LONG);
    } else {
      Toast.show('You are offline', Toast.LONG);
    }
  };

  useEffect(() => {
    checkUpdateNeeded();

    requestPermissions();

    checkDevOption();

    checkAutoDateTime();

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    const unsubscribe = NetInfo.addEventListener((state: any) => {
      console.log('Connection type', state.type);
      checkInternetStatus(state.isConnected);
    });

    return () => {
      backHandler.remove();
      unsubscribe();
    };
  }, []);

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;
