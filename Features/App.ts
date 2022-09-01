// redux imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AppStates {
  loading: Boolean;
}

const initialState: AppStates = {
  loading: false,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = AppSlice.actions;

export default AppSlice.reducer;
