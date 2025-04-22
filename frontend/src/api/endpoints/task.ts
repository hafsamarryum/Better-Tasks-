import axiosInstance from "../axios";

export interface TaskData {
  title: string;
  description?: string;
  assigneeId?: string;
  status?: string;
}

const PREFIX = "/api/tasks";

export const createTask = async (data: TaskData) => {
  return await axiosInstance.post(`${PREFIX}`, data);
};

export const getAllTasks = async () => {
  return await axiosInstance.get(PREFIX);
};

export const getMyTasks = async () => {
  return await axiosInstance.get(`${PREFIX}/my`);
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  return await axiosInstance.put(`${PREFIX}/${taskId}/status`, { status });
};

export const updateTask = async (taskId: string, data: TaskData) => {
  return await axiosInstance.put(`${PREFIX}/${taskId}`, data);
};

export const deleteTask = async (taskId: string) => {
  return await axiosInstance.delete(`${PREFIX}/${taskId}`);
};
