import Toast from "react-native-simple-toast";

export const Common = {
   isHTML: (str) => /<[a-z][\s\S]*>/i.test(str)
}

export const transformBillerData = (data) => {
   const output = [];
   data.forEach(biller => {
      output.push({
         label: biller.DealerName,
         value: biller.DealerID,
      });
   });
   return output;
}

export const showToast = (msg) => Toast.show(msg);