import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import {BASEURL, COLOR, FONT} from '../../constants';
import {getMonthlyAttn} from '../../store/actions/calendar';
import moment from 'moment';
import {Storage} from '../../utils';
import styles from './style';
const _ = require('lodash');

export default function MyCalendar() {
  const dispatch = useDispatch();
  const {monthlyAttendance} = useSelector(
    state => state.calendarReducer,
  );
  const initDate = new Date();
  const disabledDaysIndexes = [6, 7];
  // And don't forget to disabled the "first" dates on init :
  useEffect(() => {
    getDisabledDays(
      initDate.getMonth(),
      initDate.getFullYear(),
      disabledDaysIndexes,
    );
  }, []);

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
    console.log('getMonthlyAttendance', config);
    dispatch(getMonthlyAttn(config));
  };

  useEffect(() => {
    getMonthlyAttendance();
  }, []);

  const getDisabledDays = (month, year, daysIndexes) => {
    let pivot = moment().month(month).year(year).startOf('month');
    const end = moment().month(month).year(year).endOf('month');
    let dates = {};
    const disabled = {disabled: true, disableTouchEvent: true};
    while (pivot.isBefore(end)) {
      daysIndexes.forEach(day => {
        const copy = moment(pivot);
        dates[copy.day(day).format('YYYY-MM-DD')] = disabled;
      });
      pivot.add(7, 'days');
    }
    // setMarkedDates(dates);
    return dates;
  };

  const monthMap: {[key: string]: string} = {
    Jan: '01',
    Feb: '02',
    Mar: '03',
    Apr: '04',
    May: '05',
    Jun: '06',
    Jul: '07',
    Aug: '08',
    Sep: '09',
    Oct: '10',
    Nov: '11',
    Dec: '12',
  };

console.log("monthlyAttendance", monthlyAttendance);
  const markedDates = monthlyAttendance?.map(curr => {
      // Split the StartDate into day, month name, and year
      const [day, monthName, year] = curr.AttendanceDate.split('T');

      // Convert the month name to its numeric value
      const month = monthMap[monthName as keyof typeof monthMap];

      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day.padStart(2, '0')}`;

      // Create a new Date object to check the day of the week
      const date = new Date(formattedDate);
      const dayOfWeek = date.getDay(); // 0 = Sunday, 6 = Saturday

      // Check if it's Saturday (6) or Sunday (0)
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

      // Return the formatted date and custom styles
      return [
        formattedDate,
        {
          customStyles: {
            container: {
              backgroundColor: curr.CellColor, // Set background color
              borderRadius: 10, // Optional: for rounded corners
              opacity: isWeekend ? 0.5 : 1, // Optional: make weekends less visible
            },
            text: {
              color: COLOR.white, // Ensure text color is visible
              fontWeight: FONT.Bold, // Optional: make text bold
            },
          },
          disabled: isWeekend, // Mark as disabled if it's Saturday or Sunday
        },
      ];
    });

  return (
    <View>
      <Calendar
        markingType="custom"
        theme={{
          textSectionTitleDisabledColor: '#d9e1e8',
          selectedDayBackgroundColor: '#dfr3eg',
          selectedDayTextColor: '#D9E1E8',
        }}
        markedDates={markedDates}
        current={initDate}
        onDayPress={day => {
          setDate(day.dateString);
        }}
        enableSwipeMonths={true}
        disabledDaysIndexes={disabledDaysIndexes}
        onMonthChange={date => {
          getDisabledDays(date.month - 1, date.year, disabledDaysIndexes);
        }}
      />
    </View>
  );
}
