import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const categoryApi = createApi({
  reducerPath: "categoryApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/category",
  }),
  endpoints: (builder) => ({
    createCategory: builder.mutation({
      query: (category) => ({
        url: `/`,
        method: "PATCH",
        body: { category },
        credentials: "include",
      }),
    }),
    getCategory: builder.query({
      query: () => ({
        url: `/`,
        method: "GET",
        credentials: "include",
      }),
    }),
    updateCategory: builder.mutation({
      query: (oldCategory, newCategory) => ({
        url: `/update`,
        method: "PATCH",
        body: { oldCategory, newCategory },
        credentials: "include",
      }),
    }),
    deleteCategory: builder.mutation({
      query: (category) => ({
        url: `/`,
        method: "DELETE",
        body: { category },
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useGetCategoryQuery,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;
