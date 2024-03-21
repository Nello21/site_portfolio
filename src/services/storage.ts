export const STORAGE_KEY = {
  USER_DATA: 'user_data',
};

export const getStorageItem = (key: string): any => {
  const item = localStorage.getItem(key);
  if (item) {
    try {
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error parsing localStorage item for key ${key}:`, error);
      return null;
    }
  }
  return null;
};

export const setStorageItem = (key: string, value: any): void => {
  try {
    const serializedValue = JSON.stringify(value);
    localStorage.setItem(key, serializedValue);
  } catch (error) {
    console.error(`Error setting localStorage item for key ${key}:`, error);
  }
};
