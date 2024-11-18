import {
  API_LOADING,
  API_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_DEALER_LIST_SUCCESS,
  UPDATE_DEALER,
  UPDATE_USER_LOCATION,
  FETCH_TASK_LIST_SUCCESS,
} from '../Constant';
import {Storage} from '../../utils';

const initialState = {
  isLoading: false,
  isLoginError: false,
  userData: {},
  dealerList: [],
  selectedDealer: {},
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
      Storage.setAsyncItem('userData', Data);
      return {
        ...state,
        userData: Data,
        isLoading: false,
      };
    }
    case GET_DEALER_LIST_SUCCESS: {
      const {Dealers} = action.response;
      return {
        ...state,
        dealerList: Dealers,
      };
    }
    case UPDATE_DEALER: {
      const selectedDealer = action.payload;
      Storage.setAsyncItem('selectedDealer', selectedDealer);
      return {
        ...state,
        selectedDealer,
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
    case FETCH_TASK_LIST_SUCCESS: {
      const {Data} = action.response;
      return {
        ...state,
        taskList: Data,
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
