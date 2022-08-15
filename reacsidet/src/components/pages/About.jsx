import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';

import "../../css/home.css"




const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});



function About() {
  const classes = useStyles();

  return (
    <div className="About min-h">


<React.Fragment>
      <CssBaseline />
      <Container maxWidth="sm">

      <h1>about us</h1>
      <div className="openning">
      <h1 className="Cwhite">danielgal</h1>
      </div>

                <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              className={classes.media}
              image=""
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                danielgal
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                across all continents except Antarctica
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              go to shop
            </Button>
          </CardActions>
          </Card>

          
     

      </Container>
    </React.Fragment>


 


    </div>
  );
}



export default About;




