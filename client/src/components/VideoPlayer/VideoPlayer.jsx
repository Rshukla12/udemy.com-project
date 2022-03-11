import { useEffect, useState } from 'react';
import * as API from "../../api";
import Modal from "@mui/material/Modal";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "38rem",
    height: "21rem",
    boxShadow: 24,
    zIndex: 10212,
    bgcolor: "#fff",
};

const VideoPlayer = ({ course, open, onClose }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [err, setErr] = useState(null);
    const [video, setVideo] = useState("");
    
    const handleClose = () => {
        onClose();
    }

    useEffect(async () => {
        if ( !open ) return;
        try {
            const { data } = await API.fetchVideo(course._id);
            setVideo(data);
        } catch ( err ) {
            if ( err.toString().indexOf("403") ) {
                setErr("Please purchase this course!");
            } else if ( err.toString().indexOf("404") ) {
                setErr("This course is not available yet!");
            } else {
                setErr(true);
            }
            console.log(err);
        }
        setIsLoading(false);
    }, [open])

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={open}
            onClose={handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <Fade in={open}>
            <Box sx={style}>
                {
                    isLoading ? (
                        <Box 
                            sx={{
                                width: "100%", 
                                minWidth: "20rem", 
                                minHeight: "20rem", 
                                m: "auto", 
                                height: "100%", 
                                display: "flex", 
                                mt: 5,
                                justifyContent: "center"
                            }}
                        >
                            <CircularProgress sx={{minHeight: "15rem", minWidth: "15rem" }}/>
                        </Box>
                    ) : err ? (
                        <Box 
                            sx={{
                                width: "100%", 
                                minWidth: "20rem", 
                                minHeight: "20rem", 
                                m: "auto", 
                                height: "100%", 
                                display: "flex", 
                                mt: 5,
                                justifyContent: "center"
                            }}
                        >
                            <Typography variant="h5" >
                                { 
                                    err === true ? "Oops... Something went wrong, try refreshing!" : err 
                                } 
                            </Typography>
                        </Box>
                    ) : (
                        <>
                            <Typography variant="body1" >
                                { course.course_name }
                            </Typography>
                            <video 
                                width="100%" 
                                controls muted="muted" 
                                autoPlay
                            >
                                <source 
                                    src={`http://localhost:5000/video/watch/${video}`} 
                                    type="video/mp4" 
                                />
                            </video>
                        </>
                        )
                    }
                </Box>
            </Fade>
        </Modal>

    )
};

export default VideoPlayer