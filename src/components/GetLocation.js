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
  Image,
  ActivityIndicator,
  PermissionsAndroid,
  Pressable,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import {promptForEnableLocationIfNeeded} from 'react-native-android-location-enabler';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {updateUserLatLong, resetUserLatLong} from '../store/actions/user';
import {DIMENSIONS, COLOR, APP_IMAGE} from '../constants';
const _ = require('lodash');

export const GetUserCurrentLocation = forwardRef(
  ({cbLocationReady, currentAttStatus}, ref) => {
    const dispatch = useDispatch();
    const {latitude, longitude, address, selectedDealer} = useSelector(
      state => state.userReducer,
    );
    const [isLocLoading, setIsLocLoading] = useState(false);
    console.log("currentAttStatus", currentAttStatus);
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
          if (enableResult === 'enabled') {
            getUserLocation();
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
        console.log(err);
      }
    };

    const getUserLocation = () => {
      console.log('You can use the location');
      Geolocation.getCurrentPosition((position) => {
        const {coords} = position;
        cbLocationReady(true);
        setIsLocLoading(false);
        dispatch(updateUserLatLong(coords));
      },
      (error) => {
        console.log('Location error', JSON.stringify(error));
        setIsLocLoading(false);
        getUserLocation();
      },
      { maximumAge: 0, enableHighAccuracy: true });
    };

    return (
      <View style={styles.container}>
        <Pressable onPress={() => {
          dispatch(resetUserLatLong());
          setIsLocLoading(true);
          getUserLocation();
        }} style={styles.gpsBox}>
          <Image resizeMode={'cover'} source={APP_IMAGE.gps} style={styles.gpsImg} />
          <Text style={styles.relocate}>Relocate</Text>
        </Pressable>
        <Text style={styles.address}>
          <Text style={{fontWeight: 600}}>Address: {''}</Text>
          {latitude && longitude ? (
              <Text>{address}</Text>
            ) : (
              <ActivityIndicator size="small" color={COLOR.gray} />
            )}
        </Text>
        <Text style={styles.address}>
          <Text style={{fontWeight: 600}}>Check {currentAttStatus === 'ReadyForCheckIn' ? 'In' : 'Out'} Time:{' '}</Text>
          {moment().format('DD/MM/YYYY')} {moment().format('LT')}
        </Text>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: DIMENSIONS.width,
    paddingTop: 20,
  },
  gpsBox: {
    position: 'absolute',
    top: 20,
    right: 40,
  },
  gpsImg: {
    width: 25,
    height: 25,
    alignSelf: 'center',
  },
  relocate: {
    fontSize: 10,
    color: 'black',
  },
  address: {
    position: 'relative',
    color: COLOR.black,
    fontSize: 14,
    marginBottom: 10,
    width: DIMENSIONS.width-100,
  },
});
