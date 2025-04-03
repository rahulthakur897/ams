import axios from 'axios';
import { BASEURL } from '../constants';
import { Storage } from './Storage';
import { errorHandler } from './ExceptionHandler';
import moment from 'moment';
const _ = require("lodash");
const axiosApiInstance = axios.create();

// Request interceptor for API calls
axiosApiInstance.interceptors.request.use(async (config) => {
  let userDetail = Storage.getAsyncItem('userData');
  if(_.size(userDetail)) {
    const now = moment.unix(moment());
    const then = userDetail.LoginTime;
    const diffInHours = now.diff(then, 'hours');
    if(diffInHours >= 12){
      const access_token = await refreshAccessToken();
      config.headers.Authorization = `Bearer ${access_token}`;
    }
  }
  return config;
});

/***
// Response interceptor for API calls
axiosApiInstance.interceptors.response.use((response) => {
  //console.log("axiosInterceptor response", response);
  return response
}, async function (error) {
  //console.log('in error block', JSON.stringify(error));
  if(error.status !== 401){
    return Promise.reject(error);
  }
  axiosApiInstance.interceptors.response.eject(axiosInterceptor);
  try {
    delete axiosApiInstance.defaults.headers.Authorization;
    const access_token = await refreshAccessToken();
    //console.log("access_token", access_token);
    let originalRequest = error?.config;
    originalRequest.headers.Authorization = axiosApiInstance.defaults.headers.Authorization = `Bearer ${access_token}`;
    //console.log('originalRequest ->', originalRequest);
    return axiosApiInstance(originalRequest);
  } catch(err) {
    return Promise.reject(error);
  }
});
***/

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
    //console.log('makeApiCall response', response);
    if(_.size(response)>0){
      if(response.status === 200){
        return response.data;
      } else {
        return {status: false, message: "Some server error occured"};
      }
    }
  }catch(err){
    //console.log('makeApiCall catch', JSON.stringify(err));
    if(err.status === 400){
      return {status: false, message: "Incorrect Username or Password"}
    }
    errorHandler(err, false);
  }
}