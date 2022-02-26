import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../config/axiosClient";
import { retrieveUserData } from "../../helpers/jwtdecoding";
import { setErrorMessage, setSuccessfullMessage } from "./alertSlice";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/auth/signup", user);
      thunkAPI.dispatch(setSuccessfullMessage(response.data));
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (user, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/auth/login", user);
      axiosClient.defaults.headers.common["access-token"] = response.data.token;
      const userData = retrieveUserData(response.data.token);
      return { token: response.data.token, user: userData };
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
    }
  }
);

export const logoutUser = createAsyncThunk("auth/logout", async () => {
  return localStorage.removeItem("token");
});

const initialState = {
  user: null,
  isLoggedIn: false,
  isLoading: null,
  error: null,
  isValid: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: {
    [registerUser.pending]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.isLoading = true;
      state.error = false;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = false;
    },
    [registerUser.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = true;
    },
    [loginUser.pending]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isLoading = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = true;
      state.user = payload.user;
      state.error = false;
      localStorage.setItem("token", payload.token);
    },
    [loginUser.rejected]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
      state.error = true;
      localStorage.removeItem("token");
    },
    [logoutUser.fulfilled]: (state, { payload }) => {
      state.isLoggedIn = false;
      state.user = null;
      state.isValid = false;
    },
  },
});

const { reducer } = authSlice;

export default reducer;
