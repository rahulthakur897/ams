import React, { useState } from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native-elements';

export default function EmpCal() {
  const navigation = useNavigation();
  const [selectedDealer, setSelectedDealer] = useState();
  const attpagenavigation = () => {
    // You can add your authentication logic here
   // navigation.navigate('Login');
  };
  const applyattpagenavigation = () => {
    // You can add your authentication logic here
   // navigation.navigate('ApplyAttandance');
  };
  const taskspagenavigation = () => {
    // You can add your authentication logic here
   // navigation.navigate('Tasks');
  };
  const reportnavigation = () => {
    // You can add your authentication logic here
  //  navigation.navigate('Reports');
  };



  
  
  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
      <Text style={styles.header}>Employee Calendar</Text>
      {/* Card with Camera & Location Permissions */}
      <View style={styles.permissionCard}>
        {/* Placeholder for Icon */}
        
        <Text style={styles.cardTitle}>Date</Text>
        
      </View>
        {/* Allow Access Button */}
        <TouchableOpacity style={styles.checkinbutton}>
          <Text style={styles.checkinbuttonText}>{"Download Attendance Report"}</Text>
        </TouchableOpacity>
{/* Dropdown to Choose Dealer */}
 

    
       
      {/* Bottom Navigation */}
      <View style={styles.bottomNavigation}>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="assignment" size={24} color="#FF5722" />
          <Text style={[styles.navText, { color: '#FF5722' }]} onPress={applyattpagenavigation}>Apply Attendance</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="calendar-today" size={24} color="#777" />
          <Text style={styles.navText}>Employee Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Icon name="assessment" size={24} color="#777" />
          <Text style={styles.navText} onPress={reportnavigation}>Report</Text>
        </TouchableOpacity>
      </View>

     
     </View>
    </ImageBackground>
  );
}
