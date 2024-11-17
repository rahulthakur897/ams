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


const attendanceData = [
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-01T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-02T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-03T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-04T19:21:54.86",
    "AttendanceStatus": "Present",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-04T19:21:54.86",
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 1,
    "ParentEmpAttID": 35232,
    "TotalTimeAtDealerShip": null
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-05T18:23:04.197",
    "AttendanceStatus": "Present",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-05T18:23:04.197",
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 1,
    "ParentEmpAttID": 35317,
    "TotalTimeAtDealerShip": null
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-06T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-07T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-08T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-09T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-10T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-11T21:40:36.54",
    "AttendanceStatus": "Present",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-11T21:40:36.54",
    "LastCheckOutTime": "2024-11-11T22:25:17.003",
    "NoOfDealerShipVisited": 2,
    "ParentEmpAttID": 35691,
    "TotalTimeAtDealerShip": "0:44"
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-12T18:22:46.567",
    "AttendanceStatus": "Pending",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-12T18:22:46.567",
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 1,
    "ParentEmpAttID": null,
    "TotalTimeAtDealerShip": null
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-13T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-14T00:00:00",
    "AttendanceStatus": "Absent",
    "CellColor": null,
    "FirstCheckInTime": null,
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 0,
    "ParentEmpAttID": 0,
    "TotalTimeAtDealerShip": ""
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-15T09:51:00.77",
    "AttendanceStatus": "Pending",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-15T09:51:00.77",
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 1,
    "ParentEmpAttID": null,
    "TotalTimeAtDealerShip": null
  },
  {
    "ApprovedOrRejected": null,
    "AttendanceDate": "2024-11-16T01:48:34.027",
    "AttendanceStatus": "Pending",
    "CellColor": null,
    "FirstCheckInTime": "2024-11-16T01:48:34.027",
    "LastCheckOutTime": null,
    "NoOfDealerShipVisited": 1,
    "ParentEmpAttID": null,
    "TotalTimeAtDealerShip": null
  }
];
// Convert attendance data to markedDates format
const getMarkedDates = (data:any) => {
  const markedDates = {};

  data.forEach((item:any) => {
    const date = item.AttendanceDate.split("T")[0]; // Extract YYYY-MM-DD
    markedDates[date] = {
      customStyles: {
        container: {
          backgroundColor:
            item.AttendanceStatus === "Present" ? "green" : "red", // Set color based on status
        },
        text: {
          color: "white",
          fontWeight: "bold",
        },
      },
    };
  });
console.log(markedDates);
  return markedDates;
};
export default function MyCalendar() {
  const markedDates = getMarkedDates(attendanceData);
  const dispatch = useDispatch();
  const {monthlyAttendance} = useSelector(
    state => state.calendarReducer,
  );
  const initDate = new Date();
  const disabledDaysIndexes = [6, 7];
  // And don't forget to disabled the "first" dates on init :
  useEffect(() => {
    // getDisabledDays(
    //   initDate.getMonth(),
    //   initDate.getFullYear(),
    //   disabledDaysIndexes,
    // );
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
    // getMonthlyAttendance();
  }, []);
   
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
        // onDayPress={day => {
        //   setDate(day.dateString);
        // }}
        enableSwipeMonths={true}
        disabledDaysIndexes={disabledDaysIndexes}
        // onMonthChange={date => {
        //   getDisabledDays(date.month - 1, date.year, disabledDaysIndexes);
        // }}
      />
    </View>
  );
}
