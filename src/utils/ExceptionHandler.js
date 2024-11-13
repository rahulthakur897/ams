import {Alert} from 'react-native';
import { setJSExceptionHandler, setNativeExceptionHandler } from "react-native-exception-handler";

export const errorHandler = (err, isFatal) => {
  console.log(JSON.stringify(err));
  if(err && err.name){
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