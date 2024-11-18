import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import {PERMISSIONS, request, check} from 'react-native-permissions';
import GetLocation, {isLocationError} from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {updateUserLatLong} from '../store/actions/user';
import {DIMENSIONS, COLOR} from '../constants';

export const GetUserCurrentLocation = React.memo(() => {
  const dispatch = useDispatch();
  const {latitude, longitude} = useSelector(state => state.userReducer);

  const checkLocationPermission = async () => {
    const permission = await check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION);
    if (permission !== 'granted') {
      const requestResult = await request(
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
      );
      if (requestResult === 'granted') {
        getUserLocation();
      } else {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services in settings.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Open Settings', onPress: () => Linking.openSettings()},
          ],
        );
      }
    } else {
      getUserLocation();
    }
  };

  const getUserLocation = () => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 30000,
      rationale: {
        title: 'Location permission',
        message: 'The app needs the permission to request your location.',
        buttonPositive: 'Ok',
      },
    })
      .then(newLocation => {
        dispatch(updateUserLatLong(newLocation));
      })
      .catch(ex => {
        if (isLocationError(ex)) {
          const {code, message} = ex;
          console.warn(code, message);
        } else {
          console.warn(ex);
        }
      });
  };

  useEffect(() => {
    checkLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.address}>
        Address: {latitude && longitude ? (<Text>{latitude} - {longitude}</Text>) : <ActivityIndicator size='small' color={COLOR.gray} />}
      </Text>
      <Text style={styles.address}>
        Check In Time: {moment().format('DD/MM/YYYY')} {moment().format('LT')}
      </Text>
    </View>
  );
});

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
