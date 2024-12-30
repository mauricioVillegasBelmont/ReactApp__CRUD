import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { IUser } from "./interface";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    // USERS
    getUsers: builder.query<IUser[], void>({
      query: () => ({ url: `/users` }),
      providesTags: ["Users"],
    }),
    getUser: builder.query({
      query: (id: number | string) => ({ url: `/users/${id}` }),
      providesTags: ["Users"],
    }),
    updateUser: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        body: JSON.stringify(patch),
      }),
      invalidatesTags: ["Users"],
    }),
    deleteUser: builder.mutation({
      query: (id: number | string) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = usersApi;
