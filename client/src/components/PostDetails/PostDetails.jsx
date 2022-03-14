import React, { useEffect } from 'react';
import { Stack, Button, CardContent, IconButton, Paper, Box, CardMedia, Typography, CircularProgress, Divider, Card, Container } from '@mui/material';
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';
import CourseCarousel from "../Carousel/CourseCarousel";
import { getPost, getPostsBySearch } from '../../redux/actions/posts';
import { fetchPurchased } from '../../redux/actions/purchase';
import RatingComponent from "../CourseCard/RatingComponent";
import useStyles from './styles';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist';
import CoursePageSideCard from '../CoursePageSideCard/CoursePageSideCard';
import CoursePageNavbar from '../CoursePageNavbar/CoursePageNavbar';
import ReviewBox from '../ReviewBox/ReviewBox';
import ReviewComponent from '../ReviewComponent/ReviewComponent';
import { fetchReviewsByUser } from '../../redux/actions/review';
import * as api from '../../api/index.js';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  const [openPlayer, setOpenPlayer] = React.useState(false);
  const [state, setState] = React.useState(false);
  const [wish, setWish] = React.useState(false);
  const [bought, setBought] = React.useState(false);
  const [reviewed, setReviewed] = React.useState(false);

  const { isLoading: isLoadingCart, cart } = useSelector(state => state.cart);
  const { isLoadingWishlist, wishlist } = useSelector(state => state.wishlist);
  const { purchased } = useSelector(state => state.purchased);
  const { isLogin, authData } = useSelector((state) => state.auth);
  const { reviews, isLoadingReviews } = useSelector((state) => state.reviews);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(fetchPurchased());
    dispatch(fetchReviewsByUser(authData?._id));
  }, [id,reviewed]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'java' }));
    }
  }, [post]);


  React.useEffect(() => {
    let isPurchased = false;
    for (const c of purchased) {
      if (post?._id === c._id) isPurchased = true;
    }
    if (isPurchased) setBought(true);
  });

  React.useEffect(() => {
    let a = false;
    for (const c of cart) {
      if (post?._id === c._id) a = true;
    }
    if (a) setState(true);
    else setState(false);
  }, [cart]);

  React.useEffect(() => {
    let b = false;
    for (const c of wishlist) {
      if (post?._id === c._id) b = true;
    }
    if (b) setWish(true);
    else setWish(false);
  }, [wishlist]);

  React.useEffect(() => {
    let r = false;
    for (const c of reviews) {
      if (post?._id === c.course) r = true;
    }
    console.log(reviews, post?._id);
    if (r) setReviewed(true);
    else if ( post ) setReviewed(false);
  }, [reviews, post]);

  const onReview = async (data) => {
    await api.writeReview( post._id, data );
    setReviewed(true);
  }

  if (!post) return null;

  const no_of_ratings = Math.round(((post.wishlisted * 0.2) + (post.purchased ?? Math.round(Math.random() * 100) * 0.3)) / 10);

  // const openPost = (_id) => history.push(`/posts/${_id}`);

  // const recommendedPosts = posts.filter(({ id }) => id !== posts._id);
  // console.log(recommendedPosts,"recommendedPosts")

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
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
      </Paper>
    );
  }
  console.log(bought, reviewed)

  return (
    <>
      <CoursePageNavbar title={post.course_name} rating={post.ratings} no_of_rating={post.reviews.length || no_of_ratings} purchased={post.purchased} />

      <Box sx={{ bgcolor: "#1C1D1F", color: "white" }} fullWidth>
        <Container maxWidth="xl" >
          <Box sx={{ p: 5, px: 20, width: "50%" }}>
            <Typography variant="h3" >{post.course_name}</Typography>
            <Stack spacing={1} direction="column" >
              <Typography gutterBottom variant="h6" sx={{ fontWeight: "400", my: 2 }}>{post.tagline}</Typography>
              <RatingComponent no_of_rating={no_of_ratings} rating={post.ratings} />
              <Typography variant="h6">
                Created by: <Link sx={{color: "slateblue"}}>
                  {post.instructors.map((ins) => ins.creator)}
                </Link>
              </Typography>
              <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
              <Typography gutterBottom variant="h6" color="text" component="h2">{post.tags.map((tag) => (` #${tag} `))}
              </Typography>
            </Stack>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="xl">


        <Box sx={{ padding: '20px', borderRadius: '15px', px: 20, width: "50%" }} elevation={6}>

          {!openPlayer && <CoursePageSideCard course={post} onPlay={() => setOpenPlayer(true)} />}
          <Box sx={{ border: "1px solid #34343474", width: "90%", ml: 2, mb: 2, p: 2, pr: 3, display: "flex", flexDirection: "column", gap: "0.2rem" }}>
            <Typography variant="h5">
              What you'll learn
            </Typography>
            {
              post.description.map((p, ind) => (
                <Stack key={ind * 321} spacing={1} direction="row">
                  <CheckRoundedIcon />
                  <Typography variant="body1" color="inherit" sx={{ fontWeight: 500 }}>{p}</Typography>
                </Stack>
              ))
            }
          </Box>
          <Box>
            {
              post?.reviews.length !== 0 && (
                post?.reviews.map(review => (
                  <ReviewComponent review={review} key={review._id} />
                ))
              )
            }
          </Box>
          { bought && !reviewed && <ReviewBox onSubmit={onReview} /> }
          {!!posts.length && (
            <Box sx={{ width: "100%",mt:6 }}>

              <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <Box sx={{ ml: -5, width: "67rem"}}>
                  <CourseCarousel courses={posts} isLoading={isLoading} size={4} />
                </Box>
              </div>
            </Box>
          )}
        </Box>
      </Container>
      <VideoPlayer open={openPlayer} onClose={() => setOpenPlayer(false)} course={post} />
    </>
  );
};

export default Post;


// to={`/tags/${tag}`}

// to={`/creators/${post.name}`}