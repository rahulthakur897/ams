import {put, takeLatest} from 'redux-saga/effects';
import {makeApiCall} from '../../utils';
import {
  API_LOADING,
  API_FAILURE,
  DOWNLOAD_REPORT,
  DOWNLOAD_REPORT_SUCCESS,
} from '../Constant';

function* downloadEmpReport(configData) {
  yield put({type: API_LOADING});
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: DOWNLOAD_REPORT_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}
export function* getReportSaga() {
  yield takeLatest(DOWNLOAD_REPORT, downloadEmpReport);
}
