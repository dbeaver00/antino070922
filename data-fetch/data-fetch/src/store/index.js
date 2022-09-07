import {
  createSlice,
  configureStore,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchDataFromApi = createAsyncThunk(
  "fetch/fetchDataFromApi",
  async () => {
    const response = await fetch("https://jsonplaceholder.typicode.com/todos", {
      method: "GET",
    });
    const data = await response.json();
    return data;
  }
);

const fetchSlice = createSlice({
  name: "fetch",
  initialState: { items: [], ascend: false, editable: "" },
  reducers: {
    toggle(state) {
      if (state.ascend === true) {
        state.items.sort((a, b) => a.id - b.id);
      } else {
        state.items.sort((a, b) => b.id - a.id);
      }
      state.ascend = !state.ascend;
    },
    deleteItemFromList(state, action) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    editItem(state, action) {
      const id = action.payload;
      if (state.editable === id) {
        state.editable = "";
      } else {
        state.editable = id;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchDataFromApi.fulfilled, (state, actions) => {
      state.items = actions.payload;
    });
  },
});

const store = configureStore({ reducer: fetchSlice.reducer });

export const fetchActions = fetchSlice.actions;

export default store;
