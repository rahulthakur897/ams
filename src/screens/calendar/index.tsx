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
// Map attendance data to markedDates format
const mapAttendanceToMarkedDates = (data:any) => {
  return data.reduce((acc:any, item:any) => {
    const date = item.AttendanceDate.split("T")[0]; // Extract YYYY-MM-DD
    acc[date] = {
      customStyles: {
        container: {
          backgroundColor: item.AttendanceStatus === "Present" ? "green" : "red",
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
  const [disableArrowRight, setDisableArrowRight] = useState({});
  const {monthlyAttendance} = useSelector(state => state.calendarReducer);
  const initDate = new Date();
  const disabledDaysIndexes = [6, 7]; 
   // Fetch attendance data from the API
  const fetchAttendance = async (fromDate:any, toDate:any) => {
    const userData = await Storage.getAsyncItem("userData");
    const config = {
      method: "GET",
      url: `${BASEURL}/api/Attendance/GetEmpAttendanceCalender?EmployeeID=${userData.EmployeeID}&fromdate=${fromDate}&todate=${toDate}`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    setDisableArrowRight(true);
    dispatch(getMonthlyAttn(config));
  };

  // Handle previous month navigation
  const handlePreviousMonth = async () => {
    const prevMonthStart = moment(currentMonth).subtract(1, "month").startOf("month").format("YYYY-MM-DD");
    const prevMonthEnd = moment(currentMonth).subtract(1, "month").endOf("month").format("YYYY-MM-DD");
    setCurrentMonth(moment(currentMonth).subtract(1, "month").format("YYYY-MM"));
    setDisableArrowRight(false);
    await fetchAttendance(prevMonthStart, prevMonthEnd);
  };

  // Handle next month navigation
  const handleNextMonth = async () => {
    const nextMonthStart = moment(currentMonth).add(1, "month").startOf("month").format("YYYY-MM-DD");
    const nextMonthEnd = moment(currentMonth).add(1, "month").endOf("month").format("YYYY-MM-DD");
    setCurrentMonth(moment(currentMonth).add(1, "month").format("YYYY-MM"));
    
    await fetchAttendance(nextMonthStart, nextMonthEnd);
  };
  // Update markedDates when attendance data changes
  useEffect(() => {
    if (monthlyAttendance && monthlyAttendance.length) {
      setMarkedDates(mapAttendanceToMarkedDates(monthlyAttendance));
    }
  }, [monthlyAttendance]);

  // Fetch initial month's attendance on component mount
  useEffect(() => {
    const initialStart = moment().startOf("month").format("YYYY-MM-DD");
    const initialEnd = moment().endOf("month").format("YYYY-MM-DD");
    fetchAttendance(initialStart, initialEnd);
  }, []);

  
  return (
    <View>
      {_.size(monthlyAttendance) ? (
        <Calendar
        enableSwipeMonths={true}
        disableArrowRight={disableArrowRight}
        disabledDaysIndexes={disabledDaysIndexes}
        theme={{
                textSectionTitleDisabledColor: '#d9e1e8',
                selectedDayBackgroundColor: '#dfr3eg',
                selectedDayTextColor: '#D9E1E8',
              }}
        current={currentMonth} // Dynamically controlled month
        markingType="custom"
        markedDates={markedDates} // Dynamically fetched attendance data
        onPressArrowLeft={(subtractMonth:any) => {
          subtractMonth(); // Update visual display
          handlePreviousMonth();
        }}
        onPressArrowRight={(addMonth:any) => {
          addMonth(); // Update visual display
          handleNextMonth();
        }}
      />
      ) : <ActivityIndicator size={'large'} color={COLOR.gray} />}
    </View>
  );
}
