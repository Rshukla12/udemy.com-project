import React, { useEffect } from 'react';
import { Paper, Typography, CircularProgress, Divider } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { useParams, useHistory, Link } from 'react-router-dom';

import { getPost, getPostsBySearch } from '../../redux/actions/posts';
import useStyles from './styles';

const Post = () => {
  const { post, posts, isLoading } = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();

  console.log(post,"...");
  console.log(posts,"...");
  useEffect(() => {
    dispatch(getPost(id));
  }, [id]);

  useEffect(() => {
    if (post) {
      dispatch(getPostsBySearch({ search: 'java'}));
    }
  }, [post]);

  if (!post) return null;

  // const openPost = (_id) => history.push(`/posts/${_id}`);
  
  // const recommendedPosts = posts.filter(({ id }) => id !== posts._id);
  // console.log(recommendedPosts,"recommendedPosts")
  console.log(posts,"recommendedPosts")

  if (isLoading) {
    return (
      <Paper elevation={6} className={classes.loadingPaper}>
        <CircularProgress size="7em" />
      </Paper>
    );
  }

  return (
    <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
      <div className={classes.card}>
        <div className={classes.section}>
          <Typography variant="h3" component="h2">{post.course_name}</Typography>
          <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => (` #${tag} `))}
          </Typography>
          <Typography gutterBottom variant="body1" component="p">{post.description.map((description) =>description)}</Typography>
          <Typography variant="h6">
            Created by:{post.instructors.map((ins)=> ins.creator)}
          </Typography>
          <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
        </div>
        <div className={classes.imageSection}>
          <img className={classes.media} src={post.img || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} alt={post.title} />
        </div>
      </div>
      {!!posts.length && (
        <div className={classes.section}>
          <Typography gutterBottom variant="h5">You might also like:</Typography>
          <Divider />
          <div className={classes.recommendedPosts}>
            {posts.map(({course_name, tagline, img, _id }) => (
              <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                <Typography gutterBottom variant="h6">{course_name}</Typography>
                <Typography gutterBottom variant="subtitle2">{tagline}</Typography>
                {/* <Typography gutterBottom variant="subtitle2">{message}</Typography> */}
                <img src={img} width="200px" />
              </div>
            ))}
          </div>
        </div>
      )}
    </Paper>
  );
};

export default Post;


// to={`/tags/${tag}`}

// to={`/creators/${post.name}`}