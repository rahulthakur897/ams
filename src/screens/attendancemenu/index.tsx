import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native-elements';

export default function TaskList() {
  const navigation = useNavigation();
  const attendance = () => {
    // You can add your authentication logic here
    navigation.navigate('Attendance');
  };
  return (
     
    <View style={styles.container}>
    {/* Bottom Navigation */}
    <View style={styles.bottomNavigation}>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="assignment" size={24} color="#FF5722" />
        <Text onPress={attendance} style={[styles.navText, { color: '#FF5722' }]}>Apply Attendance</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="calendar-today" size={24} color="#777" />
        <Text style={styles.navText}>Employee Calendar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.navItem}>
        <Icon name="assessment" size={24} color="#777" />
        <Text style={styles.navText}>Report</Text>
      </TouchableOpacity>
    </View>
   </View> 
  );
}
