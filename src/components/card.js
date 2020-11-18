import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MUCard from '@material-ui/core/Card';
import { CardHeader, Avatar, CardContent, Typography, Divider } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 200
  },
  header: {
    textAlign: 'left'
  },
  avatar: {
    backgroundColor: 'steelblue'
  }
});

const Card = ({ activity }) => {
  const classes = useStyles();

  return (
    <MUCard className={classes.root} variant="outlined">
      <CardHeader className={classes.header}
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {activity.name.charAt(0)}
          </Avatar>
        }
        title={activity.name}
        subheader={!activity.city ? '' : `${activity.city.name}`}
      />
      <CardContent>
        <Typography variant="h6" color='textSecondary' gutterBottom>
          {activity.name}
        </Typography>
        <Typography variant="body2" gutterBottom>
          {activity.desc}
        </Typography>
        <Divider style={{marginTop: 30}}/>
        {!activity.category
        ? null
        :  <Typography variant="body2" style={{color: 'green', marginTop: 20}}>
            {activity.category.name}
           </Typography>
        }
      </CardContent>    
    </MUCard>
  );
}
export default Card