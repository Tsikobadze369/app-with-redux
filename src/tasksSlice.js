// tasksSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const fakeAPICall = (data) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        // { id: 1, title: "Task 1" },
        // { id: 2, title: "Task 2" },
        // { id: 3, title: "Task 3" },
      ]);
    }, 1000); // Simulate a 1-second delay
  });
};

export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
  const response = await fakeAPICall(/* Your data fetching logic */);
  return response;
});

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    loading: false,
    error: null,
    darkMode: false, // Set the initial state for darkMode to false
  },
  reducers: {
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    deleteTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { addTask, deleteTask, toggleDarkMode } = tasksSlice.actions;

export default tasksSlice.reducer;
