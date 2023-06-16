import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import axiosInstance from "../api/axiosInstance";

export const fetchWord = createAsyncThunk(
  "fetch/fetchWords",
  async (params, { getState, requestId }) => {
    console.log("fetchWords");
    const { amount, difficulty } = getState().game;
    const { currentRequestId, loading } = getState().fetch;

    if (loading !== "pending" || currentRequestId !== requestId.toString()) {
      return;
    }

    const response = await axiosInstance["get"]("/api/v1/word", {
      params: {
        difficulty: difficulty,
        amount: amount,
      },
    });
    console.log("fetch slice", response.data.wordList);
    return response.data.wordList;
  }
);

export const fetchSlice = createSlice({
  name: "fetch",
  initialState: {
    entities: [],
    loading: "idle",
    currentRequestId: undefined,
    fetchStatus: null,
    isFetchErr: false,
    fetchError: "",
  },
  reducers: {
    setFetchErr: (state, action) => {
      state.isFetchErr = true;
      state.fetchStatus = "error";
      state.fetchError = action.payload.message;
      state.gameEnd = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWord.pending, (state, action) => {
        if (state.loading === "idle") {
          state.loading = "pending";
          state.currentRequestId = action.meta.requestId;
          state.fetchStatus = "loading";
          state.isFetchErr = false;
        }
      })
      .addCase(fetchWord.fulfilled, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.entities = action.payload;
          state.loading = "idle";
          state.currentRequestId = undefined;
          state.fetchStatus = "success";
          state.isFetchErr = false;
        }
      })
      .addCase(fetchWord.rejected, (state, action) => {
        const { requestId } = action.meta;
        if (
          state.loading === "pending" &&
          state.currentRequestId === requestId
        ) {
          state.loading = "idle";
          state.fetchError = action.error.message;
          state.isFetchErr = true;
          state.currentRequestId = undefined;
          state.fetchStatus = "error";
          state.gameEnd = true;
        }
      });
  },
});

export const { setFetchErr } = fetchSlice.actions;

export const entity = (state) => state.fetch.entities;
export const loading = (state) => state.fetch.loading;
export const fetchStatus = (state) => state.fetch.fetchStatus;
export const isFetchErr = (state) => state.fetch.isFetchErr;

export default fetchSlice.reducer;
