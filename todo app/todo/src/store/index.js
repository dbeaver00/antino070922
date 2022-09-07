import { createSlice, configureStore } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    items: [],
  },
  reducers: {
    addTodo(state , actions) {
        state.items.push(actions.payload)
    },
    removeTodo(state , actions ){
        const id = actions.payload;
        state.items = state.items.filter( item => item.id !== id )
    }
  },
});

const store = configureStore({ reducer: todoSlice.reducer });

export const todoAction = todoSlice.actions;

export default store ;

