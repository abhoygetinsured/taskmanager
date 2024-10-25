import { createSlice } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  name: string;
  assignedBy: string;
  assignedTo: string;
}

interface TaskState {
  tasks: Task[];
}

const initialState: TaskState = {
  tasks: [],
};

const TaskSlice = createSlice({
  name: "TaskSlice",
  initialState: initialState,
  reducers: {
    addTask: (state, action) => {
      const task: Task = action.payload;
      state.tasks = [...state.tasks, task];
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload.id);
    },
    editTask: (state, action) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload;
        } else return task;
      });
    },
  },
});

export default TaskSlice.reducer;
export const { addTask, deleteTask, editTask } = TaskSlice.actions;
