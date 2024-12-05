//import AsyncStorage from '@react-native-async-storage/async-storage';
import { MMKV } from 'react-native-mmkv'
import {errorHandler} from './ExceptionHandler';

export const MMKVStorage = new MMKV();

export const Storage = {
  setAsyncItem: (key, obj) => {
    try {
      MMKVStorage.set(key, JSON.stringify(obj));
    } catch (error) {
      errorHandler(error, false);
    }
  },
  getAsyncItem: key => {
    try {
      const obj = MMKVStorage.getString(key);
      return obj !== undefined ? JSON.parse(obj) : null;
    } catch (error) {
      errorHandler(error, false);
    }
  },
  clearAsyncItem: key => {
    try {
      MMKVStorage.delete(key);
    } catch (error) {
      errorHandler(error, false);
    }
  },
  clearAppData: () => {
    try {
      MMKVStorage.clearAll();
    } catch (error) {
      errorHandler(error, false);
    }
  }
};
