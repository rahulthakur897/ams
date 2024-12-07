import React, {useRef, useState, forwardRef, useImperativeHandle} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Linking,
  Alert,
  PermissionsAndroid,
  ActivityIndicator,
  Image,
  Platform,
} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import {DIMENSIONS, COLOR} from '../constants';
import {errorHandler, Storage} from '../utils';
const RNFS = require('react-native-fs');

export const GetCamera = forwardRef((props, ref) => {
  const {cbCameraReady} = props;
  const cameraRef = useRef(null);

  const [isActive, setIsActive] = useState(true);
  const [cameraPosition, setCameraPosition] = useState('front');
  const [imagePath, setImagePath] = useState('');
  let device = useCameraDevice(cameraPosition);
  let granted = null;

  useImperativeHandle(ref, () => ({
    clearPhotoPath,
    takePhoto,
  }));

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('CameraScreen focus effect');
      setIsActive(true);
      cbCameraReady(true);
      if(Platform.OS === 'android'){
        requestCameraPermission();
      }
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        console.log('CameraScreen focus effect cleanup');
        setIsActive(false);
        cbCameraReady(false);
      };
    }, []),
  );

  const clearPhotoPath = () => {
    setImagePath('');
  };

  const takePhoto = async () => {
    if (cameraRef != null) {
      try {
        const photo = await cameraRef.current.takePhoto();
        const photoPath = `file://${photo?.path}`;
        const imageUriBase64 = await RNFS.readFile(photoPath, 'base64');
        const fullImage = `data:image/jpeg;base64,${imageUriBase64}`;
        Storage.setAsyncItem('imgBase64', fullImage);
        setImagePath(fullImage);
        return fullImage;
      } catch (err) {
        errorHandler('Some error occured while capturing photo', false);
      }
    }
  };

  const requestCameraPermission = async () => {
    try {
      granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'AMS App Camera Permission',
          message:
            'AMS App needs access to your camera ' +
            'to capture your pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
        cbCameraReady(true);
      } else {
        console.log('Camera permission denied');
        Alert.alert(
          'Camera Permission Required',
          'Please enable Camera services in settings.',
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

  if (device == null)
    return <ActivityIndicator size={'large'} color={COLOR.gray} />;
  return imagePath ? <Image source={{uri: imagePath}} style={styles.photoContainer} /> : (
    <Camera
      ref={cameraRef}
      style={styles.cameraRoll}
      device={device}
      isActive={isActive}
      photo={true}
    />
  );
});

const styles = StyleSheet.create({
  cameraRoll: {
    position: 'absolute',
    width: DIMENSIONS.width - 40,
    height: Platform.isPad ? 600 : 300,
  },
  photoContainer: {
    position: 'absolute',
    width: DIMENSIONS.width - 40,
    height: Platform.isPad ? 600 : 300,
  },
});
