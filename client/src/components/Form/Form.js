import React, { useState, useEffect } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Divider,
  Radio,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import FileBase from "react-file-base64";
import { useHistory } from "react-router-dom";
// import ChipInput from 'material-ui-chip-input';
import Spellcheck from '@mui/icons-material/Spellcheck';
import { createPost } from "../../redux/actions/posts";
import useStyles from "./styles";

const Form = ({ currentId, setCurrentId }) => {
  const [postData, setPostData] = useState({
    course_name: "",
    tagline: "",
    description: [],
    price: 0,
    course_total_lectures: 0,
    level: "",
    course_time: 0,
    language: "",
    tags: [],
    img: "",
  });
  const post = useSelector((state) =>
    currentId
      ? state.posts.posts.find((tagline) => tagline._id === currentId)
      : null
  );
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem("profile"));
  const history = useHistory();

  const clear = () => {
    // setCurrentId(0);
    setPostData({
      course_name: "",
      tagline: "",
      description: [],
      price: 0,
      course_total_lectures: 0,
      level: "",
      course_time: 0,
      language: "",
      tags: [],
      img: "",
    });
  };

  useEffect(() => {
    if (!post?.course_name) clear();
    if (post) setPostData(post);
  }, [post]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(postData);
    // if (currentId === 0) {
    dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    clear();
    // } else {
    //   dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    //   clear();
    // }
  };

  if (!user?.result) {
    return (
      <Paper className={classes.paper} elevation={6}>
        <Typography variant="h6" align="center">
          Please Sign In to create new courses
        </Typography>
      </Paper>
    );
  }

  // const handleAddChip = (tag) => {
  //   setPostData({ ...postData, tags: [...postData.tags, tag] });
  // };

  // const handleDeleteChip = (chipToDelete) => {
  //   setPostData({ ...postData, tags: postData.tags.filter((tag) => tag !== chipToDelete) });
  // };

  return (
    <Container component="main" maxWidth="xl" sx={{ mt: 5, mb: 5 }}>
      <Grid container spacing={2}>
        <Grid
          item
          sm={3}
          display={{ xs: "none", sm: "block" }}
        >
          <Typography variant="body1" sx={{fontWeight: "bold",fontSize: "18px"}}>Plan your course</Typography>
          <Typography variant="body1"><Radio/> Intended learners</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Course Structure</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Setup & test video</Typography>
          <Divider/>
          <Typography variant="body1" sx={{fontWeight: "bold",fontSize: "18px"}}>Create your content</Typography>
          <Typography variant="body1"><Radio/> Film & edit</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/>Curriculum </Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Captions(optional)</Typography>
          <Divider/>
          <Typography variant="body1" sx={{fontWeight: "bold",fontSize: "18px"}}>Publish your course</Typography>
          <Typography variant="body1"><Radio/> Course landing page</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Pricing</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Promotions</Typography>
          <Divider/>
          <Typography variant="body1"><Radio/> Course messages</Typography>
          <Divider/>
          <Button
                className={classes.buttonSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "rgb(164,53,240)",
                  borderRadius: 0,
                  textTransform: "none",
                  "&:hover": {
                    background: "rgb(164,80,240)",
                  },
                }}
                size="large"
                type="submit"
                fullWidth
              >
                Submit for Review
              </Button>
        </Grid>
        <Grid item sm={9} xs={12}>
          <Paper className={classes.paper} elevation={4}>
            <form
              autoComplete="off"
              noValidate
              className={`${classes.root} ${classes.form}`}
              onSubmit={handleSubmit}
            >
              <Typography gutterBottom variant="h5" sx={{borderBottom: "1px solid rgb(220,220,220)",m:2,fontWeight: "600"}}>Create Course</Typography>
              <Typography variant="body1" sx={{m:2}}>The following descriptions will be publicly visible on your <span style={{color:"purple",textDecoration: "underline"}}>Course Landing Page</span> and will have a direct impact on your course performance. These descriptions will help learners decide if your course is right for them.</Typography>
              <Typography variant="body1"sx={{ml:2,fontWeight:600}}>What will students learn in your course?</Typography>
              <Typography variant="body1"  sx={{m:2}}>You must enter at least <span style={{color:"purple",textDecoration: "underline"}}>4 learning objectives</span> or outcomes that learners can expect to achieve after completing your course.</Typography>
              <TextField
                name="course_name"
                variant="outlined"
                label="Course Name"
                fullWidth
                value={postData.course_name}
                onChange={(e) =>
                  setPostData({ ...postData, course_name: e.target.value })
                }
              />

              <TextField
                name="tagline"
                variant="outlined"
                label="Tagline"
                fullWidth
                multiline
                rows={4}
                value={postData.tagline}
                onChange={(e) =>
                  setPostData({ ...postData, tagline: e.target.value })
                }
              />

              <TextField
                name="Description"
                variant="outlined"
                label="Description"
                fullWidth
                multiline
                rows={4}
                value={postData.description}
                onChange={(e) =>
                  setPostData({ ...postData, description: e.target.value })
                }
              />
              <Typography variant="body1" sx={{color:"navy",fontWeight:"bold",m:2}}>+ Add more to your response</Typography>
              <Typography variant="body1"sx={{ml:2,fontWeight:600}}>What are the requirements of the total lectures or prerequisites for taking your course?</Typography>
                <Typography variant="body1" sx={{m:2}}>List the required skills, experience, tools or equipment learners should have prior to taking your course.
If there are no requirements, use this space as an opportunity to lower the barrier for beginners.</Typography>
              <TextField
                name="course_total_lectures"
                variant="outlined"
                label="course_total_lectures"
                fullWidth
                value={postData.course_total_lectures}
                onChange={(e) =>
                  setPostData({
                    ...postData,
                    course_total_lectures: e.target.value,
                  })
                }
              />

              <TextField
                name="price"
                variant="outlined"
                label="Price"
                fullWidth
                value={postData.price}
                onChange={(e) =>
                  setPostData({ ...postData, price: e.target.value })
                }
              />

              <TextField
                name="tags"
                variant="outlined"
                label="Tags"
                fullWidth
                value={postData.tags}
                onChange={(e) =>
                  setPostData({ ...postData, tags: e.target.value })
                }
              />

              <TextField
                name="course_time"
                variant="outlined"
                label="Course Time"
                fullWidth
                value={postData.course_time}
                onChange={(e) =>
                  setPostData({ ...postData, course_time: e.target.value })
                }
              />

              {/* <TextField name="total_lecture" variant="outlined" label="Total_lecture" fullWidth value={postData.total_lecture} onChange={(e) => setPostData({ ...postData, total_lecture: e.target.value })} /> */}

              <Typography variant="body1" sx={{color:"navy",fontWeight:"bold",m:2}}>+ Add more to your response</Typography>
                <Typography variant="body1" sx={{m:2}}>Write a clear description of <span style={{color:"purple",textDecoration: "underline"}}>the intended learners</span> for your course who will find your course content valuable.
This will help you attract the right learners to your course.</Typography>
              
              <TextField
                name="level"
                variant="outlined"
                label="level"
                fullWidth
                value={postData.level}
                onChange={(e) =>
                  setPostData({ ...postData, level: e.target.value })
                }
              />

              <TextField
                name="language"
                variant="outlined"
                label="Language Used"
                fullWidth
                value={postData.language}
                onChange={(e) =>
                  setPostData({ ...postData, language: e.target.value })
                }
              />

              {/* <div style={{ padding: '5px 0', width: '94%' }}>
          <ChipInput
            name="tags"
            variant="outlined"
            label="Tags"
            fullWidth
            value={postData.tags}
            onAdd={(chip) => handleAddChip(chip)}
            onDelete={(chip) => handleDeleteChip(chip)}
          /> */}
              {/* </div> */}
              <div className={classes.fileInput}>
                <FileBase
                  type="file"
                  multiple={false}
                  onDone={({ base64 }) =>
                    setPostData({ ...postData, img: base64 })
                  }
                />
              </div>
              <Button
                className={classes.buttonSubmit}
                variant="contained"
                sx={{
                  backgroundColor: "rgb(164,53,240)",
                  textTransform: "none",
                  "&:hover": {
                    background: "rgb(164,80,240)",
                  },
                }}
                size="large"
                type="submit"
                fullWidth
              >
                Create Course
              </Button>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Form;
