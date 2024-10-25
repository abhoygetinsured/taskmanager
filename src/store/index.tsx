import { configureStore } from "@reduxjs/toolkit";

import Navslice from "../slices/Navslice";
import TaskSlice from "../slices/TaskSlice"

export const store = configureStore({
  reducer: {
    NavData: Navslice,
    TaskList: TaskSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;