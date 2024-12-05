import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
} from 'react-native';
import { useDispatch } from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {clearSavedTaskFlag, resetDropdownTask} from '../../../store/actions/attendance';
import {ALIGN, COLOR, FONT, Screen} from '../../../constants';

const TaskListHeader = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const addtaskNavigation = () => {
    // You can add your authentication logic here
    dispatch(clearSavedTaskFlag());
    dispatch(resetDropdownTask());
    navigation.navigate(Screen.SELECTTASK);
  };

  return (
    <View style={styles.headerContainer}>
      <Text style={styles.title}>Task List</Text>
      <Pressable style={styles.addtaskButton} onPress={addtaskNavigation}>
        <Text style={styles.addtaskText}>
          Add Tasks
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  title: {
    fontSize: 20,
    fontFamily: FONT.Bold,
    color: COLOR.black,
  },
  addtaskButton: {
    backgroundColor: COLOR.red,
    paddingVertical: 12,
    borderRadius: 20,
    alignItems: ALIGN.center.justifyContent,
    width: 120,
    height: 40,
    marginTop: -10,
  },
  addtaskText: {
    color: COLOR.white,
    fontFamily: FONT.Bold,
    fontSize: 12,
  },
});

export default TaskListHeader;
