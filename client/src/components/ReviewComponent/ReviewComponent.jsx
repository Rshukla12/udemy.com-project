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
    const liked = useState(false);
    const disliked = useState(false);

    return (
        <Box sx={{ display: "flex", gap: 2, width: "100%", p: 1 }}>
            <Avatar sx={{ bgcolor: "#1C1D1F" }}>{review.user.name[0].toUpperCase()}</Avatar>
            <Box>
                <Typography variant="h4" sx={{ color: "#1C1D1F" }}>{review.user.name}</Typography>
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
                <Box sx={{ display: "flex", gap: 5 }}>
                    <IconButton
                        variant="outlined"
                        sx={{
                            mt: 2,
                            color: "black",
                            borderRadius: "50%",
                            height: "40px",
                            border: "1px solid #444",
                        }} 
                    >  
                        { liked ? <ThumbUpOffAltIcon /> : <ThumbUpAltIcon />}
                    </IconButton>
                    <IconButton 
                        variant="outlined"
                        sx={{
                            mt: 2,
                            color: "black",
                            borderRadius: "50%",
                            height: "40px",
                            border: "1px solid #444",
                        }}
                    >
                        {disliked ? <ThumbDownOffAltIcon /> : <ThumbDownAltIcon />}
                    </IconButton>
                    <Link to="/" sx={{color: "#67676767", fontSize: "small"}}>Report</Link>
                </Box>
            </Box>
        </Box >
    )
}

export default ReviewComponent;