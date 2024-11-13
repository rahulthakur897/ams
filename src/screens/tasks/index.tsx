import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native-elements';

export default function Tasks() {
  const navigation = useNavigation();
  const [selectedDealer, setSelectedDealer] = useState();
  const homePageNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate('Attendance');
  };
  const taskListNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate('TaskList');
  };
  const addtaskNavigation = () => { 
    navigation.navigate('AddTasks');
  };
 
  
  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', padding: 20}}>
          <Icon onPress={homePageNavigation} name="arrow-back" size={30} color="#ccc" />
          <Text onPress={homePageNavigation} style={styles.appheader}>Add Tasks/Sub Tasks</Text>
        </View>

        {/* Card with Camera & Location Permissions */}
        <View style={styles.permissionCard}>
          {/* Placeholder for Icon */}
          <Text style={styles.cardSubtitle}>
            Add at least 1 task to proceed for check out
          </Text>
          {/* Allow Access Button */}
          <TouchableOpacity style={styles.allowAccessButton}>
            <Text onPress={addtaskNavigation}  style={styles.allowAccessText}>Add Tasks</Text>
          </TouchableOpacity>
        </View>
        {/* Checkout Out */}
        <View style={styles.checkoutborder}>
          {/* Checkout Button */}
          <TouchableOpacity style={styles.checkoutbutton}>
            <Text style={styles.checkoutbuttonText}>Check Out</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}
