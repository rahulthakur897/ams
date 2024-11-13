import React, { useState } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import { APP_IMAGE } from '../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Image } from 'react-native-elements';
import { Dropdown } from 'react-native-element-dropdown';

export default function AddTasks() {
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
  const homePageNavigation = () => {
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
        <View style={{ flexDirection: 'row', padding: 20 }}>
          <Icon name="arrow-back" size={30} color="#ccc" />
          <Text onPress={homePageNavigation} style={styles.appheader}>Add Tasks/Sub Tasks</Text>
        </View>

        {/* Card with Camera & Location Permissions */}
        <View style={{ marginTop: 80, marginLeft: 20, marginRight: 10, }}>
          {/* Select Box */}
          <View style={styles.addtaskdroptextone}>
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

          <Text style={styles.addtaskdroptextone}>
            Choose Task
          </Text>

          <Text style={styles.addtaskdroptextone}>
            Choose Task
          </Text>



        </View>
        {/* Checkout Out */}
        <View style={styles.checkoutborder}>
          {/* Checkout Button */}
          <TouchableOpacity style={styles.checkoutbutton}>
            <Text style={styles.checkoutbuttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>

      </View>
    </ImageBackground>
  );
}
