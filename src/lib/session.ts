import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';
import type { Tokens, User } from '@/types/api';

const SESSION_KEY = 'purple-squad-session-v1';
const ONBOARDING_KEY = 'purple-squad-onboarding-v1';
export type StoredSession = { tokens: Tokens; user: User };

async function read(key: string) {
  if (Platform.OS === 'web') return globalThis.localStorage?.getItem(key) ?? null;
  return SecureStore.getItemAsync(key);
}
async function write(key: string, value: string) {
  if (Platform.OS === 'web') { globalThis.localStorage?.setItem(key, value); return; }
  await SecureStore.setItemAsync(key, value, { keychainAccessible: SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY });
}
async function remove(key: string) {
  if (Platform.OS === 'web') { globalThis.localStorage?.removeItem(key); return; }
  await SecureStore.deleteItemAsync(key);
}
export const sessionStorage = {
  async get(): Promise<StoredSession | null> { const raw = await read(SESSION_KEY); if (!raw) return null; try { return JSON.parse(raw) as StoredSession; } catch { await remove(SESSION_KEY); return null; } },
  set: (session: StoredSession) => write(SESSION_KEY, JSON.stringify(session)), clear: () => remove(SESSION_KEY),
};
export const onboardingStorage = { get: async () => (await read(ONBOARDING_KEY)) === 'done', complete: () => write(ONBOARDING_KEY, 'done') };
