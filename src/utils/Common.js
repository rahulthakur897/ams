import Toast from "react-native-simple-toast";
import ImageResizer from '@bam.tech/react-native-image-resizer';
import moment from "moment";
const RNFS = require('react-native-fs');

export const Common = {
   isHTML: (str) => /<[a-z][\s\S]*>/i.test(str)
}

export const transformDealerData = (data) => {
   const output = [];
   data.forEach(dealer => {
      output.push({
         label: dealer.DealerName,
         value: dealer.DealerID,
      });
   });
   return output;
}

export const transformTaskListData = (data) => {
   const output = [];
   data.forEach(task => {
      output.push({
         label: task.TaskName,
         value: task.AirtelTaskID,
         ...task,
      });
   });
   return output;
}

export const showToast = (msg) => Toast.show(msg);

export const validateAttendanceTiming = () => {
   const startTimeHr = 8;
   const startTimeMin = 0
   const endTimeHr = 19;
   const endTimeMin = 59
   const currentTime = moment().format('H:m');
   const currentTimeHr = currentTime.split(':')[0];
   const currentTimeMin = currentTime.split(':')[1];
   const inTimeCheck = currentTimeHr >= startTimeHr && currentTimeMin >= startTimeMin;
   const outTimeCheck = currentTimeHr <= endTimeHr && currentTimeMin <= endTimeMin;
   if(!inTimeCheck || !outTimeCheck){
      return false;
   }
   return true;
}

export const resizeImageAndConvertInBase64 = async (imageUri) => {
   const resizedImageUri = await ImageResizer.createResizedImage(
      imageUri,
      400, // Width
      350, // Height
      'JPEG',
      70, // Quality percentage
      0 // No rotation
    );

    // Step 3: Convert to Base64
    const base64String = await RNFS.readFile(resizedImageUri.uri, 'base64');
    return base64String;
}
