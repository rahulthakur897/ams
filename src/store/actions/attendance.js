import {
  MARK_ATTENDANCE,
  CHECK_ATTENDANCE_STATUS,
  FETCH_TASK_NAME,
  FILTER_SUBTASK_FOR_TASK,
  SELECTED_SUBTASK,
  RENDER_DYNAMIC_FORM,
  FETCH_FORM_DEFAULT_VALUES,
  REMOVE_USER_TASK,
  FETCH_USER_TASK,
  RESET_TASK_DROPDOWN,
} from '../Constant';

export function markAttn(configData) {
  return {
    type: MARK_ATTENDANCE,
    payload: configData,
  };
}

export function checkAttnStatus(configData) {
  return {
    type: CHECK_ATTENDANCE_STATUS,
    payload: configData,
  };
}

export function fetchTaskNameList(configData) {
  return {
    type: FETCH_TASK_NAME,
    payload: configData,
  };
}

export function selectTaskAndFilterSubTask(taskObj) {
  return {
    type: FILTER_SUBTASK_FOR_TASK,
    payload: taskObj,
  };
}

export function selectSubTask(subtask) {
  return {
    type: SELECTED_SUBTASK,
    payload: subtask,
  };
}

export function renderDynamicForm(configData) {
  return {
    type: RENDER_DYNAMIC_FORM,
    payload: configData,
  };
}

export function getFormValues(configData) {
  return {
    type: FETCH_FORM_DEFAULT_VALUES,
    payload: configData,
  };
}

export function removeTask(configData) {
  return {
    type: REMOVE_USER_TASK,
    payload: configData,
  };
}

export function fetchUserTask(configData) {
  return {
    type: FETCH_USER_TASK,
    payload: configData,
  };
}

export function resetDropdownTask(){
  return {
    type: RESET_TASK_DROPDOWN,
  };
}