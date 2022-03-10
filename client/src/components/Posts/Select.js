import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';
import { useState,useEffect} from 'react';

export default function SelectLabels({posts}) {
  const classes = useStyles();
  const [value,setValue] = React.useState('ratings');

  const [data,setData] = useState([]);

  useEffect(()=>{
 const sortPosts = type =>{
   const types = {
     ratings : "ratings",
     reviews : "reviews",
     price : "price",
     newest : "newest"
   };
   const sortProperty = types[type];
   const sorted = [...posts].sort((a,b)=>a[sortProperty] - b[sortProperty]);
   setData(sorted);
 }
 sortPosts(value)
  },[value]);

  return (
    <div>
      <FormControl sx={{ m: 4,ml:-2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={value}
          label="Sort By"
          onChange={(e)=>setValue(e.target.value)}
          className={classes.inputSelect}
        >
          <MenuItem value="ratings">Most Relevent</MenuItem>
          <MenuItem value="reviews">Most Reviewed</MenuItem>
          <MenuItem value="price">Cost</MenuItem>
          <MenuItem value="newest">Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
