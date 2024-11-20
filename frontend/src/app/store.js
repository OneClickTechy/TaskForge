import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/userSlicer";
import { taskApi } from "./services/taskSlicer";
import { categoryApi } from "./services/categorySlice";
import { setupListeners } from "@reduxjs/toolkit/query";
export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [taskApi.reducerPath]: taskApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      taskApi.middleware,
      categoryApi.middleware
    ),
});
setupListeners(store.dispatch);
