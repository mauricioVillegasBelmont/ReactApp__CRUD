import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "features/user/interface";
import type { RootState } from "app/store";



type AuthState = {
  user: IUser | string | null;
  token: string | null;
  isAdmin: boolean | null;
};


const authSlice = createSlice({
  name: "auth",
  initialState: { user: null, token: null, isAdmin: null } as AuthState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, token, isAdmin },
      }: PayloadAction<{
        user: IUser | string;
        token: string;
        isAdmin: boolean;
      }>
    ) => {
      state.user = user;
      state.token = token;
      state.isAdmin = isAdmin; //user instanceof AdminUser;
    },
    logout:(state)=>{
      state.user = null;
      state.token = null;
      state.isAdmin = null;
    },
  },
});

export const { setCredentials } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: RootState) => state.auth;
