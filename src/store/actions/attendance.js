import {
    PUNCH_IN_ATTENDANCE,
    PUNCH_OUT_ATTENDANCE,
    CHECK_ATTENDANCE_STATUS,
} from "../Constant";

export function doCheckIn(configData){
    return {
        type: PUNCH_IN_ATTENDANCE,
        payload: configData,
    }
}

export function doCheckOut(configData){
    return {
        type: PUNCH_OUT_ATTENDANCE,
        payload: configData,
    }
}

export function checkAttendanceStatus(configData){
    console.log("in action");
    return {
        type: CHECK_ATTENDANCE_STATUS,
        payload: configData,
    }
}