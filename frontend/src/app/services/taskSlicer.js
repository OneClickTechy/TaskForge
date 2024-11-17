import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taskApi = createApi({
  reducerPath: "taskApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/task",
  }),
  tagTypes: ["Task"],
    endpoints: (builder) => ({
    getTasks: builder.query({
      query: () => ({
        url: `/tasks`,
        credentials: "include",
      }),
    }),
    createTask: builder.mutation({
      query: (task) => ({
        url: `/create`,
        method: "POST",
        body: task,
        credentials: "include",
      }),
    }),
  }),
});

export const { useCreateTaskMutation, useGetTasksQuery } = taskApi;
