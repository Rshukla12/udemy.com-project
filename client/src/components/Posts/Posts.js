import React from 'react';
import { Grid, CircularProgress, Button,Checkbox } from '@mui/material';
import { useSelector } from 'react-redux';
import FilterListIcon from '@mui/icons-material/FilterList';
import Post from './Post/Post';
import useStyles from './styles';
import Select from "./Select"
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // console.log(posts,isLoading)
  if (!posts.length && !isLoading) return 'No posts';
  
  return (
    isLoading ? <CircularProgress /> : (
      <>
      <div style={{display: 'flex',marginBottom: '50px'}}>
      <Button variant="outlined" startIcon={<FilterListIcon/>} className={classes.buttonFilter}>Filter</Button>
      <Select/>
      <h4 style={{marginLeft:"10px"}}>Clear filters</h4>
      </div>
      <Grid item className={classes.container} container alignItems="stretch" spacing={3}>
        
        <Grid className={classes.grid1}>
        <div>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Topic</Button>
        <div>
        <Checkbox />
        <span>English Language (72)</span>
        </div>
        <div>
        <Checkbox />
        <span>English Conversation (2)</span>
        </div>
        <div>
        <Checkbox />
        <span>English Vocabulary (22)</span>
        </div>
        <div>
        <Checkbox />
        <span>American Slang (102)</span>
        </div>
        <div>
        <Checkbox />
        <span>Teaching English (1)</span>
        </div>
        <Button sx ={{textTransform:"none"}} endIcon={<KeyboardArrowDownIcon/>}>Show more</Button>
        </div>
        <div style={{borderBottom:"1px solid grey"}}>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Level</Button>
        <div>
        <Checkbox />
        <span>Beginner (34)</span>
        </div>
        <div>
        <Checkbox />
        <span>All Levels (25)</span>
        </div>
        <div>
        <Checkbox />
        <span>Intermediate (11)</span>
        </div>
        <div>
        <Checkbox />
        <span>Expert (2)</span>
        </div>
        </div>
        <div style={{borderBottom:"1px solid grey"}}>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Language</Button>
        <div>
        <Checkbox />
        <span>English (35)</span>
        </div>
        <div>
        <Checkbox />
        <span>Espanol (25)</span>
        </div>
        <Button sx ={{textTransform:"none"}} endIcon={<KeyboardArrowDownIcon/>}>Show more</Button>
        </div>
        <div style={{borderBottom:"1px solid grey"}}>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Price</Button>
        <div>
        <Checkbox />
        <span>Paid (65)</span>
        </div>
        <div>
        <Checkbox />
        <span>Free (5)</span>
        </div>
        </div>
        <div style={{borderBottom:"1px solid grey"}}>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Features</Button>
        <div>
        <Checkbox />
        <span>Subtitles (25)</span>
        </div>
        <div>
        <Checkbox />
        <span>Quizzes (35)</span>
        </div>
        </div>
        <div style={{borderBottom:"1px solid grey"}}>
        <Button className={classes.topicButton} endIcon={<KeyboardArrowDownIcon/>}>Ratings</Button>
          </div>
          </Grid>
          <Grid className={classes.grid2}>
        {posts?.map((post) => (
          <Grid key={post._id} >
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
       </Grid>
      </Grid>
      </>
    )
  );
};

export default Posts;
