import Toast from "react-native-simple-toast";
import moment from "moment";

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
