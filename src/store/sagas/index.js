import {all} from "redux-saga/effects";
import {getAttendanceSaga} from "./attendance";
import {getCalendarSaga} from "./calendar";
import {getReportSaga} from "./report";
import {getUserSaga} from "./user";

function* rootSaga(){
    yield all([getAttendanceSaga(), getCalendarSaga(), getReportSaga(), getUserSaga()]);
}

export default rootSaga;
