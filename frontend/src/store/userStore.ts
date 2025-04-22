import axios from 'axios';
import { create } from 'zustand';
import { UserRole } from '../utilities/enum'
import axiosInstance from '../api/axios';

type Role = UserRole.ADMIN | UserRole.MEMBER;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  toggleUserRole: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
}

export const useUserStore = create<UserStore>((set, get) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const res = await axiosInstance.get('/api/users/');
      set({ users: res.data.data });
    } catch (err) {
      console.error('Error fetching users', err);
    }
  },

  toggleUserRole: async (id) => {
    try {
      await axios.patch(`/users/${id}/role`);
      get().fetchUsers();
    } catch (err) {
      console.error('Error toggling role', err);
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`/users/${id}`);
      get().fetchUsers();
    } catch (err) {
      console.error('Error deleting user', err);
    }
  },
}));
