import React, { useState } from "react";
import {useFormik, Form, Field, ErrorMessage} from "formik"
import { Redirect } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import * as actionTypes from "../../../store/Actions";
import axios from "../../../config/axios";






function UpdateItem(props) {
  
const [errState,setErrState] = useState("");
let token = localStorage.getItem("token")  
const dispatch = useDispatch();


  const updateItems = useFormik({
    initialValues:{ 
        itemID:props.data._id,
        itemName: props.data.itemName,
        itemDiscription: props.data.itemDiscription,
        itemPrice: props.data.itemPrice,
        itemTopic: props.data.itemTopic,
        imgname:props.data.imgname,
        StoreName: props.data.StoreName,
        StoreNumber: props.data.StoreNumber,
        sold: props.data.sold,
        sum: props.data.sum,
        unsold: props.data.unsold,
        userLikes: props.data.userLikes,
        userUnlike: props.data.userUnlike,
        _id: props.data._id
  },onSubmit:async values  => {
    try{
        
      let requast = await
      axios
      .post("/store/update",{ values: values,token:token})
      .then((res) => {
        if(res.data.err){
          if(res.data.notoken){
            setErrState(res.data.notoken)
            return
          }
          console.log(res.data.err)
          return
        }
        console.log(updateItems.values)
        dispatch({type:actionTypes.UPDATE, data:updateItems.values});
      }) 
      .catch((err) => {
      console.log(err)
      });
    }catch(e){
    console.log(e);
    }
  }});



 return ( 
   <div>
     <p>update</p>
 <form action="" className="flexcol" onSubmit={updateItems.handleSubmit} >
 <input type="hidden" name="itemID"
        required  
        onChange={updateItems.handleChange} 
        value={updateItems.values.itemID}/>

 <input type="text" name="itemName"
        required  
        onChange={updateItems.handleChange} 
        value={updateItems.values.itemName}/>
        

 <input type="text"  name="itemDiscription"
        required  
        onChange={updateItems.handleChange} 
        value={updateItems.values.itemDiscription}/>

 <select name="itemTopic" required  
        onChange={updateItems.handleChange} 
        value={updateItems.values.itemTopic}  >
     <option value="games">games</option>
     <option value="kids">kids</option>
     <option value="kintchen">kintchen</option>
     <option value="music">music</option>
     <option value="sport">sport</option>
     <option value="toyz">toyz</option>
   </select>

 <input type="number" name="itemPrice"
        required  
        onChange={updateItems.handleChange} 
        value={updateItems.values.itemPrice}/>

 <input type="text"  
        name="imgname"
          
        onChange={updateItems.handleChange} 
        value={updateItems.values.imgname}/>
        <button type="submit">update</button>
</form>
</div>
  );
}

export default UpdateItem;








