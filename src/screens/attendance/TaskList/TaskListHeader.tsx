import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ALIGN, COLOR, FONT } from '../../../constants';

const TaskListHeader = () => {
  const navigation = useNavigation();
  const addtaskNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate('AddTasks');
  };
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Task List</Text>
      <Pressable style={styles.addtaskButton}>
            <Text onPress={addtaskNavigation}  style={styles.addtaskText}>Add Tasks</Text>
          </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: ALIGN.row.flexDirection,
    alignItems: ALIGN.center.justifyContent, 
    justifyContent: ALIGN.contentSpaceEvenly.justifyContent,
     
  },
  title: {
    fontSize: 20,
    fontFamily: FONT.Bold,
    color: COLOR.black,
    marginRight:2,
  },
  addtaskButton: {
    backgroundColor: COLOR.orange,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 20,
    alignItems: ALIGN.center.justifyContent,
    width:120,
    height:40,
    marginLeft:85,
  },
  addtaskText: {
    color: COLOR.white,
    fontFamily: FONT.Bold,
    fontSize: 12,    
  },
});

export default TaskListHeader;