import {
  API_LOADING,
  API_FAILURE,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
  UPDATE_ATTENDANCE_STATUS,
  MARK_ATTENDANCE_SUCCESS,
  FETCH_TASK_NAME_SUCCESS,
  FILTER_SUBTASK_FOR_TASK,
  FETCH_USER_TASK_SUCCESS,
  FETCH_FORM_DEFAULT_VALUES_SUCCESS,
  RENDER_DYNAMIC_FORM_SUCCESS,
  SELECTED_TASK,
  SELECTED_SUBTASK,
  REMOVE_USER_TASK_SUCCESS,
  RESET_TASK_DROPDOWN,
  RESET_FORM_FIELDS,
  UPDATE_FORM_VALUE,
  SAVE_TASK_SUCCESS,
  RESET_SAVE_TASK,
} from '../Constant';
import {transformTaskListData} from '../../utils';
const _ = require('lodash');

const initialState = {
  isLoading: false,
  attendanceData: [],
  empAttID: null,
  attnStatus: null,
  taskSaved: false,
  allTaskList: [],
  allUserTasks: [],
  parentTaskList: [],
  selectedParentTask: {},
  childTaskList: [],
  selectedChildTask: {},
  formDefaultValues: [],
  dynamicFormValues: [],
  dynamicReqFormValues: [],
  removeTask: {},
  taskSaveError: {},
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
      const {Data} = action?.response;
      const attnInfo = _.size(Data) ? Data[0]['AttendanceInfo'] : [];
      const latestAttnInfo = _.orderBy(attnInfo, ['EmpAttID'], ['desc']);
      const empAttID = _.size(latestAttnInfo) ? latestAttnInfo[0]['EmpAttID'] : 0;
      return {
        ...state,
        attendanceData: latestAttnInfo[0],
        empAttID,
      };
    }
    case UPDATE_ATTENDANCE_STATUS: {
      const attnStatus = action?.payload;
      return {
        ...state,
        attnStatus,
      };
    }
    case MARK_ATTENDANCE_SUCCESS: {
      const {Data} = action?.response;
      const empAttID = Data[0]['EmpAttID'];
      const attendanceData = Data[0];
      return {
        ...state,
        empAttID,
        attendanceData,
      };
    }
    case FETCH_TASK_NAME_SUCCESS: {
      const {Data} = action?.response;
      const parentTaskList = filterParentTasks(Data);
      return {
        ...state,
        isLoading: false,
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
        dynamicReqFormValues: [],
        airtelControlInputValues: [],
      };
    }
    case SELECTED_SUBTASK: {
      const selectedSubTask = action?.payload;
      return {
        ...state,
        selectedChildTask: selectedSubTask,
      };
    }
    case FETCH_USER_TASK_SUCCESS: {
      const {Data} = action?.response;
      return {
        ...state,
        allUserTasks: Data,
      }
    }
    case FETCH_FORM_DEFAULT_VALUES_SUCCESS: {
      const {Data} = action?.response;
      return {
        ...state,
        isLoading: false,
        formDefaultValues: Data,
      };
    }
    case RENDER_DYNAMIC_FORM_SUCCESS: {
      const {Data} = action?.response;
      const selectedChildAirtelTaskID = state.selectedChildTask.AirtelTaskID;
      const selectedFormValues = Data.filter(
        d => d.AirtelTaskID === selectedChildAirtelTaskID,
      );
      const requiredFormValues = selectedFormValues.filter(formValue => formValue.IsRequired || formValue.ControlHeader === 'Remarks');
      return {
        ...state,
        isLoading: false,
        dynamicFormValues: selectedFormValues,
        dynamicReqFormValues: requiredFormValues,
      };
    }
    case REMOVE_USER_TASK_SUCCESS: {
      const {GroupId} = action?.response;
      const updatedUserTask = state.allUserTasks.filter(
        task => task.GroupID !== GroupId,
      );
      return {
        ...state,
        allUserTasks: updatedUserTask,
      };
    }
    case UPDATE_FORM_VALUE: {
      const formElemObj = action?.payload;
      const filledFormValues = [];
      if (_.size(formElemObj)) {
        for (key in formElemObj) {
          filledFormValues.push({
            AirtelTaskControlID: formElemObj[key]['AirtelTaskControlID'],
            Info: formElemObj[key]['inputVal'],
            TaskId: formElemObj[key]['parentTaskId'],
            SubTaskId: formElemObj[key]['AirtelTaskID'] || formElemObj[key]['AirtelTaskDefaultValueID'],
            GroupID: null,
          });
        }
      }
      return {
        ...state,
        airtelControlInputValues: filledFormValues,
      };
    }
    case SAVE_TASK_SUCCESS: {
      return {
        ...state,
        taskSaved: true,
      };
    }
    case RESET_SAVE_TASK: {
      return {
        ...state,
        taskSaved: false,
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
        dynamicReqFormValues: [],
      };
    }
    case RESET_FORM_FIELDS: {
      return {
        ...state,
        airtelControlInputValues: [],
      };
    }
    case API_FAILURE: {
      return {
        ...state,
        taskSaveError: {
          status: false, 
          message: 'Some issue while saving entry',
        }
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
