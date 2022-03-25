import TextareaAutosize from '@mui/material/TextareaAutosize';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import ContainedBtn from "../Buttons/ContainedBtn";
import { useState } from "react"

const ReviewBox = ({ onSubmit }) => {
    const [ state, setState ] = useState({rating: 0, review: ""});
    const handleChange = ( e ) => {
        setState({...state, [e.target.name] : e.target.value});
    }
    const handleSubmit = () => {
        console.log(12)
        onSubmit(state)
    }
    return (
        <Box 
            sx={{
                width: "90%", 
                p: 3, 
                my: 3,
                border: "1px solid #45454545",
                display: "flex",
                flexDirection: "column",
                gap: 1
            }}>
            <Typography variant="h6" >
                Enter your Review
            </Typography>
            <Rating 
                name="rating"
                value={Number(state.rating)}
                required
                size="large"
                onChange={handleChange}
            />
            <TextareaAutosize
                minRows={5}
                placeholder="write your review"
                style={{ width: "100%" }}
                name="review"
                value={state.review}
                onChange={handleChange}
            />
            <ContainedBtn onClick={handleSubmit} text="Submit"/>
        </Box>
    )
};

export default ReviewBox;
