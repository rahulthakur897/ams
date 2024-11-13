import React from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons'; 
import { BottomTabNavigator } from '../../navigation/BottomTabNavigator';

export default function Reports() {
  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', }}> 
        </View>
       
{/* Card with Camera & Location Permissions */}
<View style={styles.permissionCard}>
        {/* Placeholder for Icon */}
          <Icon name="camera-alt" size={100} color="#ccc" />
        <Text style={styles.heading}>Thank You</Text>
        <Text style={styles.cardSubtitle}>
         Please download your report
        </Text>

  
      </View>
      <View style={{ flexDirection: 'row', marginLeft:18,}}>
          <TouchableOpacity style={styles.checkinbutton} >
            <Text style={styles.checkinbuttonText}>{"Download Report"}</Text>
          </TouchableOpacity>
        </View>
        {/* Bottom Navigation */}
      </View> 
    </ImageBackground>
  );
}
