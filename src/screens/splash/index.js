import React, {useEffect} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {CommonActions, useNavigation} from '@react-navigation/native';
import {APP_IMAGE, Screen, BASEURL} from '../../constants';
import {Storage} from '../../utils';
import { doLogin } from '../../store/actions/user';
import styles from './style';
const _ = require('lodash');

export default function Splash() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {userData} = useSelector(
    state => state.userReducer,
  );

  const checkLoginAndNavigate = () => {
    const userData = Storage.getAsyncItem('userData');
    const loginCreds = Storage.getAsyncItem('loginCreds');
    if (_.size(userData)) {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: Screen.DASHBOARD}],
        }),
      );
    } else {
      navigation.navigate(Screen.LOGIN);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      checkLoginAndNavigate();
    }, 2000);
  }, []);

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.logoContainer}>
        <Image style={styles.logo} source={APP_IMAGE.logo} />
      </View>
    </ImageBackground>
  );
}
