import { ActionTypes } from "../constants/action-types";

export const setPreferences = (status) => {
  return {
    type: ActionTypes.SET_PREFERENCES,
    payload: status,
  };
};
