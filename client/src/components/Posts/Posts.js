import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Container, Button, Checkbox, Box } from "@mui/material";
import { useSelector } from "react-redux";
import FilterListIcon from "@mui/icons-material/FilterList";
import Post from "./Post/Post";
import useStyles from "./styles";
// import Select from "./Select";
import Select from "@mui/material/Select";
// import { useHistory,useParams } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
// import { getPostsBySearch } from "../../redux/actions/posts";
// import Test from './Test'
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
const Posts = ({ setCurrentId }) => {
  const { posts, isLoading } = useSelector((state) => state.posts);
  console.log("i am data", posts);
  const classes = useStyles();
  const [value, setValue] = React.useState("ratings");

  // const dispatch = useDispatch();
  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  console.log("i m data", data);
  useEffect(() => {
    setData((posts) => [...posts]);
    const sortPosts = (type) => {
      const types = {
        ratings: "ratings",
        reviews: "reviews",
        price: "price",
        newest: "newest",
      };
      const sortProperty = types[type];
      const sorted = [...posts].sort(
        (a, b) => a[sortProperty] - b[sortProperty]
      );
      setData(sorted);
      console.log(data);
    };
    sortPosts(value);
  }, [value, posts]);

  if (!posts.length && !isLoading) return "No posts";
  return isLoading ? (
    <Box
      sx={{
        width: "100%",
        minWidth: "20rem",
        minHeight: "20rem",
        m: "auto",
        height: "100%",
        display: "flex",
        mt: 5,
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ minHeight: "15rem", minWidth: "15rem" }} />
    </Box>
  ) : (
    <Container maxWidth="xl">
      {/* <Test/> */}
      <div style={{ display: "flex", marginBottom: "50px" }}>
        <Button
          sx={{
            color: "black",
            width: "90px",
            height: "65px",
            fontSize: "17px",
            textTransform: "none",
            border: "1px solid black",
            fontWeight: "bold",
            my: "30px",
            mr: "30px",
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
        {/* <Select posts = {posts}/> */}

        <div>
          <FormControl sx={{ m: 4, ml: -2, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">
              Sort By
            </InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={value}
              label="Sort By"
              onChange={handleChange}
              className={classes.inputSelect}
            >
              <MenuItem value="ratings">Most Relevent</MenuItem>
              <MenuItem value="reviews">Most Reviewed</MenuItem>
              <MenuItem value="price">Cost</MenuItem>
              <MenuItem value="newest">Newest</MenuItem>
            </Select>
          </FormControl>
        </div>

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
        <Grid
          sx={{ border: "1px solid rgb(220,220,220)" }}
          className={classes.grid1}
        >
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
            <div style={{ border: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>English Language (72)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>English Conversation (2)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>English Vocabulary (22)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>American Slang (102)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
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
            <div style={{ border: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>Beginner (34)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>All Levels (25)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>Intermediate (11)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
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
            <div style={{ border: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>English (35)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
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
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>Paid (65)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
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
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
              <Checkbox />
              <span>Subtitles (25)</span>
            </div>
            <div style={{ borderBottom: "1px solid rgb(220,220,220)" }}>
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
          {data?.map((post) => (
            <Grid key={post._id}>
              <Post post={post} setCurrentId={setCurrentId} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
};

export default Posts;
