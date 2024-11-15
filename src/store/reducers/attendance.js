import {API_LOADING, CHECK_ATTENDANCE_STATUS} from '../Constant';

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
    case CHECK_ATTENDANCE_STATUS: {
      const { Data } = action.response;
      return {
        ...state,
        isLoading: true,
        attendanceData: [...Data],
      };
    }
    default:
      return state;
  }
};
