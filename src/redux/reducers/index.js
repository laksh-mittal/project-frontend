import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import { productReducer, selectedProductReducer } from "./productReducer";
import searchReducer from "./searchReducer";

const reducers = combineReducers({
  allProducts: productReducer,
  product: selectedProductReducer,
  userStatus: loginReducer,
  searchTerm: searchReducer,
});

export default reducers;
