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
        width: 320,
        height: 400,
        fontSize: theme.typography.pxToRem(12),
        border: '0.25px solid #55555551',
        borderRadius: 0,
    },
    [`& .${tooltipClasses.arrow}::before`]: {
        color: "white",
        border: '0.25px solid #55555551',
    }
}));


const CourseToolTip = ({ title, tagline, details, id, children }) => {
    let limit = 45;
    const matches = useMediaQuery('(min-width:900px)');
    const pts = [];
    for ( let i = 0; i < 3; i++ ){
        if ( tagline.length > ( i * limit ) ) 
            pts.push( tagline.slice(i * limit, ( i + 1 ) * limit ) )
    };
    if ( tagline.length >= 200 ) tagline = tagline.slice(1, 197) + "..."
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
                        <Typography variant="h4" color="inherit" sx={{fontWeight: 500}}>{title}</Typography>
                        <Typography variant="body1" color="inherit" >{tagline}</Typography>
                        <Stack spacing={2} direction="column" >
                            {
                                pts.map(( pt, ind) => (
                                    <Stack key={ind*321} spacing={1} direction="row">
                                        <CheckRoundedIcon />        
                                        <Typography variant="body1" color="inherit" sx={{fontWeight: 500}}>{pt}</Typography>
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
