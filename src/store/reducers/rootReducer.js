import {combineReducers} from "redux";
import {attendanceReducer} from "./attendance";
import {calendarReducer} from "./calendar";
import {reportReducer} from "./report";
import {userReducer} from "./user";

export default combineReducers({
    attendanceReducer,
    calendarReducer,
    reportReducer,
    userReducer,
});
