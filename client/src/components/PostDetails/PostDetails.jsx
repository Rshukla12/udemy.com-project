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

  const { isLoading: isLoadingCart, cart } = useSelector(state => state.cart);
  const { isLoadingWishlist, wishlist } = useSelector(state => state.wishlist);
  const { purchased } = useSelector(state => state.purchased);
  const { isLogin } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getPost(id));
    dispatch(fetchPurchased())
  }, [id]);

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


  if (!post) return null;

  const no_of_ratings = Math.round(((post.views * 0.2) + (post.purchased * 0.3)) / 10);

  let salePrice = 700;
  if (isLogin) salePrice = 399;
  const newPrice = post.on_discount && post.price > salePrice ? salePrice : post.price;


  // const openPost = (_id) => history.push(`/posts/${_id}`);

  // const recommendedPosts = posts.filter(({ id }) => id !== posts._id);
  // console.log(recommendedPosts,"recommendedPosts")
  console.log(posts, "recommendedPosts")

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

  return (
    <>
      <Container maxWidth="xl">

        <Box style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
          <div className={classes.card}>
            <div className={classes.section}>
              <Typography variant="h3" component="h2">{post.course_name}</Typography>
              <Typography gutterBottom variant="body1" component="p">{post.tagline}</Typography>
              <Stack spacing={2} direction="column" >
                <Typography variant="h6">
                  Created by:{post.instructors.map((ins) => ins.creator)}
                </Typography>
                <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                {
                  post.description.map((p, ind) => (
                    <Stack key={ind * 321} spacing={1} direction="row">
                      <CheckRoundedIcon />
                      <Typography variant="body1" color="inherit" sx={{ fontWeight: 500 }}>{p}</Typography>
                    </Stack>
                  ))
                }
                <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (` #${tag} `))}
                </Typography>
              </Stack>
            </div>
            {/* <Card sx={{ width: "100%", maxWidth: "23rem" }}>
              <CardMedia
                sx={{ borderRadius: 0, height: 180 }}
                component="img"
                image={post.img}
                alt={post.course_name}
              />
              <CardContent sx={{ height: 80, px: 2, py: 1, textAlign: "left" }}>
                <Typography gutterBottom variant="body1" component="p">
                  Purchasing for team? <span style={{ color: "blue" }}>Try Udemy Business</span>
                </Typography>
                <RatingComponent rating={post.ratings} noOfRatings={no_of_ratings} />
                <Typography variant="body1" sx={{ my: 1, fontWeight: 600 }}>
                  &#8377;{salePrice < post.price ? salePrice : post.price}
                </Typography>
                {post.on_discount && post.price !== newPrice ? (
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ textDecoration: "line-through" }}
                  >
                    &#8377;{post.price}
                  </Typography>
                ) : (
                  <></>
                )}
                <Stack direction="row" spacing={1.5} sx={{ width: "100%" }}>
                  <Stack direction="row" spacing={1} sx={{width: "100%"}}>
                    {isLoadingCart ? <CircularProgress /> : (
                      <Button
                        variant="contained"
                        onClick={() => bought ? setOpenPlayer(true) : state ? dispatch(removeFromCart(post._id)) : dispatch(addToCart(post))}
                        disableRipple
                        sx={{
                          textTransform: "none",
                          bgcolor: "#A435F0",
                          color: "white",
                          borderRadius: "0px",
                          px: 2,
                          height: "40px",
                          minWidth: "200px",
                          "&:hover": {
                            color: "white",
                            bgcolor: "blueviolet",
                          },
                        }}
                      >
                        {
                          bought ? "Play Course Video" : state ? "Remove From Cart" : "Add to Cart"
                        }
                      </Button>
                    )
                    }
                    <IconButton
                      variant="outlined"
                      sx={{
                        mt: 2,
                        color: "black",
                        borderRadius: "50%",
                        height: "40px",
                        border: "1px solid #444",
                      }}
                      disabled={!bought}
                      onClick={() => setOpenPlayer(true)}
                    >
                      <PlayCircleOutlineIcon />
                    </IconButton>
                    {isLoadingWishlist ? <CircularProgress /> :
                      <IconButton
                        variant="outlined"
                        sx={{
                          mt: 2,
                          color: "black",
                          borderRadius: "50%",
                          height: "40px",
                          border: "1px solid #444",
                        }}
                        onClick={() => wish ? dispatch(removeFromWishlist(post._id)) : dispatch(addToWishlist(post))}
                      >
                        {
                          wish ? (
                            <FavoriteRoundedIcon />
                          ) : (
                            <FavoriteBorderRoundedIcon />
                          )
                        }
                      </IconButton>
                    }

                  </Stack>
                </Stack>
              </CardContent>
            </Card> */}
            <CoursePageSideCard course={post} onPlay={() => setOpenPlayer(true)} />
            {/* <div style={{ maxWidth: "30rem" }} className={classes.imageSection}>
            <img className={classes.media} src={post.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
          </div> */}
          </div>
          {!!posts.length && (
            <div className={classes.section}>
              <Typography gutterBottom variant="h5">You might also like:</Typography>
              <Divider />
              <CourseCarousel courses={posts} isLoading={isLoading} />
              {/* <div className={classes.recommendedPosts}>
              {
                posts.map(({ course_name, tagline, img, _id }) => (
                  <div style={{ margin: '20px', cursor: 'pointer' }} 
                    onClick={() => openPost(_id)} 
                    key={_id}
                  >
                    <Typography gutterBottom variant="h6">{course_name}</Typography>
                    <Typography gutterBottom variant="subtitle2">{tagline}</Typography>
                    <Typography gutterBottom variant="subtitle2">{message}</Typography>
                    <img src={img} width="200px" />
                  </div>
                ))
              }
              </div> */}
            </div>
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