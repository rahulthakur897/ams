import {put, takeLatest} from 'redux-saga/effects';
import {makeApiCall} from '../../utils';
import {
  API_LOADING,
  API_FAILURE,
  USER_LOGIN_INITIATED,
  USER_LOGIN_SUCCESS,
  GET_DEALER_LIST,
  GET_DEALER_LIST_SUCCESS,
  FETCH_TASK_LIST,
  FETCH_TASK_LIST_SUCCESS,
} from '../Constant';

function* doLogin(configData) {
  yield put({type: API_LOADING});
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: USER_LOGIN_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* getDealerList(configData) {
  const response = yield makeApiCall(configData.payload);
  if (response?.Data) {
    yield put({type: GET_DEALER_LIST_SUCCESS, response: response.Data[0]});
  } else {
    yield put({type: API_FAILURE});
  }
}

function* fetchTaskList(configData){
  const response = yield makeApiCall(configData.payload);
  if (response !== undefined) {
    yield put({type: FETCH_TASK_LIST_SUCCESS, response});
  } else {
    yield put({type: API_FAILURE});
  }
}

export function* getUserSaga() {
  yield takeLatest(USER_LOGIN_INITIATED, doLogin);
  yield takeLatest(GET_DEALER_LIST, getDealerList);
  yield takeLatest(FETCH_TASK_LIST, fetchTaskList);
}
