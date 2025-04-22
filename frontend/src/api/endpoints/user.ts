import axiosInstance from '../axios';

const PREFIX = "/api/users/"

export const getUsers = async () => {
  return await axiosInstance.get(PREFIX);
};

export const changeUserRole = async (userId: string) => {
  return await axiosInstance.put(`${PREFIX}${userId}/role`);
};

export const deleteUser = async (userId: string) => {
  return await axiosInstance.delete(`${PREFIX}${userId}`);
};