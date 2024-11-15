import React, {useEffect} from 'react';
import {View, Text, ImageBackground, ScrollView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {APP_IMAGE, BASEURL} from '../../../constants';
import {Storage} from '../../../utils';
import {fetchTaskNameList, selectTaskAndFilterSubTask, selectSubTask, renderDynamicForm} from '../../../store/actions/attendance';
import {MyDropdown} from '../../../components/MyDropdown';
import styles from './style';

export default function SelectTask() {
  const dispatch = useDispatch();

  const {parentTaskList, selectedParentTask, childTaskList, selectedChildTask} =
    useSelector(state => state.attendanceReducer);

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

  const updateChildDropdownValue = item => {
    dispatch(selectSubTask(item));
    callRenderFormData();
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.container}>
          <View style={{marginLeft: 20, marginRight: 10}}>
            <Text style={styles.choosetask}>Choose Task</Text>
            <View style={styles.addtaskdroptextone}>
              <MyDropdown
                dropdownList={parentTaskList}
                selectedItem={selectedParentTask}
                placeholder="Select Task"
                callback={updateParentDropdownValue}
              />
            </View>
            {/* subtask dropdown */}
            <Text style={styles.chooseSubtask}>Choose Sub Task</Text>
            <View style={styles.addtaskdroptextone}>
              <MyDropdown
                dropdownList={childTaskList}
                selectedItem={selectedChildTask}
                placeholder="Select Sub Task"
                callback={updateChildDropdownValue}
              />
            </View>
          </View>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
