import { useState } from 'react';

import Modal from "@mui/material/Modal";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: "100%",
    maxWidth: "40rem",
    boxShadow: 24,
};

const VideoPlayer = ({ course, onClose=()=>null }) => {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
        onClose();
    }
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
                    <Typography variant="h5" >
                        { course.title }
                    </Typography>
                    <video id="videoPlayer" width="100%" controls muted="muted" autoPlay>
                        <source src={`http://localhost:5000/video/${course._id}`} type="video/mp4" />
                    </video>
                </Box>
            </Fade>
        </Modal>

    )
};

export default VideoPlayer