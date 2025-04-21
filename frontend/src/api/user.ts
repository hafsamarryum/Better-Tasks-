import instance from './axios';

export const getUsers = async () => {
  return await instance.get('/api/users');
};

export const changeUserRole = async (userId: string) => {
  return await instance.put(`/api/users/${userId}/role`);
};

export const deleteUser = async (userId: string) => {
  return await instance.delete(`/api/users/${userId}`);
};