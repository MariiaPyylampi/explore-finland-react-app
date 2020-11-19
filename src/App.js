import React, { useEffect, useState } from 'react';
import './App.css';
import { Grid, Select, FormControl, InputLabel, FormHelperText, makeStyles } from '@material-ui/core';
import AppBar from './components/appbar';
import Card from './components/card';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function App() {
  const classes = useStyles();
  const [activities, setActivities] = useState([]);
  const [cities, setCities] = useState([]);
  const [filtered, setFiltered] = useState('');

  useEffect(() => {
    
    //fetch("http://localhost:8080/activities")
    fetch("https://explore-finland.herokuapp.com/activities")
      .then(res => res.json())
      .then(response => {
          console.log("act",response)
          setActivities(response)
        },
        (error) => {
          console.log(error)
        }
      )
    
    //fetch("http://localhost:8080/cities")  
    fetch("https://explore-finland.herokuapp.com/cities")
      .then(res => res.json())
      .then(response => {
          console.log("cities", response)
          setCities(response)
        },
        (error) => {
          console.log(error)
        }
      )
  }, [])

  const handleChange = (event) => {
    console.log('select', event.target.value)
    console.log('filtered', filtered)

    if(event.target.value !== "all") {
      let muuttuja = activities.filter(activity => {
        if(activity.city === null) {
          return null
        } else {
          return activity.city.name === event.target.value
        }
      })
      setFiltered(muuttuja)
    } else {
       setFiltered('')
    }
  }

  const map = () => {
    if(filtered === '') {
      return (
        activities.map(activity => 
          <Grid key={activity.activityId} item>
            <Card key={activity.activityId} activity={activity}/>
          </Grid>
      ))
    } else {
      return (
        filtered.map(activity => 
          <Grid key={activity.activityId} item>
            <Card key={activity.activityId} activity={activity}/>
          </Grid>
      ))
    }
  }

  return (
    <div className="App">
      <AppBar />
      <FormControl className={classes.formControl}>
        <InputLabel htmlFor='city'>City</InputLabel>
        <Select
          native
          onChange={handleChange}
          inputProps={{name: 'city', id: 'city'}}
        >
          <option aria-label="all" value="all">all</option>
          {cities.map(city =>
              <option key={city.cityId} value={city.name}>{city.name}</option>
          )}
        </Select>
        <FormHelperText>Filter by City</FormHelperText>
      </FormControl>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container justify="center" spacing={2}>
          {map()}
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

export default App;
