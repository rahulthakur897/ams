import { API_LOADING } from "../Constant";

const initialState = {
  isLoading: false,
};

export const calendarReducer = (state = initialState, action) => {
  switch (action.type) {
    case API_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};
