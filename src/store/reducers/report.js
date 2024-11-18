import { API_LOADING,GET_EMP_ATTENDANCE_DETAIL_SUCCESS } from "../Constant";

const initialState = {
  isLoading: false,
  getEmpAttendanceDetail: [],
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
      case GET_EMP_ATTENDANCE_DETAIL_SUCCESS: {
        const {Data} = action?.response;
        return {
          ...state,
          getEmpAttendanceDetail: Data,
        };
      }
    default:
      return state;
  }
};
