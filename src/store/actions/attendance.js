import {
    PUNCH_IN_ATTENDANCE,
    PUNCH_OUT_ATTENDANCE,
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