import {put, takeLatest} from 'redux-saga/effects';
import {
  API_FAILURE,
  MARK_ATTENDANCE,
  MARK_ATTENDANCE_SUCCESS,
  CHECK_ATTENDANCE_STATUS,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
} from '../Constant';
import {makeApiCall} from '../../utils';

function* markYourAttn(configData) {
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: MARK_ATTENDANCE_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* checkAttnStatus(configData) {
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
  yield takeLatest(MARK_ATTENDANCE, markYourAttn);
  yield takeLatest(CHECK_ATTENDANCE_STATUS, checkAttnStatus);
}
