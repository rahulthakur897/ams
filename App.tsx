import React, { useEffect, useRef, useState } from 'react';
import {PermissionsAndroid, Platform, BackHandler, AppState, Alert, Text, NativeModules} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import Toast from 'react-native-simple-toast';
import {MainStackNavigator} from './src/navigation/StackNavigator';
import { Storage } from './src/utils';
import { BASEURL } from './src/constants';
import { doLogin } from './src/store/actions/user';
const { RequestStorageModule } = NativeModules;
const _ = require('lodash');

function App() {
  const dispatch = useDispatch();
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const { userData } = useSelector((state: any) => state.userReducer);

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

  const checkDevOption = async () => {
    const devOption = await RequestStorageModule.checkDevOptionEnable();
      console.log('checkDevOption', devOption);
  };

  useEffect(() => {
    requestPermissions();

    checkDevOption();
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

  useEffect(() => {
    if(_.size(userData)){
      Storage.setAsyncItem('userData', userData);
    }
  }, [userData]);

  const checkInternetStatus = (isConnected: boolean) => {
    if(isConnected){
      Toast.show('You are back online', Toast.LONG);
    } else {
      Toast.show('You are offline', Toast.LONG);
    }
  };

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state: any) => {
      console.log('Connection type', state.type);
      checkInternetStatus(state.isConnected);
    });

    // Cleanup the event listener on unmount
    return () => {
      unsubscribe();
    };
  }, []);

  const refreshToken = async () => {
    const loginCreds = await Storage.getAsyncItem('loginCreds');
    if (_.size(loginCreds)) {
      //refersh token while app open
      const base64Credentials = btoa(`${loginCreds.username}:${loginCreds.password}`);
      const config = {
        method: 'POST',
        url: `${BASEURL}/api/Users/CreateToken`,
        headers: {
          'Authorization': `Basic ${base64Credentials}`,
        },
      };
      dispatch(doLogin(config));
    }
  };

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        console.log('App has come to the foreground!');
        refreshToken();
      }

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <NavigationContainer fallback={<Text>Loading...</Text>}>
      <MainStackNavigator />
    </NavigationContainer>
  );
}

export default App;
