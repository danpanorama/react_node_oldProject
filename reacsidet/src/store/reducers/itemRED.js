import * as actionTypes from "../Actions";

const initialState = {
    items:[],
    sumItems: 0,
    err:"",
    };

const reducer = (state = initialState, action) => {

  switch (action.type) {
    
    case actionTypes.ADD:
        const newState = {...state}; 
        newState.items = [...newState.items]
        newState.items.push(action.data);
        newState.sumItems = newState.items.length;
        return newState


        case actionTypes.DELETE:
          console.log("whant to deleleelellelele")
          const newdeletState = {...state};
          const y2 =newdeletState.items.filter((ele)=>{
          return ele._id != action.id; 
          })
          console.log("de;eted")
          newdeletState.items = y2;
          newdeletState.sumItems = newdeletState.items.length;
          return newdeletState 

     


          case actionTypes.UPDATE:
            const udate = {...state}; 
            for(let i = 0; i < udate.items.length; i++){
              if(udate.items[i]._id==action.data._id){
                udate.items[i]=action.data;
                 console.log(udate.items[i])
                //  udate.items[i].push(action.data);
                //  console.log(udate.items[i]) 
                 return udate
              } 
            }
   
     case actionTypes.DEFAULTVAL:
      const StateD = {...state}; 
      if(action.data == undefined || action.data == 'undefined'){
        return StateD
      }
       
        StateD.items = action.data
        StateD.sumItems=StateD.items.length;
        return StateD


        case actionTypes.DONE:
          const done = {...state}; 
          done.items = []
          done.sumItems=done.items.length;
          return done

        

    default:
      break;
  }
  return state;
};

export default reducer;
