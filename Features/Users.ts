import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  users: any;
}

const initialState: CounterState = {
  users: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<any>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = userSlice.actions;

export default userSlice.reducer;
