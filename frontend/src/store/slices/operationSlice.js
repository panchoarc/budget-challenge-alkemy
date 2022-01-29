import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../../config/axiosClient";
import { calculateBudget } from "../../helpers/calculateBudget";
import { setErrorMessage, setSuccessfullMessage } from "./alertSlice";

export const createOperation = createAsyncThunk(
  "operations/create",
  async (operation, thunkAPI) => {
    try {
      const response = await axiosClient.post("/api/operations", operation);
      thunkAPI.dispatch(setSuccessfullMessage(response.data));
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
      thunkAPI.rejectWithValue();
    }
  }
);

export const getLast10Operations = createAsyncThunk(
  "operations/getLast10Operations",
  async (thunkAPI) => {
    try {
      const { data } = await axiosClient.get("/api/operations");
      return data.operations;
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
      thunkAPI.rejectWithValue();
    }
  }
);

export const getOperation = createAsyncThunk(
  "operations/getOperation",
  async (id, thunkAPI) => {
    try {
      const { data } = await axiosClient.get(`/api/operations/${id}`);
      return data.operation;
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
      thunkAPI.rejectWithValue();
    }
  }
);

export const updateOperation = createAsyncThunk(
  "operations/updateOperation",
  async (operation, thunkAPI) => {
    try {
      const response = await axiosClient.put(
        `/api/operations/${operation.id}`,
        operation
      );
      thunkAPI.dispatch(setSuccessfullMessage(response.data));
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
    }
  }
);

export const deleteOperation = createAsyncThunk(
  "operations/deleteOperation",
  async (id, thunkAPI) => {
    try {
      const response = await axiosClient.delete(`/api/operations/${id}`);
      thunkAPI.dispatch(setSuccessfullMessage(response.data));
      return { id: id };
    } catch (error) {
      thunkAPI.dispatch(setErrorMessage(error.response.data));
    }
  }
);

const initialState = {
  operations: [],
  error: null,
  loading: null,
  totalBudget: 0,
  selectedOperation: null,
};

const operationsSlice = createSlice({
  name: "operations",
  initialState,
  extraReducers: {
    [createOperation.fulfilled]: (state, { payload }) => {
      state.error = false;
    },
    [createOperation.rejected]: (state, { payload }) => {
      state.error = true;
    },
    [getLast10Operations.pending]: (state, { payload }) => {
      state.loading = true;
      state.operations = [];
      state.error = false;
      state.selectedOperation = null;
    },
    [getLast10Operations.fulfilled]: (state, { payload }) => {
      state.error = false;
      state.operations = payload;
      state.loading = false;
      state.totalBudget = calculateBudget(state.operations);
    },
    [getLast10Operations.rejected]: (state, { payload }) => {
      state.error = true;
      state.operations = [];
      state.loading = false;
    },
    [getOperation.pending]: (state, { payload }) => {
      state.loading = true;
      state.selectedOperation = null;
    },
    [getOperation.fulfilled]: (state, { payload }) => {
      console.log(payload);
      state.loading = false;
      state.selectedOperation = payload;
    },
    [updateOperation.pending]: (state, { payload }) => {
      state.loading = true;
      state.error = false;
    },
    [updateOperation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = false;
    },
    [updateOperation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.selectedOperation = null;
    },
    [deleteOperation.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
      state.operations = [
        ...state.operations.filter((operation) => operation.id !== payload.id),
      ];
      state.totalBudget = calculateBudget(state.operations);
    },
    [deleteOperation.rejected]: (state, { payload }) => {
      state.loading = false;
      state.error = true;
    },
  },
});

const { reducer } = operationsSlice;

export default reducer;
