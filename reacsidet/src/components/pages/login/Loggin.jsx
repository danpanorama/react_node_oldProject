import React, { useState } from "react";
import {useFormik} from "formik"
import { Redirect } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../../css/CreateUser.css';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import axiosConfig from "../../../config/axios";
import * as actionTypes from "../../../store/Actions";




const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));


export default function CreateUser() {

  const [errState, setErrState] = useState("");
  const [isLoggd, setisLoggd] = useState(false);
  const dispatch = useDispatch();


  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [age, setAge] = React.useState('');
  const handleChangeremember = (event) => {
    setChecked(event.target.checked);
  };



  
  const LogInFrormik = useFormik({
    initialValues:{
    name:"",
    password:"",
    remember:false
  },onSubmit:async values  => {
    try{
      setErrState("")
      axiosConfig.post("/login", values)
      .then((res) => {
        if(res.data.err){
          console.log("error")
          return setErrState(res.data.err);
        }

        localStorage.setItem("token",res.data.token)
        dispatch({type:actionTypes.REQUAST,data:res.data})
        setisLoggd(true);
        setErrState("")
      })
      .catch((err) => {
        setErrState(err);
        console.log("error3")
      });
    }catch(e){
      console.log(e)
      setErrState("error while sending requast"+e);
    }
  }});



if(isLoggd){
return <Redirect to={{pathname:"/store"}}/>
}








  return (
    <div className="min-h">
      <div className="towSide">
      
<div className="towoftow">
   <div className="formdiv ">
      <h1 className="headerForems">loggin</h1>
      <form className="formCreateUser backColor"  onSubmit={LogInFrormik.handleSubmit}  noValidate autoComplete="off">
      <TextField id="standard-basic" label="name"     name="name" 
         values={LogInFrormik.values.name}
         onChange={LogInFrormik.handleChange}  />
      <TextField id="standard-basic" type="password" name="password" 
         values={LogInFrormik.values.password}
         onChange={LogInFrormik.handleChange} label="Password" />
        <div className="flexRow">
        <p className='colBlack'> remember me</p>
      <Checkbox
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
        onChange={handleChangeremember}
        name="remember" 
        values={LogInFrormik.values.remember?"true":"false"}  
        onChange={LogInFrormik.handleChange}
      />
      </div>
      <div>  
      <Button type="submit" variant="contained" color="primary">
        Loggin
      </Button>
      </div>
    </form>
    
    <div>
    <Link  to="/forgotpassword">forgot your password</Link>
    &nbsp;&nbsp;
    <Link  to="/createuser">create User</Link>
    &nbsp;&nbsp;
    <Link  to="/createstore">create Store</Link>
    </div>
    {errState}
    </div>
</div>
    
   

    </div>
    </div>
 
  );
}