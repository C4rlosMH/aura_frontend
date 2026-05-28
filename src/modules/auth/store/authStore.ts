import { create } from 'zustand';

interface User {
  id: number;
  nombre: string;
  email: string;
  role: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  setLogin: (token: string, user: User, rememberMe: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  // Al arrancar, revisa tanto localStorage como sessionStorage por si ya hay sesión
  token: localStorage.getItem('aura_token') || sessionStorage.getItem('aura_token'),
  user: JSON.parse(localStorage.getItem('aura_user') || sessionStorage.getItem('aura_user') || 'null'),
  isAuthenticated: !!(localStorage.getItem('aura_token') || sessionStorage.getItem('aura_token')),

  setLogin: (token, user, rememberMe) => {
    // Si marcó recordarme usa localStorage, si no, sessionStorage
    const storage = rememberMe ? localStorage : sessionStorage;
    
    storage.setItem('aura_token', token);
    storage.setItem('aura_user', JSON.stringify(user));

    set({ token, user, isAuthenticated: true });
  },

  logout: () => {
    localStorage.removeItem('aura_token');
    localStorage.removeItem('aura_user');
    sessionStorage.removeItem('aura_token');
    sessionStorage.removeItem('aura_user');
    set({ token: null, user: null, isAuthenticated: false });
  }
}));