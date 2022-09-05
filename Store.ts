import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Features/Users";
import appReducer from "./Features/App";
import authReducer from "./Features/Auth";

export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
