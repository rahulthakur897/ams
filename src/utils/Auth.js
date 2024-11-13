import { Storage } from "./Storage";
const _ = require("lodash");

export const IsLoggedIn = async () => {
   const userData = await Storage.getAsyncItem("userData");
   if(_.size(userData)){
    return true;
   } else {
    return false;
   }
}
