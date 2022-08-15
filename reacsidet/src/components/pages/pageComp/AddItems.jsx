import React, { useState } from "react";
import {useFormik, Form, Field, ErrorMessage} from "formik"
import { Redirect } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import * as actionTypes from "../../../store/Actions";
import AddItem from "../pageComp/AddItems"
import axiosConfig from "../../../config/axios"
import "../../../css/profile.css"

function AditItem(props) {
  const [errorState, seterrorState] = useState("");
  let token = localStorage.getItem("token")
  const dispatch = useDispatch();


const aditNewItem = useFormik({
initialValues:{ 
itemName: "",
itemDiscription: "",
itemPrice: "",
itemTopic: "",
StoreName: props.data.name,
StoreNumber:props.data.number,
idcart: props.data.isStore,
imgname:""
},onSubmit:async values  => {
try{
let requast = await
axiosConfig
.post("/store/setitems",{ 
values: 
values})
.then((res) => {
    if(res.data.err){
    seterrorState(res.data.err)
    return
    }
        aditNewItem.values._id = res.data.id;
        aditNewItem.values.salID = res.data.salID
    if(aditNewItem.values._id){
      console.log(res)
       dispatch({type:actionTypes.ADD,data:aditNewItem.values})
      seterrorState("done")
      stateRemove()

    }
 
})
.catch((err) => {
console.log(err)
return seterrorState(err);
});
}catch(e){
console.log(e)
return seterrorState(e);
}
}});

function stateRemove(){
  setTimeout(()=>{
    seterrorState("");
  },1000)
}

  
  return (
    <div className="addform">
      <h2>add item</h2>
<form action="" encType="multipart/form-data" onSubmit={aditNewItem.handleSubmit}>
<div className="flexRow">
  <input
type="text"
name="itemName"
placeholder="item name"
required
onChange={aditNewItem.handleChange}
value={aditNewItem.values.itemName}
/>

<input type="text" placeholder="about the item"  name="itemDiscription" value={aditNewItem.values.itemDiscription}  onChange={aditNewItem.handleChange} />


</div>

<select name="itemTopic"   onChange={aditNewItem.handleChange} value={aditNewItem.values.itemTopic} >
<option value="games">games</option>
<option value="kids">kids</option>
<option value="kintchen">kintchen</option>
<option value="music">music</option>
<option value="sport">sport</option>
<option value="toyz">toyz</option>
</select><div className="flexRow">
<input type="number" placeholder="price $" required name="itemPrice"   value={aditNewItem.values.itemPrice}  onChange={aditNewItem.handleChange} />

<input type="text" placeholder="image url" name="imgname"value={aditNewItem.values.imgname}  onChange={aditNewItem.handleChange}   />
</div>
<button  >adit</button>
</form>
   
      {errorState}
    
    </div>
  );
}

export default AditItem;
