import { create } from 'zustand';

interface User {
    id: string;
    email: string;
}

interface AuthState {
    user: User | null;
    setUser: (user: User | null) => void;
    isLoading: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
    user: null,
    setUser: (user) => set({ user }),
    isLoading: true,
}));
