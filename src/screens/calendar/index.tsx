import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import {useDispatch, useSelector} from 'react-redux';
import { COLOR, FONT } from '../../constants';
import { getMonthlyAttn } from '../../store/actions/calendar';
import moment from 'moment';
import styles from './style';
import {Storage} from '../../utils';
export default function MyCalendar() {
 // const [markedDates, setMarkedDates] = useState({});
 const dispatch = useDispatch();
 //once api integrate remove the code
 const data=[{"StartDate":"01 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"01 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"02 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"02 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"03 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"03 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"04 Nov 2024","Activity":"Present","CellColor":"#00b300","EmpID":"153","TimeIN":"07:21 PM","TimeOUT":""},{"StartDate":"04 Nov 2024","Activity":"07:21 PM -","CellColor":"#00b300","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"05 Nov 2024","Activity":"Present","CellColor":"#00b300","EmpID":"153","TimeIN":"06:23 PM","TimeOUT":""},{"StartDate":"05 Nov 2024","Activity":"06:23 PM -","CellColor":"#00b300","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"06 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"06 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"07 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"07 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"08 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"08 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"09 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"09 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"10 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"10 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"11 Nov 2024","Activity":"Present","CellColor":"#00b300","EmpID":"153","TimeIN":"09:40 PM","TimeOUT":"10:25 PM"},{"StartDate":"11 Nov 2024","Activity":"09:40 PM -10:25 PM","CellColor":"#00b300","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"12 Nov 2024","Activity":"Present","CellColor":"#00b300","EmpID":"153","TimeIN":"06:22 PM","TimeOUT":""},{"StartDate":"12 Nov 2024","Activity":"06:22 PM -","CellColor":"#00b300","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"13 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"13 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"14 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"14 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"15 Nov 2024","Activity":"Absent","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""},{"StartDate":"15 Nov 2024","Activity":" -","CellColor":"#e65252","EmpID":"153","TimeIN":"","TimeOUT":""}];
 useSelector(state => state.userReducer);
 const {getMonthlyAttendanceList} = useSelector(state => state.attendanceReducer);
  const initDate = new Date();
  const disabledDaysIndexes = [6, 7];
  // And don't forget to disabled the "first" dates on init :
  useEffect(() => {
    getDisabledDays(
      initDate.getMonth(),
      initDate.getFullYear(),
      disabledDaysIndexes,
    );
    if (!_.size(getMonthlyAttendanceList)) {
      getMonthlyAttendance();
    }
  }, []);

  const getMonthlyAttendance = async () => {
    const userData = await Storage.getAsyncItem('userData');
    const config = {
      method: 'POST',
      url: `${BASEURL}/https://airtelams.centumlearnpro.in/Attendance/GetEmpCalender`,
      headers: {
        Authorization: `Bearer ${userData.Token}`,
      },
    };
    dispatch(getMonthlyAttn(config));
  };

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

  const monthMap: { [key: string]: string } = {
    Jan: "01",
    Feb: "02",
    Mar: "03",
    Apr: "04",
    May: "05",
    Jun: "06",
    Jul: "07",
    Aug: "08",
    Sep: "09",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  const markedDates = Object.fromEntries(
    data.map((curr) => {
      // Split the StartDate into day, month name, and year
      const [day, monthName, year] = curr.StartDate.split(" ");
      
      // Convert the month name to its numeric value
      const month = monthMap[monthName as keyof typeof monthMap];
  
      // Format the date as YYYY-MM-DD
      const formattedDate = `${year}-${month}-${day.padStart(2, "0")}`;
  
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
    })
  );
  console.log(JSON.stringify(markedDates, null, 2));
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
