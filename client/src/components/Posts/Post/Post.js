import React, { useState } from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase, Divider } from '@mui/material';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { useDispatch } from 'react-redux';
import moment from 'moment';
import { useHistory } from 'react-router-dom';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';
import StarHalfRoundedIcon from '@mui/icons-material/StarHalfRounded';
import { likePost, deletePost } from '../../../redux/actions/posts';
import useStyles from './styles';
import StarSharpIcon from '@mui/icons-material/StarSharp';
const Post = ({ post, setCurrentId }) => {
  const user = JSON.parse(localStorage.getItem('profile'));
  const [likes, setLikes] = useState(post?.likes);
  const dispatch = useDispatch();
  const history = useHistory();
  const classes = useStyles();

  const userId = user?.result.googleId || user?.result?._id;
  const hasLikedPost = post.likes.find((like) => like === userId);

  const handleLike = async () => {
    dispatch(likePost(post._id));

    if (hasLikedPost) {
      setLikes(post.likes.filter((id) => id !== userId));
    } else {
      setLikes([...post.likes, userId]);
    }
  };

  const Likes = () => {
    if (likes.length > 0) {
      return likes.find((like) => like === userId)
        ? (
          <><ThumbUpAltIcon fontSize="small" />&nbsp;{likes.length > 2 ? `You and ${likes.length - 1} others` : `${likes.length} like${likes.length > 1 ? 's' : ''}` }</>
        ) : (
          <><ThumbUpOffAltIcon fontSize="small" />&nbsp;{likes.length} {likes.length === 1 ? 'Like' : 'Likes'}</>
        );
    }

    return <><ThumbUpOffAltIcon fontSize="small" />&nbsp;Like</>;
  };

  const openPost = (e) => {
    // dispatch(getPost(post._id, history));

    history.push(`/posts/${post._id}`);
  };

  return (
    <div>
      <div style={{display: 'flex',borderBottom: '1px solid grey',margin:-10}}>
        <div style={{width:"30%",marginTop:30}}>
        <img src={post.selectedFile || 'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'} style={{width:"250px",height:"150px",borderLeft:"1px solid black",borderRadius:"5px"}} />
          </div>
        <div style={{width:"60%",padding:"20px",marginLeft:"40px"}}>
        <button onClick={openPost} style={{backgroundColor:"white",border:0,margin:-10,padding:-10}}>
        <p style={{marginLeft:-10,lineHeight:"1px",fontSize:"16px",fontWeight:"bold"}}>{post.title}</p>
        </button>
        {/* <h2>{post.name}</h2> */}
        {/* <h2>{moment(post.createdAt).fromNow()}</h2> */}
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
        <div>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              setCurrentId(post._id);
            }}
            style={{ color: 'white' }}
            size="small"
          >
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
        )} */}
          <p style={{marginLeft:-10,marginTop:5,lineHeight:1.5,fontSize:15}}>{post.message.split(' ').splice(0, 20).join(' ')}...</p>
          <p style={{marginLeft:-10,marginTop:-10,lineHeight:1.5,fontSize:15,fontWeight:"700"}}>{post.name}</p>
          <p style={{marginLeft:-10,marginTop:-10,fontSize:15,lineHeight:1.5}}>{post.rating}{<StarRateRoundedIcon/>}{<StarRateRoundedIcon/>}{<StarRateRoundedIcon/>}{<StarRateRoundedIcon/>}{<StarHalfRoundedIcon/>}</p>
          <div style={{marginLeft:-10,marginTop:-10,fontSize:15}}>
          <span style={{color:"grey",fontSize:"14px"}}>{post.total_hrs} total hours</span>
          <span style={{color:"grey",marginLeft:"5px",fontSize:"14px"}}><span style={{fontWeight:"900"}}>.</span>{post.total_lecture} total lectures</span>
          <span style={{color:"grey",marginLeft:"5px",fontSize:"14px"}}><span style={{fontWeight:"900"}}>.</span>{post.level}</span>
          </div>
        <div style={{marginLeft:-10,marginTop:5,fontSize:15}}>
          <p>{post.tags.map((tag) => <span style={{backgroundColor:"rgb(243,202,140)",padding:"3px",margin:"2px"}}>{`#${tag} `}</span>)}</p>
        </div>
        
          </div>
        
      </div>
      <CardActions className={classes.cardActions}>
        {/* <Button size="small" color="primary" disabled={!user?.result} onClick={handleLike}>
          <Likes />
        </Button> */}
        {/* {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) && (
          <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize="small" /> &nbsp; Delete
          </Button>
        )} */}
      </CardActions>
    </div>
  );
};

export default Post;


