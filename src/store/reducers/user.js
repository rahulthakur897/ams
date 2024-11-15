import {
  API_LOADING,
  API_FAILURE,
  USER_LOGIN_SUCCESS,
  GET_BILLER_LIST_SUCCESS,
  UPDATE_BILLER,
  UPDATE_USER_LOCATION,
  FETCH_TASK_LIST_SUCCESS,
} from '../Constant';
import {Storage} from '../../utils';
const initialState = {
  isLoading: false,
  isLoginError: false,
  userData: {},
  billerList: [],
  selectedBiller: {},
  latitude: null,
  longitude: null,
  empAttID: null,
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
    case GET_BILLER_LIST_SUCCESS: {
      const {Dealers} = action.response;
      return {
        ...state,
        billerList: Dealers,
      };
    }
    case UPDATE_BILLER: {
      const selectedBiller = action.payload;
      return {
        ...state,
        selectedBiller,
      };
    }
    case UPDATE_USER_LOCATION: {
      const {latitude, longitude} = action.payload;
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
