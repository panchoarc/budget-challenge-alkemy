import { configureStore } from "@reduxjs/toolkit";

//Reducers
import authReducer from "./slices/authSlice";
import alertReducer from "./slices/alertSlice";
import operationsReducer from "./slices/operationSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    alert: alertReducer,
    operations: operationsReducer,
  },
});
