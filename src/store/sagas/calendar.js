import {put, takeLatest} from 'redux-saga/effects';
import {makeApiCall} from '../../utils';
import {
  API_LOADING,
  API_FAILURE,
  GET_MONTHLY_ATTENDANCE,
  GET_MONTHLY_ATTENDANCE_SUCCESS,
} from '../Constant';

function* getAttendance(configData) {
  yield put({type: API_LOADING});
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: GET_MONTHLY_ATTENDANCE_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

export function* getCalendarSaga() {
  yield takeLatest(GET_MONTHLY_ATTENDANCE, getAttendance);
}
