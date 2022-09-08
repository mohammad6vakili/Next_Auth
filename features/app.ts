// redux imports
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AppStates {
  loading: any;
}

const initialState: AppStates = {
  loading: false,
};

export const AppSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<any>) => {
      state.loading = action.payload;
    },
  },
});

export const { setLoading } = AppSlice.actions;

export default AppSlice.reducer;
