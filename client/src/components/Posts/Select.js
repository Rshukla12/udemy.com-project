import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import useStyles from './styles';

export default function SelectLabels() {
    const classes = useStyles();
  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <div>
      <FormControl sx={{ m: 4,ml:-2, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-helper-label">Sort By</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={10}
          label="Sort By"
          onChange={handleChange}
          className={classes.inputSelect}
        >
          <MenuItem value={10}>Most Relevent</MenuItem>
          <MenuItem value={20}>Most Reviewed</MenuItem>
          <MenuItem value={30}>Highest Rated</MenuItem>
          <MenuItem value={30}>Newest</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
