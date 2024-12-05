import { Storage } from "./Storage";
const _ = require("lodash");

export const IsLoggedIn = () => {
   const userData = Storage.getAsyncItem("userData");
   if(_.size(userData)){
    return true;
   } else {
    return false;
   }
}
