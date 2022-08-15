import * as actionTypes from "../Actions";
import axios from "axios";


const initialState = {
  userInfo: {},
  isStore:false,
  view:"",
  isLogg:false,
  error:""
};

const reducer = (state = initialState, action) => {

  switch (action.type) {
    
    case actionTypes.REQUAST:
      console.log(action.data)
      action.data.userInfo.password = "123";
      const newState = { ...state.data };
      newState.userInfo = action.data.userInfo;
      newState.isLogg = !newState.isLogg;
      newState.view = action.data.userInfo.view;
     if(action.data.userInfo.isStore == 1){
       newState.isStore = true;
       }else{
       newState.isStore=false;
       }
       if(action.data.remember == true){
         console.log("remember me  is true")
         localStorage.setItem("userData",JSON.stringify(action.data.userInfo));
       }else{
        console.log("remember me  is false")
        localStorage.setItem("userData",JSON.stringify(action.data.userInfo));
        // setTimeout(()=>{
        //   localStorage.setItem("userData",undefined);
        // },5000)
       }
       localStorage.setItem("token",action.data.token)
       return newState;



        case actionTypes.STILL_CONNECT:
        const stillState = { ...state.data };
        let token = localStorage.getItem("token")
        let userData = localStorage.getItem("userData");
        console.log(userData)
        let a =JSON.parse(userData)
        console.log()
        if( a && userData != "undefined"||userData != undefined || userData.length >0 && token   ){
        stillState.view = a.view;
        stillState.userInfo = a
        stillState.isLogg = true;
          if( stillState.userInfo.isStore == 1){
            stillState.isStore = true;
            }else{
            stillState.isStore=false;
            }
          }
      
          
          return stillState;






          case actionTypes.CHANGVIEW:
          const viewState={...state};
          if(viewState.view == "D"){
             viewState.view = "L"; 
             viewState.userInfo.view = 'L'
             localStorage.setItem("view","L") 
          }else if(viewState.view == "L"){
             viewState.view = "D";
             viewState.userInfo.view = 'D'
             localStorage.setItem("view","L") 
          }else{
             viewState.view = "D";
             viewState.userInfo.view = 'D'
          }
          console.log()
          
          if(viewState.isLogg){
          let u =localStorage.getItem("userData") 
          let y = JSON.parse(u)
          y.view = viewState.view
          localStorage.setItem('userData',JSON.stringify(y))

          }

          

           localStorage.setItem("view",viewState.view) 

          if(viewState.isLogg == true && viewState.userInfo.number){ 
           const token= localStorage.getItem("token")
           axios
              .post("http://localhost:5001/darklite", 
             {view:viewState.view, 
              number: viewState.userInfo.number,
              token:token,
              isStore:viewState.isStore}
               ).then((res) => {
                 console.log(res)
                  console.log("darklight")
                 }).catch((err) => {
                  console.log(err)
                 });
                 
                    }

          return viewState;













      case actionTypes.ERROR_REQUAST:
        console.log(action.data.err);
        break;

        case actionTypes.LOGGOUT:
          const dropState={...state.data};
          dropState.isLogg=false;
          dropState.isStore=false;
          dropState.token=""
          localStorage.setItem("userData",undefined);
          localStorage.setItem("token","");
          console.log(dropState)

          return dropState
    default:
      break;
  }
  return state;
};

export default reducer;
