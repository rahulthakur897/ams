import {
    USER_LOGIN_INITIATED,
    GET_BILLER_LIST,
    UPDATE_USER_LOCATION,
    FETCH_TASK_LIST,
} from "../Constant";

export function doLogin(configData){
    return {
        type: USER_LOGIN_INITIATED,
        payload: configData,
    }
}

export function getBillerList(configData){
    return {
        type: GET_BILLER_LIST,
        payload: configData,
    }
}

export function updateUserLatLong(jsonData){
    return {
        type: UPDATE_USER_LOCATION,
        payload: jsonData,
    }
}

export function fetchTaskList(configData){
    return {
        type: FETCH_TASK_LIST,
        payload: configData,
    }
}

