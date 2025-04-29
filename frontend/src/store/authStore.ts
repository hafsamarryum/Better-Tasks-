import { create } from "zustand";
import { UserRole } from "../utilities/enum";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole.ADMIN | UserRole.MEMBER;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
  setLoading: (state: boolean) => void;
}

export const useAuthStore = create<AuthState>()(persist(
  (set) => ({
    user: null,
    token: null,
    loading: false,
  
    setUser: (user, token) => {
      set({ user, token, loading: false });
    },

    logout: () => {
      set({ user: null, token: null, loading: false });
    },

    setLoading: (state) => set({ loading: state }),
  }),
  {
    name: "auth-storage",
    partialize: (state) => ({ user: state.user, token: state.token }),
  }
  )
);

