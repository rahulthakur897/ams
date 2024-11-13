import React, { useState } from 'react';
import {View, Text, ImageBackground, TouchableOpacity, Alert} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import { APP_IMAGE } from '../../constants';
import styles from './style';

export default function AppliedAttendance() {

  const navigation = useNavigation();
  const [value, setValue] = useState(null);
// Sample dropdown data
const data = [
  { label: 'B K Enterprise', value: '1' },
  { label: 'Option 2', value: '2' },
  { label: 'Option 3', value: '3' },
  { label: 'Option 4', value: '4' },
]; 
  const [selectedDealer, setSelectedDealer] = useState();
  const attpage = () => {
    // You can add your authentication logic here
    navigation.navigate('Login');
  };
  const navAttendencePage = () => {
    // You can add your authentication logic here
    navigation.navigate('Attendance');
  };
  const checkinEvent = () => {
    // You can add your authentication logic here
    Alert.alert('Check In Click Event ');
  };
  
 

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
      {/* Card with Camera & Location Permissions */}
      <View style={styles.permissionCard}>
        {/* Placeholder for Icon */}
        <View style={styles.iconss}>
          <Icon name="person" size={200} color="#ccc" />
        </View>
      </View> 
        <Text style={styles.empdetails}>Address: New Delhi</Text>
        <Text style={styles.empdetails}>Check In Time:- 30/9/2024 - 12:26:48 PM</Text>
        <View style={styles.dropdowncontainer}>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder="Choose Dealer"
        value={value}
        onChange={(item) => setValue(value)}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        itemTextStyle={styles.itemTextStyle}
      />
      
    </View>
    <Text onPress={() => navigation.navigate('Tasks')} style={{paddingTop:10,color:'black'}}>Add Task</Text>
        <View style={{ flexDirection: 'row', }}>
        <TouchableOpacity style={styles.checkinbutton} onPress={checkinEvent}>
          <Text style={styles.checkinbuttonText}>{"Check In"}</Text>
        </TouchableOpacity>
      </View>
     </View>
    </ImageBackground>
  );
}
