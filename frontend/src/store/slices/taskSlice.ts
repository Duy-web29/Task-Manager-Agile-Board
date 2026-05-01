import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../../schemas/taskSchema';
import { taskService } from '../../services/api';

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  return await taskService.getAllTasks();
});

export const addTask = createAsyncThunk('tasks/addTask', async (task: Task) => {
  return await taskService.createTask(task);
});

export const updateTask = createAsyncThunk('tasks/updateTask', async ({ id, data }: { id: number, data: Partial<Task> }) => {
  return await taskService.updateTask(id, data);
});

export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id: number) => {
  await taskService.deleteTask(id);
  return id;
});

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
      });
  }
});

export default taskSlice.reducer;
