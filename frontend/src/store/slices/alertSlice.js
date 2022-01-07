import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: "",
  status: "",
};

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    setSuccessfullMessage: (state, { payload }) => {
      state.message = payload.message;
      state.status = "success";
    },
    setErrorMessage: (state, { payload }) => {
      state.message = payload.message;
      state.status = "error";
    },
    clearMessage: (state, { payload }) => {
      return initialState;
    },
  },
});

const { reducer, actions } = messageSlice;

export const { setSuccessfullMessage, setErrorMessage, clearMessage } = actions;
export default reducer;
