import React, {
  useState,
  forwardRef,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {updateUserLatLong} from '../store/actions/user';
import {DIMENSIONS, COLOR} from '../constants';
const _ = require('lodash');

export const GetUserCurrentLocation = forwardRef(
  ({cbLocationReady, currentAttStatus}, ref) => {
    const dispatch = useDispatch();
    const {latitude, longitude, selectedDealer} = useSelector(
      state => state.userReducer,
    );
    const [isLocLoading, setIsLocLoading] = useState(false);

    useFocusEffect(
      useCallback(() => {
        checkForLocationEnabled();
      }, []),
    );

    const checkForLocationEnabled = async () => {
      if (Platform.OS === 'android') {
        try {
          const enableResult = await promptForEnableLocationIfNeeded();
          if (enableResult === 'already-enabled') {
            requestLocationPermission();
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error.message);
          }
        }
      } else {
        getUserLocation();
      }
    };

    const requestLocationPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'AMS App Location Permission',
            message:
              'AMS App needs access to your location to capture your address.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          if (!isLocLoading) {
            setIsLocLoading(true);
            getUserLocation();
          }
        } else {
          Alert.alert(
            'Location Permission Required',
            'Please enable Location services in settings.',
            [
              {text: 'Cancel', style: 'cancel'},
              {text: 'Open Settings', onPress: () => Linking.openSettings()},
            ],
          );
        }
      } catch (err) {
        console.warn(err);
      }
    };

    const getUserLocation = () => {
      Geolocation.getCurrentPosition((position) => {
        const {coords} = position;
        cbLocationReady(true);
        setIsLocLoading(false);
        dispatch(updateUserLatLong(coords));
      },
      (error) => {
        console.log('Location error', JSON.stringify(error));
        getUserLocation();
      },
      { enableHighAccuracy: true });
    };

    return (
      <View style={styles.container}>
        <Text style={styles.address}>
          Address:{' '}
          {latitude && longitude ? (
              <Text>Captured</Text>
            ) : (
              <ActivityIndicator size="small" color={COLOR.gray} />
            )}
        </Text>
        <Text style={styles.address}>
          Check {currentAttStatus === 'ReadyForCheckIn' ? 'In' : 'Out'} Time:{' '}
          {moment().format('DD/MM/YYYY')} {moment().format('LT')}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: DIMENSIONS.width,
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  address: {
    color: COLOR.black,
    fontSize: 16,
  },
});
