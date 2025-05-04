import axiosInstance from "../axios";

export interface TaskData {
  title: string;
  description?: string;
  assigneeId?: number;
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

export const updateTaskAssignee = async (id: string, assigneeId: string) => {
  return await axiosInstance.put(`${PREFIX}/${id}/assignee`, { assigneeId });
};

export const getActivitiesForTask = async (taskId: number | string) => {
  const res = await axiosInstance.get(`${PREFIX}/${taskId}/activities`);
  return res.data.data;
};

export const getDashboardStats = async () => {
  const res = await axiosInstance.get(`${PREFIX}/dashboardStats`);
  return res.data;
};