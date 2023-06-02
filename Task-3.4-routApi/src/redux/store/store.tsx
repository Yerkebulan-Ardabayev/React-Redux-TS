import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../slice/postsSlice";
import todoReduser from "../slice/todoSlice";
import userReduser from "../slice/userSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    todo: todoReduser,
    user: userReduser
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
