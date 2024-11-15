import {
    MARK_ATTENDANCE,
    CHECK_ATTENDANCE_STATUS,
    FETCH_TASK_NAME,
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
