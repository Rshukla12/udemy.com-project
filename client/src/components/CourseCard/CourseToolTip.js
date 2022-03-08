import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FavoriteBorderRoundedIcon from "@mui//icons-material/FavoriteBorderRounded";
import Zoom from '@mui/material/Zoom';
import useMediaQuery from '@mui/material/useMediaQuery';

const HtmlTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: 'white',
        color: 'rgba(0, 0, 0, 0.87)',
        width: 360,
        minHeight: 400,
        fontSize: theme.typography.pxToRem(12),
        border: '0.25px solid #55555551',
        borderRadius: 0,
    },
    [`& .${tooltipClasses.arrow}::before`]: {
        color: "white",
        border: '0.25px solid #55555551',
    }
}));


const CourseToolTip = ({ title, tagline, details=[], id, children }) => {
    const matches = useMediaQuery('(min-width:900px)');
    if ( tagline.length >= 100 ) tagline = tagline.slice(0, 97) + "..."
    if ( title.length >= 48 ) title = title.slice(0, 44) + "..."
    
    return (
        <div>
            <HtmlTooltip
                TransitionComponent={Zoom}
                arrow
                placement={matches ? "right" : "top"}
                title={
                    <Stack spacing={2} direction="column" sx={{
                        px: 2,
                        py: 1
                    }}>
                        <Typography variant="h3" color="inherit" sx={{fontWeight: 600, fontSize: "0.99rem"}}>{title}</Typography>
                        <Typography variant="body1" color="inherit" >{tagline}</Typography>
                        <Stack spacing={2} direction="column" >
                            {
                                details.map(( p, ind) => (
                                    <Stack key={ind*321} spacing={1} direction="row">
                                        <CheckRoundedIcon />        
                                        <Typography variant="body1" color="inherit" sx={{fontWeight: 500}}>{p}</Typography>
                                    </Stack>
                                ))
                            }
                        </Stack>
                        <Stack direction="row" spacing={1} >
                            <Button
                                variant="contained"
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
                                Add to Cart
                            </Button>
                            <IconButton
                                variant="outlined"
                                sx={{
                                    mt:2,
                                    color: "black",
                                    borderRadius: "50%",
                                    height: "40px",
                                    border: "1px solid #444",
                                }}
                            >
                                <FavoriteBorderRoundedIcon />                            
                            </IconButton>
                        </Stack>
                    </Stack>
                }
            >
                {children}
            </HtmlTooltip>
        </div>
    );
};

export default CourseToolTip;
