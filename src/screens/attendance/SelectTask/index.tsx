import React, {useEffect, useRef} from 'react';
import {View, Text, ImageBackground, ScrollView, Pressable} from 'react-native';
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
  saveTaskAsDraft,
} from '../../../store/actions/attendance';
import {RenderDynamicForm} from './RenderDynamicForm';
import {MyDropdown} from '../../../components/MyDropdown';
import styles from './style';
const _ = require('lodash');

export default function SelectTask() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const renderDynamicRef = useRef();

  const {
    empAttID,
    taskSaved,
    parentTaskList,
    selectedParentTask,
    childTaskList,
    selectedChildTask,
    formDefaultValues,
    dynamicFormValues,
    airtelControlInputValues,
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

  useEffect(() => {
    if (taskSaved) {
      navigation.navigate(Screen.TASKLIST);
    }
  }, [taskSaved]);

  const saveTask = async () => {
    const userData = await Storage.getAsyncItem('userData');
    console.log('before if');
    if (renderDynamicRef.current) {
      renderDynamicRef.current.sendFormData();
    }
    console.log('after if');
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/SaveTaskAsDraft`,
      data: {
        EmployeeId: userData.EmployeeID,
        EmpAttID: empAttID || 0,
        AirtelControlInputValues: airtelControlInputValues,
        ImageBase64: [],
      },
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(saveTaskAsDraft(config));
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
            <RenderDynamicForm
              ref={renderDynamicRef}
              dispatch={dispatch}
              parentTaskObj={selectedParentTask}
              defaultValues={formDefaultValues}
              formValues={dynamicFormValues}
            />
          </View>

          {_.size(dynamicFormValues) ? (
            <Pressable style={styles.allowAccessButton} onPress={saveTask}>
              <Text style={styles.allowAccessText}>Save Tasks</Text>
            </Pressable>
          ) : null}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
