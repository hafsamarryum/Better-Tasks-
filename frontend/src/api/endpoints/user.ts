import { UserRole } from '../../utilities/enum';
import axiosInstance from '../axios';

const PREFIX = "/api/users/"

export const getUsers = async () => {
  return await axiosInstance.get(PREFIX);
};

export const changeUserRole = async (userId: string, role: UserRole) => {
  return await axiosInstance.put(`${PREFIX}${userId}/role`, { role });
};

export const deleteUser = async (userId: string) => {
  return await axiosInstance.patch(`${PREFIX}${userId}/deactivate`);
};

export const updateUser = async (userId: string, updatedData: { name?: string; email?: string; password?: string }) => {
  return await axiosInstance.put(`/api/users/${userId}`, updatedData);
};
