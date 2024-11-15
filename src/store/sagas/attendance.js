import {put, takeLatest} from 'redux-saga/effects';
import {
  API_FAILURE,
  MARK_ATTENDANCE,
  MARK_ATTENDANCE_SUCCESS,
  CHECK_ATTENDANCE_STATUS,
  CHECK_ATTENDANCE_STATUS_SUCCESS,
  FETCH_TASK_NAME,
  FETCH_TASK_NAME_SUCCESS,
  RENDER_DYNAMIC_FORM,
  RENDER_DYNAMIC_FORM_SUCCESS,
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
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: CHECK_ATTENDANCE_STATUS_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* fetchTaskNameList(configData) {
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: FETCH_TASK_NAME_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* fetchFormValues(configData){
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: RENDER_DYNAMIC_FORM_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

export function* getAttendanceSaga() {
  yield takeLatest(MARK_ATTENDANCE, markYourAttn);
  yield takeLatest(CHECK_ATTENDANCE_STATUS, checkAttnStatus);
  yield takeLatest(FETCH_TASK_NAME, fetchTaskNameList);
  yield takeLatest(RENDER_DYNAMIC_FORM, fetchFormValues)
}


