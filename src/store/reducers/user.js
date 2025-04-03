import {
  API_LOADING,
  API_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  GET_DEALER_LIST_SUCCESS,
  UPDATE_DEALER,
  CLEAR_SELECTED_DEALER,
  UPDATE_USER_LOCATION,
  RESET_USER_LOCATION,
  FETCH_TASK_LIST_SUCCESS,
  CLEAR_TASK_LIST,
  USER_LOGOUT_INITIATED,
} from '../Constant';
import moment from 'moment';
import {Storage} from '../../utils';

const initialState = {
  isLoading: false,
  isLoginError: false,
  loginErrMsg: '',
  userData: {},
  dealerList: [],
  selectedDealer: null,
  latitude: null,
  longitude: null,
  taskList: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case USER_LOGIN_SUCCESS: {
      const {Data} = action.response;
      const updatedData = {...Data, LoginTime: moment.unix(moment())};
      Storage.setAsyncItem('userData', updatedData);
      return {
        ...state,
        userData: updatedData,
        loginErrMsg: '',
        isLoading: false,
        isLoginError: false,
      };
    }
    case USER_LOGIN_FAILED: {
      const {message} = action.response;
      return {
        ...state,
        loginErrMsg: message,
        isLoginError: true,
        isLoading: false,
      };
    }
    case GET_DEALER_LIST_SUCCESS: {
      const {Dealers} = action.response;
      //add additional entry for others
      const updatedDealerList = [...Dealers, {DealerName: 'Others', DealerID: 0}];
      return {
        ...state,
        dealerList: updatedDealerList,
      };
    }
    case UPDATE_DEALER: {
      const selectedDealer = action?.payload;
      Storage.setAsyncItem('selectedDealer', selectedDealer);
      return {
        ...state,
        selectedDealer,
      };
    }
    case CLEAR_SELECTED_DEALER: {
      Storage.clearAsyncItem('selectedDealer');
      return {
        ...state,
        selectedDealer: null,
      };
    }
    case UPDATE_USER_LOCATION: {
      const {latitude, longitude} = action.payload;
      Storage.setAsyncItem('latlong', {latitude, longitude});
      return {
        ...state,
        latitude,
        longitude,
      };
    }
    case RESET_USER_LOCATION: {
      Storage.clearAsyncItem('latlong');
      return {
        ...state,
        latitude: null,
        longitude: null,
      };
    }
    case FETCH_TASK_LIST_SUCCESS: {
      const {Data} = action.response;
      return {
        ...state,
        taskList: Data,
      };
    }
    case CLEAR_TASK_LIST: {
      return {
        ...state,
        taskList: [],
      };
    }
    case USER_LOGOUT_INITIATED: {
      return {
        ...initialState,
      };
    }
    case API_FAILURE: {
      return {
        ...state,
        isLoading: false,
        isLoginError: true,
      };
    }
    default:
      return state;
  }
};
