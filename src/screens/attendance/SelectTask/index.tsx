import React, {useEffect} from 'react';
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {APP_IMAGE, BASEURL, Screen} from '../../../constants';
import {Storage} from '../../../utils';
import {
  fetchTaskNameList,
  selectTaskAndFilterSubTask,
  selectSubTask,
  getFormValues,
  renderDynamicForm,
  resetDropdownTask,
} from '../../../store/actions/attendance';
import { RenderDynamicForm } from './RenderDynamicForm';
import {MyDropdown} from '../../../components/MyDropdown';
import styles from './style';
const _ = require('lodash');

export default function SelectTask() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const {
    parentTaskList,
    selectedParentTask,
    childTaskList,
    selectedChildTask,
    formDefaultValues,
    dynamicFormValues,
  } = useSelector(state => state.attendanceReducer);

  const getTaskNameList = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTasksDetail`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskNameList(config));
  };

  useEffect(() => {
    getTaskNameList();
    return () => dispatch(resetDropdownTask());
  }, []);

  const updateParentDropdownValue = item => {
    dispatch(selectTaskAndFilterSubTask(item));
  };

  const getFormDefaultValues = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTaskControlDefaultValues`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getFormValues(config));
  };

  const callRenderFormData = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTasksControlMapping`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(renderDynamicForm(config));
  };

  const updateChildDropdownValue = item => {
    dispatch(selectSubTask(item));
    getFormDefaultValues();
    callRenderFormData();
  };

  

  const taskListNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate(Screen.TASKLIST);
  };

  
  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.choosetask}>Choose Task</Text>
          <MyDropdown
            dropdownList={parentTaskList}
            selectedItem={selectedParentTask}
            placeholder="Select Task"
            callback={updateParentDropdownValue}
          />
          {/* subtask dropdown */}
          <Text style={styles.chooseSubtask}>Choose Sub Task</Text>
          <MyDropdown
            dropdownList={childTaskList}
            selectedItem={selectedChildTask}
            placeholder="Select Sub Task"
            callback={updateChildDropdownValue}
          />
          {/* form fields */}
          <View>
            <RenderDynamicForm defaultValues={formDefaultValues} formValues={dynamicFormValues} />
          </View>

          {_.size(formDefaultValues) ? <Pressable style={styles.allowAccessButton} onPress={taskListNavigation}>
            <Text style={styles.allowAccessText}>Save Tasks</Text>
          </Pressable> : null}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
