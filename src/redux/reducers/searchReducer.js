import { ActionTypes } from "../constants/action-types";

const intialState = {
  searchTerm: "",
};

const searchReducer = (state = intialState, { type, payload }) => {
  switch (type) {
    case ActionTypes.SEARCH_TERM:
      return { ...state, searchTerm: payload };
    default:
      return state;
  }
};

export default searchReducer;
