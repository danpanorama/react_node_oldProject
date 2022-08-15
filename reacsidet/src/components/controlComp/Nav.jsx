import React  from 'react';
import { Switch, NavLink, Route } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import CreateUser from "../pages/login/CreateUser"
import CreateStore from "../pages/login/CreateStore"
import Loggin from "../pages/login/Loggin"

import AboutComp from "./../pages/About"
import Storecomp from "./../pages/Store"
import "../../css/Nav.css"



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));



export default function ButtonAppBar() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

const handleClick = (event) => {
  setAnchorEl(event.currentTarget);
};

const handleClose = () => {
  setAnchorEl(null);
};

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            
            <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
 Loggin
</Button>
<Menu
  id="simple-menu"
  anchorEl={anchorEl}
  keepMounted
  open={Boolean(anchorEl)}
  onClose={handleClose}
>
  <MenuItem onClick={handleClose}><NavLink  to="/createuser" className="Cblack" >Create New User</NavLink> </MenuItem>
  <MenuItem onClick={handleClose}>Create New Store</MenuItem>
  <MenuItem onClick={handleClose}><NavLink  to="/login" className="Cblack" >Login</NavLink></MenuItem>

  <MenuItem onClick={handleClose}>Logout</MenuItem>
</Menu>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
           DanielGal
          </Typography>
          
          <Button color="inherit" ><NavLink className="Cwhite" to="/" >home</NavLink></Button>
          <Button color="inherit"><NavLink className="Cwhite" to="/about" >about</NavLink></Button>
          <Button color="inherit"><NavLink className="Cwhite" to="/profile" >profile</NavLink></Button>
          <Button color="inherit"><NavLink className="Cwhite" to="/store" >store</NavLink></Button>

        </Toolbar>
      </AppBar>

<Switch>
  <Route path="/createuser" component={CreateUser}/>
  <Route path="/about" component={AboutComp}/>
  <Route path="/createstore" component={CreateStore}/>
  <Route path="/loggin" component={Loggin}/>

  
  {/* <Route path="/store" component={Storecomp}/> */}
  
  
</Switch>

    </div>
  );
}
