import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'MEMBER';
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: true,

  setUser: (user, token) => {
    localStorage.setItem("token", token);
    set({ user, token, loading: false });
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null, loading: false });
  },

  setLoading: (state) => set({ loading: state }),
}));
