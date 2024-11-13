import React, {useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import moment from 'moment';
import styles from './style';

export default function MyCalendar() {
  const [markedDates, setMarkedDates] = useState({});
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
    setMarkedDates(dates);
    return dates;
  };

  return (
    <View>
      <Calendar
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
