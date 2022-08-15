import React, { useState } from "react";
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import '../../../css/CreateUser.css';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axiosConfig from "../../../config/axios"
import {useFormik} from "formik"
import { Redirect } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
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
  const classes = useStyles();
  const [checked, setChecked] = React.useState(true);
  const [errState, setErrState] = useState("");
  const [age, setAge] = React.useState('');
  const [isLoggd, setisLoggd] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (event) => {
    setAge(event.target.value);
  };


  
  const createUser = useFormik({
    initialValues:{
      isStore:1, 
      password: "",
      name: "",
      view: "L",
      email: "",
      phon:0,
      remember: false,
  },onSubmit:async values  => {
    try{
      let requast = await
      axiosConfig
      .post("/createUser/signup", 
      values
      )
      .then((res) => {
        console.log(res)
        if(res.data.err){
        return setErrState(res.data.err);
        }else{
          console.log("yes")
            setisLoggd(true);
            console.log(res.data,":::::::::")
            localStorage.setItem("token",res.data.token)
           dispatch({type:actionTypes.REQUAST,data:res.data})
        }
      
      })
      .catch((err) => {
        setErrState(err.err);
      });
    }catch(e){
      console.log(e)
      setErrState("error while sending requast"+e);
    }
  }});





  if(isLoggd){
    return <Redirect to={{pathname:"/store"}}/>
  }
  const handleChangeremember = (event) => {
    setChecked(event.target.checked);
  };
  
  return (
      <div className="min-h">
    <div className="formdiv">
    

      
      <h1 className="headerForems">Create New Store</h1>
        <form className="formCreateUser backColor" noValidate autoComplete="off" onSubmit={createUser.handleSubmit}>
          
      <TextField id="standard-basic" name="name" label="user name" values={createUser.values.name}
        onChange={createUser.handleChange} />
    
      <TextField id="standard-basic" type="password" label="password" name="password"  values={createUser.values.password}
        onChange={createUser.handleChange}/>
    
      <TextField id="standard-basic" type="email" label="email"  name="email" values={createUser.values.email}
        onChange={createUser.handleChange}/>
    
      <TextField id="standard-basic" type="number" label="phon" name="phon"  values={createUser.values.phon}
        onChange={createUser.handleChange}/>
      <Select
      name="view"
      label={age}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          values={createUser.values.view}
        onChange={createUser.handleChange}
        >
          <MenuItem value="">
            <em>choose</em>
          </MenuItem>
          <MenuItem value="D">Dark</MenuItem>
          <MenuItem value="L">Light</MenuItem>
        
        </Select>
        <div className="flexRow">
            remember me
      <Checkbox

        name="remember"
        values={createUser.values.remember?"true":"false"}
        onChange={createUser.handleChange}
        color="primary"
        inputProps={{ 'aria-label': 'secondary checkbox' }}
       
      />
        </div>
    
    <div>  
      <Button type="submit" variant="contained" color="primary">
        Loggin
      </Button>
      </div>
    </form>
    <Link to="/forgotpassword">forgot your password</Link>
    <Link to="/loggin">loggin</Link>

    <h2>{errState}</h2>
    </div>
    </div>

  );
}