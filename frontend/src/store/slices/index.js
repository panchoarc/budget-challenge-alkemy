import { combineReducers } from "redux";

import alertSlice from "./alertSlice";
import authSlice from "./authSlice";
import operationsSlice from "./operationSlice";

const rootReducer = combineReducers({
  alert: alertSlice,
  auth: authSlice,
  operations: operationsSlice,
});

export default rootReducer;
