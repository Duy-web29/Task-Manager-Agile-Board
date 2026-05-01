import axios from "axios";
import { taskSchema } from "../schemas/taskSchema";
import type { Task } from "../schemas/taskSchema";

const api = axios.create({
  baseURL: "http://localhost:8000/api",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export const taskService = {
  getAllTasks: async (): Promise<Task[]> => {
    const response = await api.get("/tasks");
    // Validate the response array against our schema
    return response.data.map((task: any) => taskSchema.parse(task));
  },
  
  createTask: async (task: Task): Promise<Task> => {
    // Validate before sending
    const validData = taskSchema.parse(task);
    const response = await api.post("/tasks", validData);
    return taskSchema.parse(response.data);
  },

  updateTask: async (id: number, task: Partial<Task>): Promise<Task> => {
    const response = await api.put(`/tasks/${id}`, task);
    return taskSchema.parse(response.data);
  },

  deleteTask: async (id: number): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};
