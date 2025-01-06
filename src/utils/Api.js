import axios from 'axios';
import { BASEURL } from '../constants';
import { Storage } from './Storage';
import { errorHandler } from './ExceptionHandler';
const _ = require("lodash");
const axiosApiInstance = axios.create();

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
axiosApiInstance.interceptors.response.use((response) => {
  return response
}, async function (error) {
  let originalRequest = error?.config;
  if (error && error.response && (error.response.status === 403 || error.response.status === 401) && !originalRequest._retry) {
    originalRequest._retry = true;
    const {method, url, headers, data} = originalRequest || {};
    const access_token = await refreshAccessToken();
    let config = {
      method: method,
      url: url,
      headers: {
        ...headers,
        Authorization: `Bearer ${access_token}`,
      },
    };
    if(data){
      config = {...config, data: data};
    }
    return axiosApiInstance(config);
  }
  return Promise.reject(error);
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
  const {data} = await axiosApiInstance.request(config);
  if(_.size(data)){
    return data.Data.Token;
  } 
}

export const makeApiCall = async (config) => {
  try{
    console.log("url -> ", config.url);
    const response = await axiosApiInstance.request(config);
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