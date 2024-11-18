import {
  API_LOADING,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
  MARK_ATTENDANCE_SUCCESS,
  FETCH_TASK_NAME_SUCCESS,
  FILTER_SUBTASK_FOR_TASK,
  FETCH_FORM_DEFAULT_VALUES_SUCCESS,
  RENDER_DYNAMIC_FORM_SUCCESS,
  SELECTED_TASK,
  SELECTED_SUBTASK,
  REMOVE_USER_TASK,
  RESET_TASK_DROPDOWN,
} from '../Constant';
import {transformTaskListData} from '../../utils';
const _ = require('lodash');

const initialState = {
  isLoading: false,
  attendanceData: [],
  empAttID: null,
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
    case MARK_ATTENDANCE_SUCCESS: {
      const {Data} = action?.response;
      const empAttID = Data[0]['EmpAttID'];
      return {
        ...state,
        empAttID,
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
    case SELECTED_TASK: {
      const selectedSubTask = action?.payload;
      return {
        ...state,
        selectedChildTask: selectedSubTask,
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
        selectedParentTask: selectedTask,
        childTaskList,
        selectedChildTask: {},
        formDefaultValues: [],
        dynamicFormValues: [],
      };
    }
    case SELECTED_SUBTASK: {
      const selectedSubTask = action?.payload;
      return {
        ...state,
        selectedChildTask: selectedSubTask,
      };
    }
    case FETCH_FORM_DEFAULT_VALUES_SUCCESS: {
      const {Data} = action?.response;
      return {
        ...state,
        formDefaultValues: Data,
      };
    }
    case RENDER_DYNAMIC_FORM_SUCCESS: {
      const {Data} = action?.response;
      const selectedChildAirtelTaskID = state.selectedChildTask.AirtelTaskID
      const selectedFormValues = Data.filter(d => d.AirtelTaskID === selectedChildAirtelTaskID)
      return {
        ...state,
        dynamicFormValues: selectedFormValues,
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
    case RESET_TASK_DROPDOWN: {
      return {
        ...state,
        parentTaskList: [],
        selectedParentTask: {},
        childTaskList: [],
        selectedChildTask: {},
        dynamicFormValues: [],
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
