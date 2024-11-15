import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert, Pressable } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

 
export default function Tasks() {
  const navigation = useNavigation();
  const [selectedDealer, setSelectedDealer] = useState();
  
  const addtaskNavigation = () => { 
    navigation.navigate('SelectTask');
  };
 
  
  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
       
        {/* Card with Camera & Location Permissions */}
        <View style={styles.permissionCard}>
          {/* Placeholder for Icon */}
          <Text style={styles.cardSubtitle}>
            Add at least 1 task to proceed for check out
          </Text>
          {/* Allow Access Button */}
          <Pressable style={styles.allowAccessButton}>
            <Text onPress={addtaskNavigation}  style={styles.allowAccessText}>Add Tasks</Text>
          </Pressable>
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
