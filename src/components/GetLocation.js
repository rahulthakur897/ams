import React, {useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Linking,
  ActivityIndicator,
  PermissionsAndroid,
} from 'react-native';
import GetLocation, {isLocationError} from 'react-native-get-location';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {updateUserLatLong} from '../store/actions/user';
import {DIMENSIONS, COLOR} from '../constants';

export const GetUserCurrentLocation = React.memo(() => {
  const dispatch = useDispatch();
  const {latitude, longitude} = useSelector(state => state.userReducer);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'AMS App Location Permission',
          message:
            'AMS App needs access to your location ' +
            'to capture your address.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
        getUserLocation();
      } else {
        console.log('location permission denied');
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
    requestLocationPermission();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.address}>
        Address: {latitude && longitude ? (<Text>Captured</Text>) : <ActivityIndicator size='small' color={COLOR.gray} />}
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
