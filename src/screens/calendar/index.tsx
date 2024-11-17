import React, {useEffect, useState} from 'react';
import {ActivityIndicator, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {BASEURL, COLOR, FONT} from '../../constants';
import {getMonthlyAttn} from '../../store/actions/calendar';
import {Storage} from '../../utils';
const _ = require('lodash');
import styles from './style';
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
          color: COLOR.white,
          fontFamily: FONT.Regular,
        },
      },
    };
  });
  return markedDates;
};

export default function MyCalendar() {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM')); // Track current month

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

const getPreviousMonthAttendance = async () => {
  const userData = await Storage.getAsyncItem('userData');
  const firstdatePrevMonth = moment().subtract(1, 'month').startOf('month').format('MM-DD-YYYY');
  const lastdatePrevMonth = moment().subtract(1, 'month').endOf('month').format('MM-DD-YYYY');
  const config = {
    method: 'GET',
    url: `${BASEURL}/api/Attendance/GetEmpAttendanceCalender?EmployeeID=${userData.EmployeeID}&fromdate=${firstdatePrevMonth}&todate=${lastdatePrevMonth}`,
    headers: {
      Authorization: `Bearer ${userData.Token}`,
    },
  };
  dispatch(getMonthlyAttn(config));
};

  useEffect(() => {
    getMonthlyAttendance();
  }, []);

  // Handle month changes
  const onMonthChange = (month:any) => {
    const newMonth = moment(month.dateString).format('YYYY-MM');
    const previousMonth = moment(currentMonth).subtract(1, 'month').format('YYYY-MM');

    if (newMonth === previousMonth) {
      getPreviousMonthAttendance(month.dateString); // Call previous month method
    }
    setCurrentMonth(newMonth); // Update the current month
  };
  
  return (
    <View>
      {_.size(monthlyAttendance) ? (
        <Calendar
        onMonthChange={onMonthChange} // Triggered when navigating between months
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
