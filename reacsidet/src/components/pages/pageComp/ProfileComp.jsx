import react from "react"
import AddItem from "../pageComp/AddItems"
import ProfilItems from "../pageComp/ProfileItems"
import "../../../css/profile.css"
import { Switch, NavLink, Route } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

function ProfileComp(props) {
    const classes = useStyles();
    const bull = <span className={classes.bullet}>•</span>;
    
return (
<div className="Home">

    <div className="divInfo">
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
         name and email
        </Typography>
        <Typography variant="h5" component="h2">
        {props.userInfo.name}{bull}{props.userInfo.email}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          number of user
        </Typography>
        <Typography variant="body2" component="p">
        {props.userInfo.number}
        <br/>
        {props.userInfo.view}

          <br />
          <div className="paregraph">{props.userInfo.isStore==1?
        <p>is a store</p>:
        <p>is a user</p>    
        }</div>
        </Typography>
      </CardContent>
      <CardActions>
      {props.userInfo.isStore == 1?
       <NavLink to="/UpdateStore">
       <Button size="small">update Store</Button> 
      </NavLink>
    :
        <NavLink to="/UpdateUser">
         <Button size="small">update User</Button> 
        </NavLink>}
        
      </CardActions>
    </Card>
    </div>

    <div className="flexCenter">
    {props.userInfo.isStore==1?
    <AddItem data={props.userInfo}/>    
    : <p></p>}
    
            <div className="userProduct">
               <ProfilItems />
            </div>
    </div>
   
</div>
);
}

export default ProfileComp;
