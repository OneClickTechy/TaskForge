import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth",
  }),
  tagTypes: ['User'], 
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userInfo) => ({
        url: `/register`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ['User'], 
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: `/login`,
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ['User'], 
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ['User'], 
    }),
    getme: builder.query({
      query: () => ({
        url: `/getme`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ['User'], 
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetmeQuery,
} = userApi;
