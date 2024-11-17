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
      const {Data} = action?.response;
      const DailyAttendance = Data[0]['DailyAttendance'];
      return {
        ...state,
        monthlyAttendance: DailyAttendance,
      };
    }
    default:
      return state;
  }
};
