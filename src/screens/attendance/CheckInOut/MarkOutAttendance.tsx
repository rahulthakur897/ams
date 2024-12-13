import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  ScrollView,
  Text,
  ImageBackground,
  Pressable,
  TextInput,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {APP_IMAGE, BASEURL, COLOR, Screen} from '../../../constants';
import {Storage, transformDealerData} from '../../../utils';
import {
  getDealerList,
  fetchTaskList,
  updateDealer,
} from '../../../store/actions/user';
import {MyDropdown} from '../../../components/MyDropdown';
import {GetCamera} from '../../../components/GetCamera';
import {useStateCallback} from '../../../components/useStateCallback';
import {GetUserCurrentLocation} from '../../../components/GetLocation';
import styles from '../style';
const _ = require('lodash');

export default function MarkOutAttendance({route}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {DealerID, DealerName, Remarks} = route.params;
  const cameraRef = useRef();
  const locRef = useRef();

  const {dealerList, selectedDealer, taskList, attFlag} = useSelector(
    (state: any) => state.userReducer,
  );
  const {empAttID} = useSelector((state: any) => state.attendanceReducer);

  const [newDealerName, setNewDealerName] = useState(Remarks);
  const [cameraStatus, setIsCameraReady] = useStateCallback(false);
  const [locationStatus, setIsLocationReady] = useStateCallback(false);

  const getTaskList = () => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetAirtelDraftedTasksSubTasks?EmpAttID=${empAttID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(fetchTaskList(config));
  };

  useEffect(() => {
    if (_.size(dealerList)) {
      const selected = {
        label: DealerName,
        value: DealerID,
      };
      dispatch(updateDealer(selected));
      getTaskList();
    }
  }, [dealerList]);

  const getDealer = () => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Employee/Employees?OrganizationID=${userData.OrganizationID}&EmployeeID=${userData.EmployeeID}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getDealerList(config));
  };

  useEffect(() => {
    getDealer();
  }, []);

  const callChildMethod = async () => {
    if (cameraRef.current) {
      cameraRef.current.takePhoto();
    }
  };

  const getTaskListCount = () => {
    callChildMethod();
    if (_.size(taskList)) {
      navigation.navigate(Screen.TASKLIST);
    } else {
      navigation.navigate(Screen.ADDTASKS);
    }
  };

  const getLocationCurrentStatus = (currentState: boolean) => {
    setIsLocationReady(currentState, () => checkBtnStatus());
  };

  const getCameraCurrentStatus = (currentState: boolean) => {
    setIsCameraReady(currentState, () => checkBtnStatus());
  };

  const checkBtnStatus = () => {
    let btnStatus = true;
    if (!locationStatus) {
      btnStatus = false;
    }
    if (!cameraStatus) {
      btnStatus = false;
    }
    return btnStatus;
  };

  return (
    <ScrollView>
      <ImageBackground style={styles.bgImg} source={APP_IMAGE.background}>
        <View style={styles.container}>
          {/* Dropdown to Choose Dealer */}
          <MyDropdown
            dropdownList={transformDealerData(dealerList)}
            selectedItem={selectedDealer}
            placeholder="Select Dealer"
            disable={true}
            callback={null}
          />
          {selectedDealer?.label === 'Others' ? (
            <TextInput
              value={newDealerName}
              placeholderTextColor={COLOR.gray}
              placeholder="Enter location detail"
              onChangeText={txt => setNewDealerName(txt)}
              editable={false}
              style={[styles.inputText, {backgroundColor: COLOR.hexgray}]}
            />
          ) : null}
          {/* Card with Camera & Location Permissions */}
          {/* show camera */}
          <View style={styles.cameraContainer}>
            <GetCamera ref={cameraRef} cbCameraReady={getCameraCurrentStatus} />
          </View>

          {/* show location */}
          <GetUserCurrentLocation
            ref={locRef}
            cbLocationReady={getLocationCurrentStatus}
            currentAttStatus={attFlag}
          />
          {/* Check-Out Button */}
          <Pressable
            style={
              checkBtnStatus()
                ? styles.checkInButton
                : styles.checkInButtonDisable
            }
            disabled={checkBtnStatus() ? false : true}
            onPress={() => getTaskListCount()}>
            <Text style={styles.checkInText}>Proceed Next for Check Out</Text>
          </Pressable>
        </View>
      </ImageBackground>
    </ScrollView>
  );
}
