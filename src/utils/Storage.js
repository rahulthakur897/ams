import AsyncStorage from '@react-native-async-storage/async-storage';
import {errorHandler} from './ExceptionHandler';

export const Storage = {
  setAsyncItem: async (key, obj) => {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(obj));
    } catch (error) {
      errorHandler(error, false);
    }
  },
  getAsyncItem: async key => {
    try {
      const obj = await AsyncStorage.getItem(key);
      return obj !== null ? JSON.parse(obj) : null;
    } catch (error) {
      errorHandler(error, false);
    }
  },
  clearAsyncItem: async key => {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      errorHandler(error, false);
    }
  },
  clearAppData: async (isDelAcc) => {
    try {
      let keys = await AsyncStorage.getAllKeys();
      // if(!isDelAcc){
      //   const exludeKeys = [];
      //   keys = keys.filter(item => !exludeKeys.includes(item));
      // }
      await AsyncStorage.multiRemove(keys);
    } catch (error) {
      errorHandler(error, false);
    }
  }
};
