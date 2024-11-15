import React, {useRef} from 'react';
import {View, Text, ImageBackground, Pressable, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import moment from 'moment';
import {APP_IMAGE, BASEURL, COLOR} from '../../constants';
import { Storage } from '../../utils';
import {doCheckOut} from '../../store/actions/attendance';
import {BillerDropdown} from '../../components/BillerDropdown';
import {GetUserCurrentLocation} from '../../components/GetLocation';
import styles from './style';

export default function MarkOut() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const {selectedBiller, latitude, longitude} = useSelector(state => state.userReducer);

  const closeDialog = () => {
    refRBSheet.current.close();
  };

  const punchOutAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const base64Credentials = btoa(`${userData.username}:${userData.password}`);
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/MarkEmployeeAttendance`,
      data: {
        dealerID: '1653', //(selectedBiller.DealerID).toString(),
        latitude: latitude,
        longitude: longitude,
        empAttID: 0,
        geolocationmsg: '',
        Remarks: '',
        imageData: '',
      },
      headers: {
        'Authorization': `Basic ${base64Credentials}`,
      },
    };
    console.log(config);
    dispatch(doCheckOut(config));
    refRBSheet.current.open();
  };

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        {/* Dropdown to Choose Dealer */}
        <BillerDropdown />
        {/* Card with Camera & Location Permissions */}
        <View style={styles.permissionCard}>
          {/* Placeholder for Icon */}
          <View style={styles.iconss}>
            <Icon name="camera-alt" size={74} color="#ccc" />
            <Icon
              name="location-pin"
              size={74}
              color="#ccc"
              style={{marginLeft: 5}}
            />
          </View>
          <Text style={styles.cardTitle}>Enable Camera & Location Access</Text>
          <Text style={styles.cardSubtitle}>
            We need your permission to access the camera and location
          </Text>
          {/* Allow Access Button */}
          <Pressable style={styles.allowAccessButton}>
            <Text style={styles.allowAccessText}>Allow Access</Text>
          </Pressable>
        </View>
        {/* show location */}
        <GetUserCurrentLocation />
        {/* Check-In Button */}
        <Pressable
          style={styles.checkInButton}
          // disabled={true}
          onPress={() => punchOutAttendance()}>
          <Text style={styles.checkInText}>Check In</Text>
        </Pressable>
      </View>
      {/* success msg bottom sheet */}
      <RBSheet
        ref={refRBSheet}
        useNativeDriver={false}
        height={280}
        customStyles={{
          wrapper: {
            backgroundColor: COLOR.lightBlack,
          },
          container: {
            borderTopLeftRadius: 32,
            borderTopRightRadius: 32,
          },
          draggableIcon: {
            backgroundColor: COLOR.black,
          },
        }}
        customModalProps={{
          animationType: 'slide',
          statusBarTranslucent: true,
        }}
        customAvoidingViewProps={{
          enabled: true,
        }}>
        <View style={{margin: 20, alignItems: 'center'}}>
          <Image source={APP_IMAGE.success} style={styles.successImg} />
          <Text style={styles.successText}>Success</Text>
          <Text style={styles.successAddText}>
            Your Check In has been marked at
          </Text>
          <Text style={styles.successAddText}>
            {moment().format('DD/MM/YYYY')} {moment().format('LTS')}
          </Text>
          <Pressable style={styles.popupButton} onPress={() => closeDialog()}>
            <Text style={styles.popupButtonText}>Close</Text>
          </Pressable>
        </View>
      </RBSheet>
    </ImageBackground>
  );
}
