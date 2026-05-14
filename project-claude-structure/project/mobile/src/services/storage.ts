/**
 * Web-compatible storage wrapper.
 * Uses localStorage on web, SecureStore on native.
 */
import * as SecureStore from 'expo-secure-store';

const IS_WEB = typeof window !== 'undefined';

async function getItemAsync(key: string): Promise<string | null> {
  if (IS_WEB) {
    return localStorage.getItem(key);
  }
  return SecureStore.getItemAsync(key);
}

async function setItemAsync(key: string, value: string): Promise<void> {
  if (IS_WEB) {
    localStorage.setItem(key, value);
    return;
  }
  return SecureStore.setItemAsync(key, value);
}

async function deleteItemAsync(key: string): Promise<void> {
  if (IS_WEB) {
    localStorage.removeItem(key);
    return;
  }
  return SecureStore.deleteItemAsync(key);
}

export const storage = { getItemAsync, setItemAsync, deleteItemAsync };