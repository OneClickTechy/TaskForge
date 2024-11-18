import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/auth",
  }),
  tagTypes: ["User"],
  endpoints: (builder) => ({
    verify: builder.mutation({
      query: (email) => ({
        url: `/verify`,
        method: "POST",
        body: { email },
      }),
    }),
    register: builder.mutation({
      query: (userInfo) => ({
        url: `/register`,
        method: "POST",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),
    login: builder.mutation({
      query: (userInfo) => ({
        url: `/login`,
        method: "POST",
        body: userInfo,
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    logout: builder.mutation({
      query: () => ({
        url: `/logout`,
        method: "POST",
        credentials: "include",
      }),
      invalidatesTags: ["User"],
    }),
    forgetPassword: builder.mutation({
      query: (email) => ({
        url: `/forgetPassword`,
        method: "POST",
        body: { email },
      }),
    }),
    resetPassword: builder.mutation({
      query: (info) => ({
        url: `/resetPassword`,
        method: 'POST',
        body: info,
      })
    }),
    getme: builder.query({
      query: () => ({
        url: `/getme`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useGetmeQuery,
  useVerifyMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = userApi;
