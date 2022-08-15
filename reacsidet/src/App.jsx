import React from 'react';
import { useEffect } from "react";
import {useSelector,useDispatch} from "react-redux";
import {  Redirect } from 'react-router-dom';
import * as actionTypes  from "./store/Actions"
import Nav from "./components/controlComp/NavBar"
import './css/App.css';
import ConfigAxios from "./config/axios"

function App() {
  const dispatch = useDispatch();



  let token = localStorage.getItem("token");
  const userAllInfo =  useSelector((state)=>state.users);
 

  useEffect(async()=>{
    await  ConfigAxios.post("/profile/tokencheck",
      {token:token} )
      .then((res) => {
        if(res.data.err){
         console.log("err token not valid")
         
        }else{
          localStorage.setItem('token', token)
                dispatch({type:actionTypes.STILL_CONNECT});
                dispatch({type:actionTypes.DEFAULTVAL,data:res.data.items});
        }
  
    }); 
   
  },[])



  if(userAllInfo.userInfo&&userAllInfo.userInfo.name ){
    getProducts()
     }
  async function getProducts(){
    try{
      if(userAllInfo.userInfo.name && token != undefined){
        await  ConfigAxios.get("/profile",
        {params:
          {name:userAllInfo.userInfo.name, 
            number:userAllInfo.userInfo.number,
             isStore:userAllInfo.isStore,token:token}} )
          .then((res) => {
            if(res.data.err){
              console.log("err app.js")
            }

          dispatch({type:actionTypes.DEFAULTVAL,data:res.data.items});
          
        }); 
      }
    }catch(e){
      console.log(e);
    }
  }

console.log( userAllInfo)

  return (
    <div className={ userAllInfo.view &&userAllInfo.view=='D'? "dark":"light"}>
        <Nav/>
      <Redirect to="/home" />
    </div>
  );
}

export default App;
