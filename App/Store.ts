import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../Features/Users";
import appReducer from "../Features/App";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
