import React, { useEffect, useState, useCallback } from 'react';
import { ActivityIndicator, View, Text } from 'react-native';
import { Calendar } from 'react-native-calendars';
import {useFocusEffect} from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { ALIGN, BASEURL, COLOR, FONT } from '../../constants';
import { getMonthlyAttn } from '../../store/actions/calendar';
import { Storage } from '../../utils';
import styles from './style';
const _ = require('lodash');

// Map attendance data to markedDates format
const mapAttendanceToMarkedDates = (data: any) => {
  return data.reduce((acc: any, item: any) => {
    const date = item.AttendanceDate.split('T')[0]; // Extract YYYY-MM-DD
    acc[date] = {
      customStyles: {
        container: {
          backgroundColor:
            item.AttendanceStatus === 'Present'
              ? '#00b300'
              : item.AttendanceStatus === 'Pending'
                ? '#1F77DF'
                : item.AttendanceStatus === 'Week Off'
                  ? '#4d4dff'
                  : item.AttendanceStatus === 'Holiday'
                    ? '#00cc66'
                    : '#e65252',
        },
        text: {
          color: COLOR.white,
          fontFamily: FONT.Regular,
        },
      },
    };
    return acc;
  }, {});
};

export default function MyCalendar() {
  const dispatch = useDispatch();
  const [currentMonth, setCurrentMonth] = useState(moment().format('YYYY-MM')); // Track current month
  const [markedDates, setMarkedDates] = useState({});
  const { monthlyAttendance } = useSelector((state: any) => state.calendarReducer);
  const disabledDaysIndexes = [6, 7];

  // Fetch attendance data from the API
  const fetchAttendance = (fromDate: any, toDate: any) => {
    const userData = Storage.getAsyncItem('userData');
    const config = {
      method: 'GET',
      url: `${BASEURL}/api/Attendance/GetEmpAttendanceCalender?EmployeeID=${userData.EmployeeID}&fromdate=${fromDate}&todate=${toDate}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getMonthlyAttn(config));
  };

  // Handle previous month navigation
  const handlePreviousMonth = async () => {
    const prevMonthStart = moment(currentMonth)
      .subtract(1, 'month')
      .startOf('month')
      .format('YYYY-MM-DD');
    const prevMonthEnd = moment(currentMonth)
      .subtract(1, 'month')
      .endOf('month')
      .format('YYYY-MM-DD');
    setCurrentMonth(
      moment(currentMonth).subtract(1, 'month').format('YYYY-MM'),
    );
    if (isTodayAfterPrevMonthStart(currentMonth)) {
      await fetchAttendance(prevMonthStart, prevMonthEnd);
    }
  };

  const isTodayAfterPrevMonthStart = (currMonth: any) => {
    const today = moment();
    const prevMonthStart = moment(currMonth)
      .subtract(1, 'month')
      .startOf('month');

    // Compare the two dates
    return today.isSameOrAfter(prevMonthStart);
  };
  // Handle next month navigation
  const handleNextMonth = async () => {
    const currentMonthMoment = moment(currentMonth, 'YYYY-MM');
    const nextMonthMoment = currentMonthMoment.clone().add(1, 'month');
    const today = moment();

    // Prevent API call if the next month is in the future
    if (nextMonthMoment.isAfter(today, 'month')) {
      setCurrentMonth(nextMonthMoment.format('YYYY-MM')); // Update UI without API call
      return;
    }

    const nextMonthStart = nextMonthMoment
      .startOf('month')
      .format('YYYY-MM-DD');
    const nextMonthEnd = nextMonthMoment.endOf('month').format('YYYY-MM-DD');
    await fetchAttendance(nextMonthStart, nextMonthEnd);

    setCurrentMonth(nextMonthMoment.format('YYYY-MM'));
  };

  // Update markedDates when attendance data changes
  useEffect(() => {
    if (monthlyAttendance && monthlyAttendance.length) {
      setMarkedDates(mapAttendanceToMarkedDates(monthlyAttendance));
    }
  }, [monthlyAttendance]);

  useFocusEffect(
    useCallback(() => {
      const initialStart = moment().startOf('month').format('YYYY-MM-DD');
      const initialEnd = moment().endOf('month').format('YYYY-MM-DD');
      fetchAttendance(initialStart, initialEnd);
    }, []),
  );

  return (
    <View>
      {_.size(monthlyAttendance) ? (
        <Calendar
          enableSwipeMonths={true}
          disabledDaysIndexes={disabledDaysIndexes}
          theme={{
            textSectionTitleDisabledColor: '#d9e1e8',
            selectedDayBackgroundColor: '#dfr3eg',
            selectedDayTextColor: '#D9E1E8',
          }}
          current={currentMonth} // Dynamically controlled month
          markingType="custom"
          markedDates={markedDates} // Dynamically fetched attendance data
          onPressArrowLeft={(subtractMonth: any) => {
            subtractMonth(); // Update visual display
            handlePreviousMonth();
          }}
          onPressArrowRight={(addMonth: any) => {
            const nextMonth = moment(currentMonth).add(1, 'month');
            // Prevent navigation to December or future months
            if (nextMonth.isSameOrBefore(moment(), 'month')) {
              addMonth(); // Update visual display
              handleNextMonth(); // Call your handler for the next month
            } else {
              console.log('Cannot navigate to future months.');
            }
          }}
        />
      ) : (
        <ActivityIndicator style={{marginVertical: 50}} size={'large'} color={COLOR.gray} />
      )}
      <View style={[ALIGN.contentSpaceEvenly, ALIGN.row, { marginTop: 20 }]}>
        <View style={[styles.legend, { backgroundColor: '#00b300' }]} />
        <Text style={styles.legendText}>Present</Text>
        <View style={[styles.legend, { backgroundColor: '#e65252' }]} />
        <Text style={styles.legendText}>Absent</Text>
        <View style={[styles.legend, { backgroundColor: '#1F77DF' }]} />
        <Text style={styles.legendText}>Pending</Text>
      </View>
    </View>
  );
}
