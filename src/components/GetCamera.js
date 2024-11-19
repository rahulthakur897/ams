import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import {StyleSheet, Linking, Alert, PermissionsAndroid, ActivityIndicator, Image} from 'react-native';
import {useCameraDevice, Camera} from 'react-native-vision-camera';
import {DIMENSIONS, COLOR} from '../constants';
import {errorHandler, Storage} from "../utils";
const RNFS = require('react-native-fs');

export const GetCamera = forwardRef((props, ref) => {
  const cameraRef = useRef(null);

  const [cameraPosition, setCameraPosition] = useState('front');
  const [imagePath, setImagePath] = useState('');
  const device = useCameraDevice(cameraPosition);

  useImperativeHandle(ref, () => ({
    takePhoto,
  }));

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
      const granted = await PermissionsAndroid.request(
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

  useEffect(() => {
    requestCameraPermission();
  }, []);

  if (device == null)
    return <ActivityIndicator size={'large'} color={COLOR.gray} />;
  return imagePath ? <Image source={{uri: imagePath}} style={styles.photoContainer} /> : (
    <Camera
      ref={cameraRef}
      style={styles.cameraRoll}
      device={device}
      isActive={true}
      photo={true}
    />
  );
});

const styles = StyleSheet.create({
  cameraRoll: {
    marginTop: 20,
    width: DIMENSIONS.width - 40,
    height: 300,
  },
  photoContainer: {
    marginTop: 20,
    width: DIMENSIONS.width - 40,
    height: 300,
  }
});
