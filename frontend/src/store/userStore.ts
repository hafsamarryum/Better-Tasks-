import { create } from 'zustand';
import { UserRole } from '../utilities/enum'
import axiosInstance from '../api/axios';
import axios from 'axios';
import { useAuthStore } from './authStore'; 
import { changeUserRole, updateUser } from '../api/endpoints/user';

type Role = UserRole.ADMIN | UserRole.MEMBER;

interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  isActive: boolean;
}

interface UserStore {
  users: User[];
  fetchUsers: () => Promise<void>;
  toggleUserRole: (id: string, newRole: Role) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  updateUserDetails: (id: string, updatedData: { name?: string; email?: string; password?: string }) => Promise<void>; 
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
    const { user, logout } = useAuthStore.getState();
    try {
      const res = await axiosInstance.patch(`/api/users/${id}/deactivate`);
      alert(res.data.msg);
      if (user?.id === id) {
        logout();
        return;
      }
      set((state) => ({
        users: state.users.filter((user) =>
           user.id !== id ),
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

  updateUserDetails: async (id, updatedData) => {
    try {
      await updateUser(id, updatedData);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, ...updatedData } : user
        ),
      }));
    } catch (err) {
      console.error('Error updating user details', err);
      throw err;
    }
  },
}));
