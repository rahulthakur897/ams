import React, {useEffect} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {BASEURL, COLOR} from '../../constants';
import {getMonthlyAttn} from '../../store/actions/calendar';
import {Storage} from '../../utils';
import styles from './style';
const _ = require('lodash');

const getMarkedDates = (data: any) => {
  const markedDates = {};

  data.forEach((item: any) => {
    const date = item.AttendanceDate.split('T')[0]; // Extract YYYY-MM-DD
    markedDates[date] = {
      customStyles: {
        container: {
          backgroundColor:
            item.AttendanceStatus === 'Present' ? 'green' : 'red', // Set color based on status
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    };
  });
  return markedDates;
};

export default function MyCalendar() {
  const dispatch = useDispatch();
  const {monthlyAttendance} = useSelector(state => state.calendarReducer);
  const initDate = new Date();
  const disabledDaysIndexes = [6, 7];

  const getMonthlyAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const firstdate = moment().startOf('month').format('MM-DD-YYYY');
    const lastdate = moment().endOf('month').format('MM-DD-YYYY');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetEmpAttendanceCalender?EmployeeID=${userData.EmployeeID}&fromdate=${firstdate}&todate=${lastdate}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getMonthlyAttn(config));
  };

  useEffect(() => {
    getMonthlyAttendance();
  }, []);

  return (
    <View>
      {_.size(monthlyAttendance) ? (
        <Calendar
          markingType="custom"
          theme={{
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#dfr3eg',
            selectedDayTextColor: '#D9E1E8',
          }}
          markedDates={getMarkedDates(monthlyAttendance)}
          current={initDate}
          enableSwipeMonths={true}
          disabledDaysIndexes={disabledDaysIndexes}
        />
      ) : <ActivityIndicator size={'large'} color={COLOR.gray} />}
    </View>
  );
}
