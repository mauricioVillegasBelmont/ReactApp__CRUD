import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "app/store";
import { IUser as shopper } from "features/user/interface";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  user: User | shopper |string;
  token: string;
  isAdmin: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
    prepareHeaders: (headers, { getState }) => {
      const token = (getState() as RootState).auth.token;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          localStorage.setItem("accessToken", data.token); // Guardar el token
        } catch (err) {
          console.error("Login error:", err);
        }
      },
    }),
    logout: builder.mutation({
      // query: () => ({
      //   url: "/logout",
      //   method: "POST",
      // }),
      queryFn: () => {
        return { data: undefined };
      },
      async onQueryStarted(arg, { dispatch }) {
        localStorage.removeItem("accessToken");
        dispatch(authApi.util.resetApiState());
      },
    }),
    protected: builder.mutation<{ message: string }, void>({
      query: () => "protected",
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useProtectedMutation } = authApi;
