import {put, takeLatest, select, call} from 'redux-saga/effects';
import {makeApiCall} from '../../utils';
import {
  API_LOADING,
  API_FAILURE,
  GET_EMP_ATTENDANCE_DETAIL,
  GET_MONTHLY_ATTENDANCE_SUCCESS,
} from '../Constant';

function* fetchEmpAttendance(configData) {
  
  yield put({type: API_LOADING});
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: GET_MONTHLY_ATTENDANCE_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}
export function* getReportSaga() {
  yield takeLatest(GET_EMP_ATTENDANCE_DETAIL, fetchEmpAttendance);
}
