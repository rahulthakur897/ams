import React, {useEffect} from 'react';
import {Image, ImageBackground, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {APP_IMAGE, Screen} from '../../constants';
import {Storage} from '../../utils';
import styles from './style';
const _ = require('lodash');

export default function Splash() {
  const navigation = useNavigation();

  const checkLoginAndNavigate = async () => {
    const userData = await Storage.getAsyncItem('userData');
    if (_.size(userData)) {
      navigation.navigate(Screen.DASHBOARD);
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
