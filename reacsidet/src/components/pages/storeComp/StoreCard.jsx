import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import xaioRequast from "../../../config/axios";
import {useSelector} from "react-redux"; 
import { Redirect,Link } from "react-router-dom";
import { useState } from 'react';
import {useDispatch} from "react-redux";
import axios from "../../../config/axios"
import * as actionTypes from "../../../store/Actions";
import { useEffect } from 'react';
import "../../../css/store.css"



const useStyles = makeStyles((theme) => ({
root: {
  maxWidth: 345,
},
media: {
  height: 0,
  paddingTop: '56.25%', // 16:9
},
expand: {
  transform: 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
},
expandOpen: {
  transform: 'rotate(180deg)',
},
avatar: {
  backgroundColor: red[500],
},
}));



export default function RecipeReviewCard(props) {
const classes = useStyles();
const [expanded, setExpanded] = React.useState(false);
const handleExpandClick = () => {
  setExpanded(!expanded);
};



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

if(props.data.length > 0){
   setMyItems()
}



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



// function LikeOne() {
//   if(userinfo.isStore == true){
//   }else{
//     console.log(token);
//   return xaioRequast.post("/likes/"+ getidState ,{ 
//     name:userinfo.userInfo.client_fullName,
//     num:userinfo.userInfo.client_number, 
//     token:token
// })
//   .then((res)=>{
//     if(res.data.err){
//       setgoLoggState(true);
//       // setErrorState(res.data.err)
//     }
//   }).catch((err)=>{
//     console.log("error whle like somthing...",err)
//   })
//   }


// }


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


// function getId(e) {
//   console.log(e.target.id)
//   setIDState(e.target.id)
//   LikeOne()
// }
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

      
  <Card className="cardd" >
    <CardHeader
      avatar={
        <Avatar aria-label="recipe" className={classes.avatar}>
          {val.StoreName}
        </Avatar>
      }
    
      title={val.StoreName}
      subheader={val.date}
    />
    <CardMedia
      className={classes.media}
      image={img}
      title="Paella dish"
    />
    <CardContent>



    <Typography paragraph><span className="boldhard">{val.itemName}</span></Typography>
    <Typography paragraph>
       <span className="deskript">{val.itemDiscription?val.itemDiscription:'no discript'}</span>
        </Typography>     
     
     
      <Typography variant="body2" color="textSecondary" component="p">
    ${val.itemPrice}
      
      </Typography>
    </CardContent>
    <div className="flexcenter">
          {userinfo.isLogg
         &&
         val.StoreNumber == userinfo.userInfo.number
          && 
          val.StoreNumber ==userinfo.userInfo.number?
          <span>"your item"</span> : 


          <Link className="linkbaynow"  to={{
            pathname: "/itemselected",
            state: {data:val }
          }}>bay now</Link>
          }

<br/>

<div>
{val.isMY == true &&userinfo.isLogg == true? 
<div>

{token != undefined || token !="undefined" 
&&userinfo.isStore== false ?
<span id={val._id}>its yours</span>
  : <div><span></span></div>}  
</div>
  
    :  <div>

     
    {token == undefined|| token == '' || token =="undefined" 
    ||userinfo.isStore == true?
  <div><span></span></div>
      :  <button id={val._id} className={val}onClick={addFunc}>you whant it?</button> }  

</div>}

<div>
      
            
    </div>
</div>


    </div>
     
      {/* {Add.err ? 
    <span>{Add.err}dd</span>
    :
    <span></span>
  } */}
    <CardActions disableSpacing > 
    {/* {token != undefined?
    <div  className={val._id} id={val._id}   onClick={getId} >
    Like
        {val.userLikes.length}
        
    </div>
    :
    <span>cannot like</span>
  } */}



  

    </CardActions>
  
  </Card>
    </div>
  
  )})}
</div>
</div>
);
}
