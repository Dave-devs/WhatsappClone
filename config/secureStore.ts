import * as SecureStore from 'expo-secure-store';
export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>;
  saveToken: (key: string, token: string) => Promise<void>;
  clearToken?: (key: string) => void;
}

export const getToken = async (key: string) => {
    try {
      const item = await SecureStore.getItemAsync(key);
      return item;
    } catch (error) {
      console.error("SecureStore get item error: ", error);
      await SecureStore.deleteItemAsync(key);
      return null;
    }
};

export const saveToken = async (key: string, token: string) => {
    try {
      await SecureStore.setItemAsync(key, token);
    } catch (error) {
      console.error("SecureStore set item error: ", error);
    }
}