import {API_LOADING, DOWNLOAD_REPORT_SUCCESS} from '../Constant';

const initialState = {
  isLoading: false,
  userReport: [],
};

export const reportReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case DOWNLOAD_REPORT_SUCCESS: {
      const response = action?.response;
      console.log("response", response);
      return {
        ...state,
        userReport: response,
      };
    }
    default:
      return state;
  }
};
