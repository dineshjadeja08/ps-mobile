import { create } from 'zustand';
import { api } from '@/lib/api';
import { signOutFirebase } from '@/lib/firebase-phone-auth';
import { sessionStorage, type StoredSession } from '@/lib/session';
import type { AuthResponse, ProfileUpdate, User } from '@/types/api';

type AuthState = { ready: boolean; user: User | null; restore: () => Promise<void>; acceptLogin: (response: AuthResponse) => Promise<void>; updateProfile: (values: ProfileUpdate) => Promise<User>; logout: () => Promise<void> };
export const useAuth = create<AuthState>((set) => ({
  ready: false, user: null,
  restore: async () => { const session = await sessionStorage.get(); if (!session) { set({ ready: true, user: null }); return; } try { const user = await api.auth.me(); await sessionStorage.set({ ...session, user }); set({ ready: true, user }); } catch { await sessionStorage.clear(); set({ ready: true, user: null }); } },
  acceptLogin: async (response) => { const session: StoredSession = { tokens: response.tokens, user: response.user }; await sessionStorage.set(session); set({ ready: true, user: response.user }); },
  updateProfile: async (values) => { const user = await api.auth.updateMe(values); const session = await sessionStorage.get(); if (session) await sessionStorage.set({ ...session, user }); set({ user }); return user; },
  logout: async () => { const session = await sessionStorage.get(); try { if (session?.tokens.refresh) await api.auth.logout(session.tokens.refresh); } finally { await Promise.allSettled([sessionStorage.clear(), signOutFirebase()]); set({ user: null }); } },
}));
