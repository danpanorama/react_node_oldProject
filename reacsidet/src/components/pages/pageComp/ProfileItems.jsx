import react,{useState} from "react"
import "../../../css/profile.css"
import {useDispatch,useSelector} from "react-redux";
import axiosInstance from "../../../config/axios"
import * as actionTypes from "../../../store/Actions";
import Update from "./UpdateItems"


function ProfileItems(props) {
    const items =  useSelector((state)=>state.item.items);
    const users =  useSelector((state)=>state.users);
    let token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const [massageState,setMassageState] = useState("");


    
function delet(e){
    console.log(e.persist()) 
    axiosInstance
    .post("/store/delete/"+ e.target.id,
    {isStore:users,
        token:token})
    .then((res) => {
      if(res.data.err){
        // localStorage.setItem("token",undefined)
        // dispatch({type:actionTypes.LOGGOUT});
        // dispatch({type:actionTypes.DONE});
        // setMassageState("")
        return
      }else{
        dispatch({type:actionTypes.DELETE, 
          id:e.target.id,isStore:users.isStore});
          setMassageState("deleted secssecfuly");
          stateRemove()
          console.log("res from deleted",res);
      }
    })
    .catch((err) => { return});
  }
  
function stateRemove(){
  setTimeout(()=>{
    setMassageState("");
  },1000)
}



    console.log(items)
    
return (
<div className="ProfileItems">
 
  <h1 className="profHeader">yours item</h1>
  <div className="card op0">
    <h3>img</h3>
    <h3>name</h3>
    <h3>price</h3>
    <h3>topic</h3>
    <h3>delete</h3>
    
    </div>
    {items.map((ele,inx)=>{
        return(
    <div className="card" key={inx}>

      {ele.imgname?
    <img src={ele.imgname} className="img" alt=""/>  
    :<p>no img</p>}



     <p>{ele.itemName}</p>
     <p>{ele.itemPrice}</p>
     <p>{ele.itemTopic}</p>

    <div>
        
        <button id={ele._id} onClick={delet} >delet</button>
    </div>
    <div className="flexcol">
      {users.isStore?
      <Update data={ele}/>
    :<p></p>}
    </div>
    
    </div>)
    })}
    <h3 className="red">{massageState}</h3>
</div>
);
}

export default ProfileItems;
