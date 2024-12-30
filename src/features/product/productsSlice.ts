import { createApi, fetchBaseQuery, } from "@reduxjs/toolkit/query/react";
import { IProduct } from "./interface";

export const productsApi = createApi({
  reducerPath: "productsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_API_PATH,
  }),
  tagTypes: ["Products"],
  endpoints: (builder) => ({
    // PRODUCT
    getProducts: builder.query<IProduct[], void>({
      query: () => ({ url: `/products` }),
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (id: number | string) => ({ url: `/products/${id}` }),
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (post) => ({
        url: `/products`,
        method: "POST",
        body: JSON.stringify(post),
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/products/${id}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: ["Products"],
    }),
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getCategories: builder.query<string[], void>({
      query: () => ({ url: `/products/categories` }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = productsApi;
