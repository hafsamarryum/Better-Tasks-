import { create } from 'zustand';
import { UserRole } from '../utilities/enum'
import axiosInstance from '../api/axios';
import axios from 'axios';
import { changeUserRole } from '../api/endpoints/user';

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
  toggleUserRole: (id: string, newRole: Role) => Promise<void>;
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

  toggleUserRole: async (id, newRole) => {
    const user = get().users.find((u) => u.id === id);
    if (!user) {
      console.warn('User not found, likely already deleted');
      return;
    }
    try {
      await changeUserRole(id, newRole);
      const updatedUsers = get().users.map((user) =>
        user.id === id ? { ...user, role: newRole } : user
      );
      set({ users: updatedUsers });
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        if (err.response.status === 403) {
          alert("You do not have permission to update user roles.");
        } else {
          const msg = err.response.data?.msg || "Something went wrong. Please try again.";
          alert(msg);
        }
      } else {
        alert("Network error or server is not responding. Please try again later.");
      }
      console.error("Failed to update user role", err);
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axiosInstance.delete(`/api/users/${id}`);
      alert(res.data.msg);
      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        const msg = err.response.data?.msg || 'Something went wrong. Please try again.';
        alert(msg);
      } else {
        alert('Network error or server is not responding. Please try again later.');
      }
      console.error('Failed to delete user', err);
    }
  },
}));
