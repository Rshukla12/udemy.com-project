import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import IconButton from "@mui/material/IconButton";
import moment from 'moment';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import { Link } from 'react-router-dom';
import { useState } from "react";

const ReviewComponent = ({ review }) => {
    const [liked, setLiked] = useState(false);
    const [disliked, setDisliked] = useState(false);
    const handleLike = () => {
        if ( !liked && disliked ) setDisliked(false); 
        setLiked(!liked);
    }
    const handleDislike = () => {
        if ( liked && !disliked ) setLiked(false); 
        setDisliked(!disliked);
    }
    return (
        <Box sx={{ display: "flex", gap: 2, width: "100%", p: 1 }}>
            <Avatar sx={{ bgcolor: "#1C1D1F" }}>{review.author.name[0].toUpperCase()}</Avatar>
            <Box>
                <Typography variant="h4" sx={{ color: "#1C1D1F" }}>{review.author.name}</Typography>
                <Box>
                    <Rating readOnly value={review.rating} size="large" />
                    <Typography variant="subtitle1" sx={{ color: "#1C1D1F" }}>{moment(review.createdAt).fromNow()}</Typography>
                </Box>
                <Typography variant="body1" color="text.secondary">
                    {review.review}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Was this review helpful?
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <IconButton
                        variant="outlined"
                        onClick={handleLike}
                        sx={{
                            mt: 1,
                            color: "black",
                            borderRadius: "50%",
                            height: "40px",
                            border: "1px solid #444",
                            fontSize: "small"
                        }} 
                    >  
                        { liked ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
                    </IconButton>
                    <IconButton 
                        onClick={handleDislike}
                        variant="outlined"
                        sx={{
                            mt: 1,
                            color: "black",
                            borderRadius: "50%",
                            height: "40px",
                            border: "1px solid #444",
                        }}
                    >
                        {disliked ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon /> }
                    </IconButton>
                    <Link to="/" style={{color: "#67676767", marginTop: "1rem"}}>Report</Link>
                </Box>
            </Box>
        </Box >
    )
}

export default ReviewComponent;