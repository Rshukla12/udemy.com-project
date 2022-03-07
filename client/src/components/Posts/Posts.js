import React from "react";
import { Grid, CircularProgress, Button, Checkbox } from "@mui/material";
import { useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import Post from "./Post/Post";
import useStyles from "./styles";
import Select from "./Select";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  const classes = useStyles();

  // console.log(posts,isLoading)
  if (!posts.length && !isLoading) return "No posts";

  return isLoading ? (
    <CircularProgress />
  ) : (
    <>
      <div
        style={{ display: "flex", marginBottom: "50px", marginLeft: "50px" }}
      >
        <Button
          sx={{
            color: "black",
            width: "90px",
            height: "65px",
            fontSize: "17px",
            textTransform: "none",
            border: "1px solid black",
            fontWeight: "bold",
            margin: "30px",
            borderRadius: 0,
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
          variant="outlined"
          startIcon={<FilterListIcon />}
          className={classes.buttonFilter}
        >
          Filter
        </Button>
        <Select />
        <h4 style={{ marginLeft: "-15px", marginTop: "52px" }}>
          Clear filters
        </h4>
      </div>
      <Grid
        item
        className={classes.container}
        container
        alignItems="stretch"
        spacing={3}
      >
        <Grid sx={{border:"1px solid rgb(220,220,220)"}}className={classes.grid1}>
          <div>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
               width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Topic
            </Button>
            <div style={{border: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>English Language (72)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>English Conversation (2)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>English Vocabulary (22)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>American Slang (102)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Teaching English (1)</span>
            </div>
            <Button
              sx={{ textTransform: "none" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Show more
            </Button>
          </div>
          <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
                width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Level
            </Button>
            <div style={{border: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Beginner (34)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>All Levels (25)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Intermediate (11)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Expert (2)</span>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
                width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Language
            </Button>
            <div style={{border: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>English (35)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Espanol (25)</span>
            </div>
            <Button
              sx={{ textTransform: "none" }}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Show more
            </Button>
          </div>
          <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
                width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Price
            </Button>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Paid (65)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Free (5)</span>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
                width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Features
            </Button>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Subtitles (25)</span>
            </div>
            <div style={{borderBottom: "1px solid rgb(220,220,220)"
           }}>
              <Checkbox />
              <span>Quizzes (35)</span>
            </div>
          </div>
          <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
            <Button
              sx={{
                color: "black",
                fontSize: "20px",
                textTransform: "none",
                fontWeight: "bold",
                width: "200px",
                "&:hover": {
                  backgroundColor: "white",
                },
              }}
              className={classes.topicButton}
              endIcon={<KeyboardArrowDownIcon />}
            >
              Ratings
            </Button>
          </div>
        </Grid>
        <Grid className={classes.grid2}>
          {posts?.map((post) => (
            <Grid key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </>
  );
};

export default Posts;
