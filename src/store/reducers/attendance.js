import {
  API_LOADING,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
  FETCH_TASK_NAME_SUCCESS,
  FILTER_SUBTASK_FOR_TASK,
  RENDER_DYNAMIC_FORM_SUCCESS,
  SELECTED_SUBTASK,
  REMOVE_USER_TASK,
} from '../Constant';
import {transformTaskListData} from '../../utils';
const _ = require('lodash');

const initialState = {
  isLoading: false,
  attendanceData: [],
  allTaskList: [],
  allUserTasks: [],
  parentTaskList: [],
  selectedParentTask: {},
  childTaskList: [],
  selectedChildTask: {},
  formDefaultValues: [],
  dynamicFormValues: [],
  removeTask: {},
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
      const {Data} = action?.response;
      const parentTaskList = filterParentTasks(Data);
      return {
        ...state,
        allTaskList: Data,
        parentTaskList,
      };
    }
    case FILTER_SUBTASK_FOR_TASK: {
      const selectedTask = action?.payload;
      const filteredChildTaskList = state.allTaskList.filter(
        task => task.ParentTaskID === selectedTask.AirtelTaskID,
      );
      const formatDDRecords = transformTaskListData(filteredChildTaskList);
      const childTaskList = _.sortBy(formatDDRecords, 'DisplayOrder');
      return {
        ...state,
        childTaskList,
      };
    }
    case SELECTED_SUBTASK: {
      const selectedSubTask = action?.payload;
      return {
        ...state,
        selectedChildTask: selectedSubTask,
      };
    }
    case RENDER_DYNAMIC_FORM_SUCCESS: {
      const {Data} = action?.response;
      return {
        ...state,
        dynamicFormValues: Data,
      };
    }
    case REMOVE_USER_TASK: {
      const selecteTaskId = action?.payload;
      const updatedUserTask = state.allUserTasks.filter(
        task => task.id === selecteTaskId,
      );
      return {
        ...state,
        allUserTasks: updatedUserTask,
      };
    }

    default:
      return state;
  }
};

function filterParentTasks(arr) {
  const result = arr.filter(item => item.ParentTaskID === 0);
  const formatted = transformTaskListData(result);
  return _.sortBy(formatted, 'DisplayOrder');
}
