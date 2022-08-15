import react,{ useEffect ,useState} from "react"
import ProfileComp from "./pageComp/ProfileComp"
import {useDispatch,useSelector} from "react-redux";
import ConfigAxios from "../../config/axios"
import * as actionTypes from "../../store/Actions";

function Profile() {
    const dispatch = useDispatch();
    const userAllInfo =  useSelector((state)=>state.users);
   

    let token = localStorage.getItem("token");
    const [stateData,setStateData] = useState({data:[]})
    const [ErorState,setErrorState] = useState("")


  //   useEffect(()=>{
  //     if(userAllInfo.userInfo&&userAllInfo.userInfo.name ){
  //      getProducts()
  //       }
  //   },[]) 


  // async function getProducts(){
  //   try{
  //     if(userAllInfo.userInfo.name && token != undefined){
  //       await  ConfigAxios.get("/profile",
  //       {params:
  //         {name:userAllInfo.userInfo.name,
  //           number:userAllInfo.userInfo.number,
  //            isStore:userAllInfo.isStore,token:token}} )
  //         .then((res) => {
  //           if(res.data.err){
  //             setErrorState(res.data.err)
  //           }

  //         console.log(res.data.items)
  //         dispatch({type:actionTypes.DEFAULTVAL,data:res.data.items});
  //         setStateData(res.data.items);
  //       }); 
  //     }
  //   }catch(e){
  //     console.log(e);
  //   }
  // }
  
 






  return (
    <div className="About">
     
     <ProfileComp userInfo={userAllInfo.userInfo} err={ErorState}  />
     <h1>Profile</h1>
    </div>
  );
}

export default Profile;
