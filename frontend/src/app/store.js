import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userSlicer";
import { setupListeners } from "@reduxjs/toolkit/query";
import { taskApi } from "./services/taskSlicer";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware, taskApi.middleware),
});
setupListeners(store.dispatch);
