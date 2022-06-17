import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import gameService from "./gameService";

const initialState = {
  score: -1,
  data: null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Create new goal
export const createGame = createAsyncThunk(
  "games/create",
  async (gameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.createGame(gameData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//get this game rating

export const getGame = createAsyncThunk(
  "game/getOne",
  async (gameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.getGame(gameData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//update game rating

export const updateGame = createAsyncThunk(
  "game/update",
  async (gameData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await gameService.updateGame(gameData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
        state.score = action.payload.rating;
      })
      .addCase(createGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(getGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;

        state.score = action.payload[0].rating;
      })
      .addCase(getGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateGame.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.score = action.payload.rating;
        state.data = action.payload;
      })
      .addCase(updateGame.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = gameSlice.actions;
export default gameSlice.reducer;
