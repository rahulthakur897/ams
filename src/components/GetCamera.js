import React, {useRef, useState, forwardRef, useCallback, useImperativeHandle} from 'react';
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
import {errorHandler, Storage, resizeImageAndConvertInBase64} from '../utils';

export const GetCamera = forwardRef(({cbCameraReady}, ref) => {
  const cameraRef = useRef(null);

  const [isActive, setIsActive] = useState(true);
  const [imagePath, setImagePath] = useState('');
  let device = useCameraDevice('front');
  let granted = null;

  useImperativeHandle(ref, () => ({
    takePhoto,
    clearPhotoPath,
  }));

  useFocusEffect(
    useCallback(() => {
      console.log('CameraScreen focus effect');
      if (Platform.OS === 'android') {
        checkCameraPermission();
      } else {
        setIsActive(true);
        cbCameraReady(true);
      }
      return () => {
        console.log('CameraScreen focus effect cleanup');
        setIsActive(false);
        cbCameraReady(false);
      };
    }, []),
  );

  const checkCameraPermission = async () => {
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
        setIsActive(true);
        cbCameraReady(true);
      } else {
        setIsActive(false);
        cbCameraReady(false);
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

  const takePhoto = async () => {
    if (cameraRef != null) {
      try {
        const photo = await cameraRef.current.takePhoto();
        const photoPath = `file://${photo?.path}`;
        const base64Str = await resizeImageAndConvertInBase64(photoPath);
        const fullImage = `data:image/jpeg;base64,${base64Str}`;
        Storage.setAsyncItem('imgBase64', fullImage);
        setImagePath(fullImage);
        return fullImage;
      } catch (err) {
        console.log(JSON.stringify(err));
        errorHandler('Some error occured while capturing photo', false);
      }
    }
  };

  const clearPhotoPath = () => {
    setImagePath('');
  };

  if (device == null)
    return <ActivityIndicator size={'large'} color={COLOR.gray} />;
  return imagePath ? (
    <Image source={{uri: imagePath}} style={styles.photoContainer} />
  ) : (
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
