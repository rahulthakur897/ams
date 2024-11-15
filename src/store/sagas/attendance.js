import {put, takeLatest} from 'redux-saga/effects';
import {
  API_FAILURE,
  PUNCH_IN_ATTENDANCE,
  PUNCH_IN_ATTENDANCE_SUCCESS,
  PUNCH_OUT_ATTENDANCE,
  PUNCH_OUT_ATTENDANCE_SUCCESS,
  CHECK_ATTENDANCE_STATUS,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
} from '../Constant';
import {makeApiCall} from '../../utils';

function* markIn(configData) {
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: PUNCH_IN_ATTENDANCE_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* markOut(configData) {
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: PUNCH_OUT_ATTENDANCE_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* getAttendanceStatus(configData) {
  console.log("in attn saga");
  const response = yield makeApiCall(configData.payload);
  console.log("saga", response)
  if (response !== undefined) {
    yield put({type: CHECK_ATTENDANCE_STATUS_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

export function* getAttendanceSaga() {
  yield takeLatest(PUNCH_IN_ATTENDANCE, markIn);
  yield takeLatest(PUNCH_OUT_ATTENDANCE, markOut);
  yield takeLatest(CHECK_ATTENDANCE_STATUS, getAttendanceStatus);
}
