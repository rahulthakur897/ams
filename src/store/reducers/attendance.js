import {API_LOADING, CHECK_ATTENDANCE_STATUS_SUCCESS, FETCH_TASK_NAME_SUCCESS} from '../Constant';

const initialState = {
  isLoading: false,
  attendanceData: [],
  allTaskList: [],
  parentTaskList:[],
  selectedParentTask: {},
  childTaskList: [],
  selectedChildTask: {},
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
    case FETCH_TASK_NAME_SUCCESS: {
      const apiResp = action?.response;
      const parentList = filterParentTasks(apiResp);
      return {
        ...state,
        allTaskList: apiResp?.Data,
        parentTaskList: parentList,
      };
    }
    default:
      return state;
  }
};

function filterParentTasks(arr){
  const result = arr.filter(item => item.ParentTaskID === 0);
  const formatted = transformTaskListData(result);
  return formatted;
}