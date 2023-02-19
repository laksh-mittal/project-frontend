import { ActionTypes } from "../constants/action-types";

export const setLoginStatus = (status) => {
  return {
    type: ActionTypes.LOGIN,
    payload: status,
  };
};
