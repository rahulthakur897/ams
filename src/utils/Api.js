import axios from 'axios';
import { errorHandler } from './ExceptionHandler';
const _ = require("lodash");

export const makeApiCall = async (config) => {
  try{
    console.log("url -> ", config.url);
    const response = await axios(config);
    if(_.size(response)>0){  
      if(response.status === 200){
        return response.data;
      } else {
        return {status: response.status, message: "Some server error occured"};
      }
    }
  }catch(err){
    errorHandler(err, false);
  }
}