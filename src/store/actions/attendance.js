import {
    MARK_ATTENDANCE,
    CHECK_ATTENDANCE_STATUS,
    FETCH_TASK_NAME,
    FILTER_SUBTASK_FOR_TASK,
    SELECTED_SUBTASK,
    RENDER_DYNAMIC_FORM,
} from "../Constant";

export function markAttn(configData){
    return {
        type: MARK_ATTENDANCE,
        payload: configData,
    }
}

export function checkAttnStatus(configData){
    return {
        type: CHECK_ATTENDANCE_STATUS,
        payload: configData,
    }
}

export function fetchTaskNameList(configData){
    return {
        type: FETCH_TASK_NAME,
        payload: configData,
    }
}

export function selectTaskAndFilterSubTask(taskObj){
    return {
        type: FILTER_SUBTASK_FOR_TASK,
        payload: taskObj,
    }
}

export function selectSubTask(subtask){
    return {
        type: SELECTED_SUBTASK,
        payload: subtask,
    }
}

export function renderDynamicForm(configData){
    return {
        type: RENDER_DYNAMIC_FORM,
        payload: configData,
    }
}