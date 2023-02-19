import { ActionTypes } from "../constants/action-types";

const initialState = {
  isLoggedIn: false,
  userEmail: "",
  brand: "",
  category: "",
};

const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.LOGIN:
      return {
        ...state,
        isLoggedIn: action.payload.result,
        userEmail: action.payload.email,
        brand: action.payload.brand,
        category: action.payload.category,
      };
    case ActionTypes.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        userEmail: "",
        brand: "",
        category: "",
      };
    default:
      return state;
  }
};

export default loginReducer;
