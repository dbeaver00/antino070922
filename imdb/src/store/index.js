import { configureStore } from "@reduxjs/toolkit";

import showReducer from "./Shows-slice";

const store = configureStore({ reducer: { shows: showReducer } });

export default store;
