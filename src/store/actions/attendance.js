import {
    MARK_ATTENDANCE,
    CHECK_ATTENDANCE_STATUS,
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
