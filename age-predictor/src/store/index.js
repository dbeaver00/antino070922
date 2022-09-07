import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchDatafromApi = createAsyncThunk(
  "agePredictor/fetchDataFromApi",
  async (userName, { rejectWithValue }) => {
    if (
      /\d/g.test(userName) ||
      /\s/g.test(userName) ||
      /\W/g.test(userName) ||
      /[_]/g.test(userName)
    ) {
      return rejectWithValue("Invalid Format/Value");
    }
    const response = await fetch(`https://api.agify.io/?name=${userName}`, {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
);

const agePredictorSlice = createSlice({
  name: "agePredictor",
  initialState: { userData: {}, initial: true, error: false, loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDatafromApi.fulfilled, (state, actions) => {
      state.userData = actions.payload;
      state.initial = false;
      state.error = false;
      state.loading = false;
    });
    builder.addCase(fetchDatafromApi.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDatafromApi.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });
  },
});

const store = configureStore({
  reducer: agePredictorSlice.reducer,
});

export const agePredictorActions = agePredictorSlice.actions;

export default store;
