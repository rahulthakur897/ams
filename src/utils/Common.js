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

const getImageBase64 = async (imageUri, photoQuality) => {
   const resizedImageUri = await ImageResizer.createResizedImage(
      imageUri,
      400, // Width
      350, // Height
      'JPEG',
      photoQuality, // Quality percentage
      0 // No rotation
    );

    // Step 3: Convert to Base64
    const base64String = await RNFS.readFile(resizedImageUri.uri, 'base64');
    return base64String;
}

const getBase64Size = (base64String) => {
   const padding = (base64String.charAt(base64String.length - 2) === '=') ? 2 : (base64String.charAt(base64String.length - 1) === '=') ? 1 : 0; 
   const length = base64String.length - (base64String.indexOf(',') + 1); // Remove metadata  
   const fileSizeInBytes = (length * 3 / 4) - padding;  
   const fileSizeInKiloBytes = fileSizeInBytes/1000; // calculate size in kilo bytes
   return fileSizeInKiloBytes; // return size, ensuring it's not negative  
}

export const resizeImageAndConvertInBase64 = async (imageUri) => {
   const base64String = await getImageBase64(imageUri, 100);
   const base64Size = getBase64Size(`data:image/jpeg;base64,${base64String}`);
   if(parseInt(base64Size, 10) <= 31){
      return base64String;
   } else {
      const base64String = await getImageBase64(imageUri, 70);
      return base64String;
   }
}
