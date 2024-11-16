import { API_LOADING, GET_MONTHLY_ATTENDANCE_SUCCESS } from "../Constant";

import {
  API_LOADING,
  GET_MONTHLY_ATTENDANCE_SUCCESS,
} from '../Constant';
const initialState = {
  isLoading: false,
  getMonthlyAttendanceList: [],
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case GET_MONTHLY_ATTENDANCE_SUCCESS: {
      const { Data } = action?.response;
      return {
        ...state,
        getMonthlyAttendanceList: Data,
      };
    }
    default:
      return state;
  }
};
