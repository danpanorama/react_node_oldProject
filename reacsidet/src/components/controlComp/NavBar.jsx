import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import { Switch, NavLink, Route } from "react-router-dom";
import Loggin from "../pages/login/Loggin"
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import CreateUser from "../pages/login/CreateUser"
import CreateStore from "../pages/login/CreateStore"
import AboutComp from "./../pages/About"
import Storecomp from "./../pages/Store"
import Profile from "./../pages/Profile"
import UpdateUser from "./../pages/UpdateUser"
import UpdateStore from "./../pages/UpdateStore"


import ItemSelected from "./../pages/ItemSelected"
import PrivateRoute from "../../router/PrivateRout";
import * as actionTypes from "../../store/Actions";
import Home from "../pages/Home"

import "../../css/Nav.css"
import {useDispatch,useSelector} from "react-redux";



const useStyles = makeStyles((theme) => ({
grow: {
flexGrow: 1,
},
menuButton: {
marginRight: theme.spacing(2),
},
title: {
display: 'none',
[theme.breakpoints.up('sm')]: {
display: 'block',
},
},
search: {
position: 'relative',
borderRadius: theme.shape.borderRadius,
backgroundColor: fade(theme.palette.common.white, 0.15),
'&:hover': {
backgroundColor: fade(theme.palette.common.white, 0.25),
},
marginRight: theme.spacing(2),
marginLeft: 0,
width: '100%',
[theme.breakpoints.up('sm')]: {
marginLeft: theme.spacing(3),
width: 'auto',
},
},
searchIcon: {
padding: theme.spacing(0, 2),
height: '100%',
position: 'absolute',
pointerEvents: 'none',
display: 'flex',
alignItems: 'center',
justifyContent: 'center',
},
inputRoot: {
color: 'inherit',
},
inputInput: {
padding: theme.spacing(1, 1, 1, 0),
// vertical padding + font size from searchIcon
paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
transition: theme.transitions.create('width'),
width: '100%',
[theme.breakpoints.up('md')]: {
width: '20ch',
},
},
sectionDesktop: {
display: 'none',
[theme.breakpoints.up('md')]: {
display: 'flex',
},
},
sectionMobile: {
display: 'flex',
[theme.breakpoints.up('md')]: {
display: 'none',
},
},
}));



export default function PrimarySearchAppBar() {
const classes = useStyles();
const [anchorEl, setAnchorEl] = React.useState(null);
const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

const isMenuOpen = Boolean(anchorEl);
const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

const handleProfileMenuOpen = (event) => {
setAnchorEl(event.currentTarget);
};

const handleMobileMenuClose = () => {
setMobileMoreAnchorEl(null);
};

const handleMenuClose = () => {
setAnchorEl(null);
handleMobileMenuClose();
};

const handleMobileMenuOpen = (event) => {
setMobileMoreAnchorEl(event.currentTarget);
};



const dispatch = useDispatch();
const userAllInfo =  useSelector((state)=>state.users);
const items =  useSelector((state)=>state.item);


function loogOute(){
dispatch({type:actionTypes.LOGGOUT});
dispatch({type:actionTypes.DONE});
}
function changeView(){
    dispatch({type:actionTypes.CHANGVIEW});
    
}
const menuId = 'primary-search-account-menu';
const renderMenu = (
<Menu
anchorEl={anchorEl}
anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
id={menuId}
keepMounted
transformOrigin={{ vertical: 'top', horizontal: 'right' }}
open={isMenuOpen}
onClose={handleMenuClose}
>
<NavLink className="Cblack" to="/loggin"><MenuItem onClick={handleMenuClose}>login</MenuItem></NavLink>
<NavLink className="Cblack" to="/createstore"><MenuItem onClick={handleMenuClose}>create store</MenuItem></NavLink>
<NavLink className="Cblack" to="/createuser"><MenuItem onClick={handleMenuClose}>create user</MenuItem></NavLink>
{userAllInfo.userInfo&&userAllInfo.userInfo.name?
<span onClick={loogOute}> <MenuItem onClick={handleMenuClose}>logout</MenuItem></span>
:<p></p>}
</Menu>
);

const mobileMenuId = 'primary-search-account-menu-mobile';
const renderMobileMenu = (
<Menu
anchorEl={mobileMoreAnchorEl}
anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
id={mobileMenuId}
keepMounted
transformOrigin={{ vertical: 'top', horizontal: 'right' }}
open={isMobileMenuOpen}
onClose={handleMobileMenuClose}
>
<MenuItem>
<IconButton aria-label="show 4 new mails" color="inherit">
<NavLink className="Cblack" to="/home">
<AccountBalanceIcon/>

</NavLink>
</IconButton>
<NavLink className="Cblack" to="/home">
<p>home</p>
</NavLink>
</MenuItem>
<MenuItem>

<IconButton aria-label="show 11 new notifications" color="inherit">
<NavLink className="Cblack" to="/about">
<AssessmentIcon />
</NavLink>
</IconButton>
<NavLink className="Cblack" to="/about">
<p>about</p>
</NavLink>
</MenuItem>
{userAllInfo.userInfo &&userAllInfo.userInfo.name?
<MenuItem >
<IconButton
aria-label="account of current user"
aria-controls="primary-search-account-menu"
aria-haspopup="true"
color="inherit"
>
<NavLink className="Cblack" to="/profile">
<Badge badgeContent={items.sumItems} color="secondary">
<AccountCircle />
</Badge>
</NavLink>
</IconButton>
<NavLink className="Cblack" to="/profile">
<p>Profile</p>
</NavLink>
</MenuItem>
:
<p></p> }

<MenuItem >
<IconButton
aria-label="account of current user"
aria-controls="primary-search-account-menu"
aria-haspopup="true"
color="inherit"
><NavLink className="Cblack" to="/store">
<AttachMoneyIcon />
</NavLink>
</IconButton>
<NavLink className="Cblack" to="/store">
<p>store</p>
</NavLink>
</MenuItem>
<button onClick={changeView}>change view</button>

{userAllInfo.userInfo&&userAllInfo.userInfo.name?

<span onClick={loogOute}> <MenuItem onClick={handleMenuClose}>logout</MenuItem></span>
: <MenuItem onClick={handleProfileMenuOpen}>
<IconButton
aria-label="account of current user"
aria-controls="primary-search-account-menu"
aria-haspopup="true"
color="inherit"
><NavLink className="Cblack" to="/store">
<AccountBalanceWalletIcon />
</NavLink>
</IconButton>
<p>loggin</p>

</MenuItem>
}

</Menu>
);

return (
 
<div className={classes.grow}>
    <div className="posSticky"> 
<AppBar position="static">
<Toolbar>
<IconButton
edge="start"
className={classes.menuButton}
color="inherit"
aria-label="open drawer"
>
<MenuIcon />
</IconButton>
<Typography className={classes.title} variant="h6" noWrap>
{userAllInfo.userInfo&&userAllInfo.userInfo.name?userAllInfo.userInfo.name:
<p>Welcome user</p> }
</Typography>

<div className={classes.search}>
    <a href="/">
       <div className="bac-img"></div> 
    </a>

</div>
<div className={classes.grow} />
<div className={classes.sectionDesktop}>

{userAllInfo.userInfo&&userAllInfo.userInfo.name?<p></p>:
<IconButton
edge="end"
aria-label="account of current user"
aria-controls={menuId}
aria-haspopup="true"
onClick={handleProfileMenuOpen}
color="inherit"
>
<Badge  color="secondary">
loggin
</Badge>
</IconButton> } 



<IconButton aria-label="show 4 new mails" color="inherit">
<NavLink className="Cwhite" to="/home" >
<Badge  color="secondary">
<AccountBalanceIcon/>
</Badge>
</NavLink>
</IconButton>

<IconButton aria-label="show 17 new notifications" color="inherit">
<NavLink className="Cwhite" to="/profile" >
<Badge badgeContent={items.sumItems} color="secondary">
<AccountCircle />

</Badge>
</NavLink>
</IconButton>


<IconButton color="inherit"
><NavLink className="Cwhite" to="/about" >
<Badge  color="secondary">
<AssessmentIcon />
</Badge>
</NavLink>
</IconButton>







<IconButton color="inherit"
>
<NavLink className="Cwhite" to="/store" >
<Badge  color="secondary">
<AttachMoneyIcon />
</Badge>
</NavLink>
</IconButton>
<button onClick={changeView}>change view</button>

{userAllInfo.userInfo&&userAllInfo.userInfo.name?
<IconButton onClick={loogOute} color="inherit"
>
loggout

</IconButton>
:<p></p>}
</div>

<div className={classes.sectionMobile}>
<IconButton
aria-label="show more"
aria-controls={mobileMenuId}
aria-haspopup="true"
onClick={handleMobileMenuOpen}
color="inherit"
>
<MoreIcon />
</IconButton>
</div>
</Toolbar>
</AppBar>
{renderMobileMenu}
{renderMenu}
</div>
<Switch>
<Route path="/createuser" component={CreateUser}exact/>
<Route path="/about" component={AboutComp}exact/>
<Route path="/createstore" component={CreateStore}exact/>
<Route path="/home" component={Home}exact/>
<Route path="/loggin" component={Loggin}exact/>
<Route path="/store" component={Storecomp}exact/>
<Route path="/itemselected" component={ItemSelected}exact/>

<Route path="/UpdateUser" component={UpdateUser}exact/>
<Route path="/UpdateStore" component={UpdateStore}exact/>


<PrivateRoute path="/profile" component={Profile} exact/>
</Switch>
</div>

);
}
