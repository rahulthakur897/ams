import {API_LOADING, GET_MONTHLY_ATTENDANCE_SUCCESS} from '../Constant';

const initialState = {
  isLoading: false,
  monthlyAttendance: [],
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MONTHLY_ATTENDANCE_SUCCESS: {
      console.log("in reducer -->", action?.response);
      const {Data} = action?.response;
      console.log("in reducer Data -->", Data);
      const DailyAttendance = Data[0]['DailyAttendance'];
      console.log("in reducer Data DailyAttendance -->", DailyAttendance);
      return {
        ...state,
        monthlyAttendance: DailyAttendance,
      };
    }
    default:
      return state;
  }
};
