import React, {useEffect, useRef} from 'react';
import {View, Text, ImageBackground, Pressable, Image} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {getBillerList} from '../../store/actions/user';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../constants';
import {Storage, transformBillerData} from '../../utils';
import {GetUserCurrentLocation} from '../../components/GetLocation';
import styles from './style';

export default function ApplyAttendance() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const {billerList, selectedBiller} = useSelector(state => state.userReducer);

  const getBiller = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getBillerList(config));
  };

  useEffect(() => {
    //getBiller();
  }, []);

  const doCheckIn = async () => {
    console.log('checking');
    refRBSheet.current.open();
  };

  const closeDialog = () => {
    refRBSheet.current.close();
  };

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        {/* Dropdown to Choose Dealer */}
        <View style={styles.dropdowncontainer}>
          <Dropdown
            style={styles.dropdown}
            data={billerList}
            labelField="DealerName"
            valueField="DealerID"
            placeholder="Choose Dealer"
            value={selectedBiller.DealerID}
            onChange={item => console.log('itemmmm', item)}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            itemTextStyle={styles.itemTextStyle}
          />
        </View>
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
          onPress={() => doCheckIn()}>
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
