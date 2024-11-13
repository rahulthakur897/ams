import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native-elements';

export default function TaskList() {
  const navigation = useNavigation();
  const homePageNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate('Attendance');
  };
  const checkinEvent = () => {
    // You can add your authentication logic here
    Alert.alert('Check In Click Event ');
  };
  
  const attpage = () => {
    // You can add your authentication logic here
    navigation.navigate('ApplyAttandance');
  };
  const tasknav = () => {
    // You can add your authentication logic here
    navigation.navigate('ApplyAttandance');
  };
  const addtaskNavigation = () => { 
    navigation.navigate('AddTasks');
  };

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
    <View style={styles.container}>
    <View style={{flexDirection: 'row',}}>
      <Icon onPress={tasknav} name="arrow-back" size={30} color="#ccc" />
      <Text onPress={tasknav} style={styles.appheader}>Task List</Text>
      <TouchableOpacity style={styles.allowAccessButton}>
            <Text onPress={addtaskNavigation}  style={styles.allowAccessText}>Add Tasks</Text>
          </TouchableOpacity>
    </View>
      <View style={{ flexDirection: 'row', }}>
      <TouchableOpacity style={styles.checkinbutton} onPress={checkinEvent}>
        <Text style={styles.checkinbuttonText}>{"Check Out"}</Text>
      </TouchableOpacity>
    </View>
    {/* Bottom Navigation */}
   </View>
  </ImageBackground>
  );
}
