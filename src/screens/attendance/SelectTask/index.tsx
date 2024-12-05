import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  View,
  Text,
  ImageBackground,
  ScrollView,
  Pressable,
  Image,
  ActivityIndicator,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import {launchImageLibrary} from 'react-native-image-picker';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../../constants';
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
  const [taskPhotos, setTaskPhotos] = useState<any[]>(Array(5).fill(''));
  const [isPhotoToUpload, setIsPhotoToUpload] = useState(false);
  const [btnClicked, setBtnClicked] = useState(false);

  const {
    isLoading,
    empAttID,
    taskSaved,
    parentTaskList,
    selectedParentTask,
    childTaskList,
    selectedChildTask,
    formDefaultValues,
    dynamicFormValues,
    airtelControlInputValues,
    taskSaveError,
  } = useSelector((state: any) => state.attendanceReducer);

  useEffect(() => {
    if (_.size(taskSaveError)) {
      setBtnClicked(false);
    }
  }, [taskSaveError]);

  const getTaskNameList = () => {
    console.log('method called');
    const userData = Storage.getAsyncItem('userData');
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

  const updateParentDropdownValue = (item: any) => {
    setBtnClicked(false);
    setTaskPhotos(Array(5).fill(''));
    setIsPhotoToUpload(item.isPhotoToUpload);
    dispatch(selectTaskAndFilterSubTask(item));
  };

  const getFormDefaultValues = () => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTaskControlDefaultValues`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getFormValues(config));
  };

  const callRenderFormData = () => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/AirtelTask/GetAirtelTasksControlMapping`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(renderDynamicForm(config));
  };

  const updateChildDropdownValue = (item: any) => {
    dispatch(selectSubTask(item));
    setTaskPhotos(Array(5).fill(''));
    getFormDefaultValues();
    callRenderFormData();
  };

  useEffect(() => {
    if (taskSaved) {
      navigation.navigate(Screen.TASKLIST);
    }
  }, [taskSaved]);

  const checkTaskPhotos = () => {
    function isEmpty(elem: string) {
      return elem !== '';
    }
    let isPhotoAdded = taskPhotos.some(isEmpty);
    return isPhotoAdded;
  };

  const saveTask = () => {
    const isTaskPhotoAdded = checkTaskPhotos();
    if (!isTaskPhotoAdded && isPhotoToUpload) {
      Alert.alert('Warning', 'Please add atleast 1 task photo');
      return;
    }
    if (btnClicked) {
      return;
    }
    setBtnClicked(true);
    const userData = Storage.getAsyncItem('userData');
    if (renderDynamicRef.current) {
      renderDynamicRef.current.sendFormData();
    }
    const config = {
      method: 'POST',
      url: `${BASEURL}/api/Attendance/SaveTaskAsDraft`,
      data: {
        EmployeeId: userData.EmployeeID,
        EmpAttID: empAttID || 0,
        AirtelControlInputValues: airtelControlInputValues,
        ImageBase64: taskPhotos,
      },
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    console.log('config', config);
    dispatch(saveTaskAsDraft(config));
  };

  const uploadPhoto = async (num: number) => {
    const result: any = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 1,
    });
    if (_.size(result) > 0) {
      const imgBase64 = result.assets[0].base64 || '';
      taskPhotos[num] = `data:image/jpeg;base64,${imgBase64}`;
      setTaskPhotos([...taskPhotos]);
    }
  };

  const deletePhoto = (num: number) => {
    taskPhotos[num] = '';
    setTaskPhotos([...taskPhotos]);
    setBtnClicked(false);
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
          {isLoading ? <ActivityIndicator size={'large'} color={COLOR.darkGray} /> : null}
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
            <View>
              {isPhotoToUpload ? (
                <View>
                  <Text style={styles.mandatoryField}>
                    Note: Upload atleast 1 task photo
                  </Text>
                  {[0, 1, 2, 3, 4].map(num => (
                    <Pressable
                      key={num}
                      style={styles.uploadContainer}
                      onPress={() => uploadPhoto(num)}>
                      {_.size(taskPhotos[num]) ? (
                        <View style={{position: 'relative'}}>
                          <Pressable
                            style={styles.trashContainer}
                            onPress={() => deletePhoto(num)}>
                            <FeatherIcon
                              name="trash-2"
                              size={18}
                              color={COLOR.black}
                            />
                          </Pressable>
                          <Image
                            source={{uri: taskPhotos[num]}}
                            style={styles.uploadedImg}
                          />
                        </View>
                      ) : (
                        <View style={styles.emptyContainer}>
                          <FeatherIcon
                            name="upload"
                            size={55}
                            color={COLOR.gray}
                          />
                          <Text style={styles.uploadText}>
                            (Upload Photo from Gallery)
                          </Text>
                        </View>
                      )}
                    </Pressable>
                  ))}
                </View>
              ) : null}
              <Pressable style={styles.allowAccessButton} onPress={saveTask}>
                <Text style={styles.allowAccessText}>Save Tasks</Text>
              </Pressable>
            </View>
          ) : null}
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
