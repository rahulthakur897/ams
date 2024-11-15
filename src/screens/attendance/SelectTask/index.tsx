import React, { useState,useEffect } from 'react';
import { View, Text, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import styles from './style';
import {useDispatch, useSelector} from 'react-redux';
import { APP_IMAGE, BASEURL } from '../../../constants';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Dropdown } from 'react-native-element-dropdown';
import {Storage} from '../../../utils';
import { Image } from 'react-native-elements';
import { fetchTaskNameList } from '../../../store/actions/attendance';
import { MyDropdown } from '../../../components/MyDropdown';

export default function SelectTask() {
  const dispatch = useDispatch();
  const {selectedBiller, taskList, latitude, longitude} = useSelector(
    state => state.userReducer,
  );
  const {parentList, selectedParentTask, childTaskList} = useSelector(state => state.attendanceReducer);
  const getTaskNameList = async() => {
    //api call object
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTasksDetail`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskNameList(config));
  }
  
  useEffect(() => {
    getTaskNameList();
  }, []);
  
  const navigation = useNavigation();
  const [value, setValue] = useState(null);

  const [selectedDealer, setSelectedDealer] = useState();
  const homePageNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate('Attendance');
  };
  const checkinEvent = () => {
    // You can add your authentication logic here
    Alert.alert('Check In Click Event ');
  };

  const updateDropdownValue = (item) => {
    //dispatch to update selected parent value
  }
 

  return (
    <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
     <View style={styles.container}>
        {/* Card with Camera & Location Permissions */}
        <View style={{ marginLeft: 20, marginRight: 10, }}>
          {/* Select Box */}
          <Text style={styles.choosetask}>
            Choose Task 
          </Text>
          <View style={styles.addtaskdroptextone}>
          <MyDropdown
            dropdownList={parentList}
            selectedItem={selectedParentTask}
            callback={updateDropdownValue}
          />
                          
          </View>
          <Text style={styles.chooseSubtask}>
            Choose Sub Task 
          </Text>
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
          
 
        </View>
        {/* Checkout Out */}
      </View>
  </ImageBackground>
  );
}
