import React, { useState, useEffect } from "react";
import axiosInstance from "../../config/axios";
import StoreCart from "./storeComp/StoreCard"
import {useSelector} from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import Pagination from '@material-ui/lab/Pagination';
import StoreMy  from './storeComp/StoreCardMy'


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2),
    },
  },
}));


function Store() {

  const [state, setState] = useState({ data: [] });
  const [lengthState, setLength] = useState(0);
  const [rander, setRander] = useState("");
  const [quary, setQuary] = useState("");
  const [lodingState , setLodingState] = useState(false);
  const [optiansState,setOptionsState] = useState("");
  const [autoCompletStatr,setautoCompletStatr] = useState("");
  const userinfo = useSelector((state)=>state.users);


  useEffect(async() => {
    setLodingState(true);
        try{
        await axiosInstance.get("/store").then(async(res) => {
        try{
        console.log(res.allData,":::alldata::::")
        setState(res.data);
        setLodingState(false);
        }catch(e){
        console.log(e);
        }

        });
        axiosInstance.get("/store/getlength").then((res) => {
          setLength(parseInt(res.data.data))
        });
        }catch(e){
        console.log(e);
        }
  }, []);




 


  function callBack (data){
    setState(data)
  }



  function testPag(e){
    console.log(e.target)
    axiosInstance.get("/store",{params:{page:e.target.innerText}}).then((res) => {
     setState(res.data)
    }).catch((e)=>{console.log(e)});
  }
  function getTxt(e) {
    var txt
    setautoCompletStatr(e.target.value)
    state.data.filter((ele)=>{
     if(ele.itemName.match(e.target.value)){
     txt += ele.itemName + "\n";
      setOptionsState(txt );
    }
     })
  }

function cleanTXT(e){
  setOptionsState("");
  e.target.value = ""
}

const classes = useStyles();

  
  return (
    <div className={userinfo.view =="D" ? "dark" : "white"}>
      <div className="openingstore">
        
      </div>
      <div className="bg-image">

      </div>
      <div className="min-h ">
        <div className="centerit">

        
       <h1>store</h1>
       <div>
           <input type="text" className="input" onBlur={cleanTXT} onChange={getTxt} />
       <button  >search</button><br/>
       </div>
     
       <div className="flexCol">
         
       {optiansState.split("undefined").map((ele)=>{
         return(<div key={ele}><span>{ele}</span></div>) 
       })}
       </div> 
       </div>
       <div className="flexCenter">
       {lodingState ?
      <span>loding...</span>:
      // <StoreMy data={state.data.filter(ele=>ele.itemName.match(autoCompletStatr))} callBack={callBack} rand={setRander}   />

      <StoreCart data={state.data.filter(ele=>ele.itemName.match(autoCompletStatr))} callBack={callBack} rand={setRander}   />
       }
  
  <div className={userinfo.view =="D" ? "lightBord" : "blackBord"}>
  <div className="whites">
    
  <Pagination count={Math.floor(lengthState  /6) } onClick={testPag} variant="outlined" color="primary" />
  </div>
  </div>
  <div>
  </div>
  </div>
  </div>
  </div>
  );
}

export default Store;
