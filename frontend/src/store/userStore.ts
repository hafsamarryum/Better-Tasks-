import axios from 'axios';
import { create } from 'zustand';

type Role = 'ADMIN' | 'MEMBER';

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
      const res = await axios.get('/users');
      set({ users: res.data });
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
