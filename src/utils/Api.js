import axios from 'axios';
import { BASEURL } from '../constants';
import { Storage } from './Storage';
import { errorHandler } from './ExceptionHandler';
const _ = require("lodash");
const axiosApiInstance = axios.create();
let IsMethodExecuted = false;

// Request interceptor for API calls
// axiosApiInstance.interceptors.request.use(
//   async config => {
//     const value = await redisClient.get(rediskey)
//     const keys = JSON.parse(value)
//     config.headers = { 
//       'Authorization': `Bearer ${keys.access_token}`,
//       'Accept': 'application/json',
//       'Content-Type': 'application/x-www-form-urlencoded'
//     }
//     return config;
//   },
//   error => {
//     Promise.reject(error)
// });

// Response interceptor for API calls
const axiosInterceptor = axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  if(error.status !== 401){
    return Promise.reject(error);
  }
  axiosApiInstance.interceptors.response.eject(axiosInterceptor);
  try {
    delete axiosApiInstance.defaults.headers.Authorization;
    const access_token = await refreshAccessToken();
    let originalRequest = error?.config;
    originalRequest.headers.Authorization = axiosApiInstance.defaults.headers.Authorization = `Bearer ${access_token}`;
    return axiosApiInstance(originalRequest);
  } catch(err) {
    return Promise.reject(error);
  }
});

const refreshAccessToken = async () => {  
  // Implementation for refreshing the token
  const loginCreds = Storage.getAsyncItem('loginCreds');
  const base64Credentials = btoa(`${loginCreds.username}:${loginCreds.password}`);
  const config = {
    method: 'POST',
    url: `${BASEURL}/api/Users/CreateToken`,
    headers: {
      'Authorization': `Basic ${base64Credentials}`,
    },
  };
  const newAxiosInstance = axios.create();
  try {
    const {data} = await newAxiosInstance(config);
    return data?.Data?.Token || "";
  } catch(err) {
    return Promise.reject(err);
  }
}

export const makeApiCall = async (config) => {
  try{
    console.log("url -> ", config.url);
    const response = await axiosApiInstance(config);
    if(_.size(response)>0){
      if(response.status === 200){
        return response.data;
      } else {
        return {status: false, message: "Some server error occured"};
      }
    }
  }catch(err){
    if(err.status === 400){
      return {status: false, message: "Incorrect Username or Password"}
    }
    errorHandler(err, false);
  }
}