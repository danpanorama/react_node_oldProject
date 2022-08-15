import React, { useState } from "react";
import {Link} from "react-router-dom"
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import axiosConfig from "../../config/axios"
import {useFormik} from "formik"
import { Redirect } from "react-router-dom";
import {useDispatch,useSelector} from "react-redux";
import * as actionTypes from "../../store/Actions";


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

  const userAllInfo =  useSelector((state)=>state.users);

  
  const createUser = useFormik({
    initialValues:{
      number:userAllInfo.userInfo.number,
      password: "",
      name: userAllInfo.userInfo.name,
      view: userAllInfo.userInfo.view,
      email: userAllInfo.userInfo.email,
      phon:userAllInfo.userInfo.phon,
      firstName:userAllInfo.userInfo.name
     
  },onSubmit:async values  => {
    try{
      let requast = await
      axiosConfig
      .post("/updateUserInfo/updateStore", 
      values
      )
      .then((res) => {
       
        if(res.data.err){
        return setErrState(res.data.err);
        }else{
          dispatch({type:actionTypes.REQUAST,data:res.data,number:createUser.values.number})
            setisLoggd(true);
            console.log(res.data.data)
           
            
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

    <div className="formdiv">
      <div>
        <p>{createUser.values.name}</p>
        <p>{createUser.values.email}</p>
      </div>
      <h1 className="headerForems">update User Info</h1>
        <form className="formCreateUser" noValidate autoComplete="off" onSubmit={createUser.handleSubmit}>
        
      <TextField id="standard-basic" required name="name" label="user name"  values={createUser.values.name}
        onChange={createUser.handleChange} />
    
      <TextField id="standard-basic" required type="password" label="password" name="password"  values={createUser.values.password}
        onChange={createUser.handleChange}/>
    
      <TextField id="standard-basic"required type="email" label="email"  name="email" values={createUser.values.email}
        onChange={createUser.handleChange}/>
    
      <TextField id="standard-basic"required type="number" label="phon" name="phon"  values={createUser.values.phon}
        onChange={createUser.handleChange}/>
      <Select
      name="view"
      label={age}
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={age}
          onChange={handleChange}
          required
          values={createUser.values.view}
        onChange={createUser.handleChange}
        >
          <MenuItem value="">
            <em>choose</em>
          </MenuItem>
          <MenuItem value="D">Dark</MenuItem>
          <MenuItem value="L">Light</MenuItem>
        
        </Select>
        
    
    <div>  
      <br/>
      <Button type="submit" variant="contained" color="primary">
      change
      </Button>
      </div>
    </form>


    <h2>{errState}</h2>
    </div>

  );
}