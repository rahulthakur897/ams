import {
    USER_LOGIN_INITIATED,
    USER_LOGOUT_INITIATED,
    GET_DEALER_LIST,
    UPDATE_USER_LOCATION,
    RESET_USER_LOCATION,
    FETCH_TASK_LIST,
    UPDATE_DEALER,
} from "../Constant";

export function doLogin(configData, action){
    return {
        type: USER_LOGIN_INITIATED,
        payload: {configData, action},
    }
}

export function getDealerList(configData){
    return {
        type: GET_DEALER_LIST,
        payload: configData,
    }
}

export function updateUserLatLong(jsonData){
    return {
        type: UPDATE_USER_LOCATION,
        payload: jsonData,
    }
}

export function resetUserLatLong(){
    return {
        type: RESET_USER_LOCATION,
    }
}

export function updateDealer(dealer){
    return {
        type: UPDATE_DEALER,
        payload: dealer,
    }
}

export function fetchTaskList(configData){
    return {
        type: FETCH_TASK_LIST,
        payload: configData,
    }
}

export function doLogoutAction(){
    return {
        type: USER_LOGOUT_INITIATED,
    }
}

