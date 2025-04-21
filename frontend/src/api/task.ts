import instance from './axios';

export interface TaskData {
  title: string;
  description?: string;
  assignedTo?: string;
  status?: string;
}

export const createTask = async (data:TaskData) => {
  return await instance.post('/api/tasks', data);
};

export const getAllTasks = async () => {
  return await instance.get('/api/tasks');
};

export const getMyTasks = async () => {
  return await instance.get('/api/tasks/my');
};

export const updateTaskStatus = async (taskId: string, status: string) => {
  return await instance.put(`/api/tasks/${taskId}/status`, { status });
};

export const updateTask = async (taskId: string, data:TaskData) => {
  return await instance.put(`/api/tasks/${taskId}`, data);
};

export const deleteTask = async (taskId: string) => {
  return await instance.delete(`/api/tasks/${taskId}`);
};