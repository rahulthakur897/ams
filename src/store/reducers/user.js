import {
  API_LOADING,
  API_FAILURE,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAILED,
  GET_DEALER_LIST_SUCCESS,
  UPDATE_DEALER,
  CLEAR_SELECTED_DEALER,
  UPDATE_USER_LOCATION,
  UPDATE_ATT_STATUS,
  RESET_USER_LOCATION,
  FETCH_TASK_LIST_SUCCESS,
  CLEAR_TASK_LIST,
  USER_LOGOUT_INITIATED,
} from '../Constant';
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
  attFlag: 'ReadyForCheckIn',
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
      Storage.setAsyncItem('userData', Data);
      return {
        ...state,
        userData: Data,
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
    case UPDATE_ATT_STATUS: {
      const updatedStatus = action.payload;
      return {
        ...state,
        attFlag: updatedStatus,
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
