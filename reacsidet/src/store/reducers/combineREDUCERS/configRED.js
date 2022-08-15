import {  combineReducers } from "redux";
import UserInfoReducer from "../usersRED";
import UseritemReducer from "../itemRED";




const rootReducer = combineReducers({
    users: UserInfoReducer,
    item:UseritemReducer
   
  });


  export default rootReducer;