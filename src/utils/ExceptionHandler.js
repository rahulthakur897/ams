import {Alert} from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";

export const errorHandler = (err, isFatal) => {
  if(err.message === "Network Error"){
    Alert.alert(
      'No Internet Connection',
      `
      It looks like you’re not connected to the internet. Please check your Wi-Fi or mobile data settings and try again.
      `,
      [{
      text: 'Close'
      }]
    );
  } else if(err && err.name){
    Alert.alert(
      'Ok',
      `
      ${(isFatal) ? 'Fatal: ' : ''} ${err.name} ${err.message}\n
      We have reported this to our team ! Please close the app and start again!
      `,
      [{
      text: 'Close'
      }]
    );
  }
};

setJSExceptionHandler(errorHandler, true);

setNativeExceptionHandler((errorString) => {
  console.log('setNativeExceptionHandler', errorString);
});