import React, {useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
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
    dynamicFormValues,
    formDefaultValues,
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

  const updateChildDropdownValue = item => {
    dispatch(selectSubTask(item));
    getFormDefaultValues();
    callRenderFormData();
  };

  const renderFormFields = () =>
    dynamicFormValues &&
    dynamicFormValues.map(formElem => {
      if (formElem.HTMLControlType === 'TextBox') {
        return (
          <View key={formElem.AirtelTaskControlID}>
            <Text style={styles.inputLabel}>{formElem.ControlHeader}</Text>
            <TextInput
              placeholderTextColor="#333"
              style={styles.textinput}
              placeholder={'Enter ' + formElem.ControlHeader}
            />
          </View>
        );
      }
      if (formElem.HTMLControlType === 'DropDown') {
        return (
          <View key={formElem.AirtelTaskControlID}>
            <Text style={styles.inputLabel}>{formElem.ControlHeader}</Text>
            <MyDropdown placeholder={formElem.ControlHeader} />
          </View>
        );
      }
    });

  const taskListNavigation = () => {
    // You can add your authentication logic here
    navigation.navigate(Screen.TASKLIST);
  };

  return (
    <ScrollView style={{flex: 1}}>
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
        </View>
        {/* form fields */}
        {_.size(dynamicFormValues) ? (
          <View>
            <Text style={styles.addAdditional}>
              -----Add Additional Details------
            </Text>
            <Text style={styles.addAdditionalWarn}>
              * Marked fields are necessary
            </Text>
            {renderFormFields()}
            <Pressable style={styles.allowAccessButton}>
              <Text onPress={taskListNavigation} style={styles.allowAccessText}>
                Save Tasks
              </Text>
            </Pressable>
          </View>
        ) : null}
      </ImageBackground>
    </ScrollView>
  );
}
