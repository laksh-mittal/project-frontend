import { ActionTypes } from "../constants/action-types";

export const setSearchTerm = (term) => {
  return {
    type: ActionTypes.SEARCH_TERM,
    payload: term,
  };
};
