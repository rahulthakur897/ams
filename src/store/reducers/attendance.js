import {API_LOADING, CHECK_ATTENDANCE_STATUS_SUCCESS} from '../Constant';

const initialState = {
  isLoading: false,
  attendanceData: []
};

export const attendanceReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case CHECK_ATTENDANCE_STATUS_SUCCESS: {
      const apiResp = action?.response;
      return {
        ...state,
        attendanceData: apiResp?.Data,
      };
    }
    default:
      return state;
  }
};
