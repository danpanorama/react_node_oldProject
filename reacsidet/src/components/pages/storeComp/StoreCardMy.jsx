import React from 'react';

import xaioRequast from "../../../config/axios";
import {useSelector} from "react-redux"; 
import { Redirect,Link } from "react-router-dom";
import { useState } from 'react';
import {useDispatch} from "react-redux";
import axios from "../../../config/axios"
import * as actionTypes from "../../../store/Actions";
import { useEffect } from 'react';
import "../../../css/store.css"






export default function RecipeReviewCard(props) {

const dispatch = useDispatch();
const [errorState,setErrorState]=  useState("");
const [goLogg,setgoLoggState]=  useState(false);
const [getidState,setIDState]= useState("");
var token =localStorage.getItem("token");
const userinfo = useSelector((state)=>state.users);
const Add = useSelector((state)=>state.item);



if(props.data.length>0){
setMyItems()
}
  

function setMyItems(a){
for(let i = 0; i < props.data.length; i++){
  for(let j = 0 ; j < Add.items.length; j++){
    if(props.data[i]._id == Add.items[j]._id){
      console.log(props.data[i]._id,"::::",Add.items[j])
        props.data[i].isMY = true;  
        }else{
          continue;
        }
}
}
}

// if(props.data.length > 0){
//    setMyItems()
// }



function addFunc(e){
console.log(e.persist())
  axios
  .post("/store/edit/"+ e.target.id, 
  {name:userinfo.userInfo.name,
  number:userinfo.userInfo.number,
  token:token
    })
  .then((res) => {
    if(res.data.notoken){
      localStorage.setItem("token",undefined)
    //   dispatch({type:actionTypes.LOGGOUT});
      setgoLoggState(true);
    }else{
      console.log(res.data.data);
        dispatch({type:actionTypes.ADD,
        data:res.data.data})
        props.rand("dan")
    }  
  })
  .catch((err) => { return "error you cent adit"+err}); 
}






function setMyItems(){
  for(let i = 0; i < props.data.length; i++){
    for(let j = 0 ; j < Add.items.length; j++){
      if(props.data[i]._id == Add.items[j].ID){
          props.data[i].isMY = true;    
    }else{
      continue
    }
  }
  }
  }


if(goLogg){
  return <Redirect to={{pathname:"/login"}}/>
}

return (
<div>
    <div className="gridror">
  {props.data.map((val, inx) => {
    { if(val.imgname) {  
      { var img = val.imgname} 
    }else{
              {var img = "..."}
      }}
      return(
    <div className="maxwidth" key={val._id}>




<div className="card">
    <div className="image">

  <img src={img} className="images" alt=""/>

    </div>
    <div className="sectionaboutthecard">  
     <div className="name">
            
        </div>
        <div className="price">

        </div>
        <div className="discript">

        </div>

        <div className="bayadd">
            <div className="baynow">
                                                    {userinfo.isLogg
                                    &&
                                    val.StoreNumber == userinfo.userInfo.number
                                    && 
                                    val.StoreNumber ==userinfo.userInfo.number?
                                    <span>"your item"</span> : 

                                    <Link  to={{
                                        pathname: "/itemselected",
                                        state: {data:val }
                                    }}>bay now</Link>
                                    }
            </div>
           

          <div className="addmy">
                                                                                        {val.isMY == true ? 
                                                                                <div>
                                                                                {token != undefined || token !="undefined" 
                                                                                &&userinfo.isStore== false?
                                                                                <span id={val._id}   >you get</span>
                                                                                : <div><span></span></div>}  
                                                                                </div>
                                                                                
                                                                                    :  <div>

                                                                                    {console.log(token,"::;;;", userinfo.isStore)}
                                                                                    {token == undefined|| token == '' || token =="undefined" 
                                                                                    &&userinfo.isStore == false?
                                                                                <div><span></span></div>
                                                                                    :  <button id={val._id} className={val}onClick={addFunc}>add</button> }  

                                                                                </div>}
          </div>
        </div>
     
    </div>
</div>

      
  

    <div>
      
    </div>
    </div>
  
  )})}
</div>
</div>
);
}
