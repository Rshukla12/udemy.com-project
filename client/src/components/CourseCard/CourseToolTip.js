import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CheckRoundedIcon from '@mui/icons-material/CheckRounded';
import FavoriteBorderRoundedIcon from "@mui//icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import Zoom from '@mui/material/Zoom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress } from '@mui/material';
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist';
import { useHistory } from "react-router-dom";

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


const CourseToolTip = ({ title, tagline, details=[], course, children }) => {
    const matches = useMediaQuery('(min-width:900px)');
    
    if ( course.description?.length > 3 ) {
        if ( tagline.length >= 100 ) tagline = tagline.slice(0, 97) + "...";
        if ( title.length >= 48 ) title = title.slice(0, 44) + "...";
    }
    
    const [state, setState] = React.useState(false);
    const [wish, setWish] = React.useState(false);
    const [bought, setBought] = React.useState(false);
    
    const { isLoading, cart } = useSelector(state=>state.cart);
    const { isLoadingWishlist, wishlist } = useSelector(state=>state.wishlist);
    const { purchased } = useSelector(state=>state.purchased);
    
    const dispatch = useDispatch();
    const history = useHistory();
    
    React.useEffect(()=> {
        let isPurchased = false;
        for ( const c of purchased ){
            if ( course._id === c._id ) isPurchased = true;
        }
        if ( isPurchased ) setBought(true);
    }, []);

    React.useEffect(()=> {
        let a = false;
        for ( const c of cart ){
            if ( course._id === c._id ) a = true;
        }
        if ( a ) setState(true);
        else setState(false);
    }, [cart]);

    React.useEffect(()=> {
        let b = false;
        for ( const c of wishlist ){
            if ( course._id === c._id ) b = true;
        }
        if ( b ) setWish(true);
        else setWish(false);
    }, [wishlist]);

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
                            {   isLoading ? <CircularProgress/> : (
                                    <Button
                                        variant="contained"
                                        onClick={() => bought ? history.push("/purchased") :  state ? dispatch(removeFromCart(course._id)) : dispatch(addToCart(course))}
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
                                            bought ? "Already Bought" :  state ? "Remove From Cart" : "Add to Cart"
                                        }
                                    </Button>
                                )
                            }
                            {   isLoadingWishlist ? <CircularProgress /> : 
                                <IconButton
                                    variant="outlined"
                                    sx={{
                                        mt:2,
                                        color: "black",
                                        borderRadius: "50%",
                                        height: "40px",
                                        border: "1px solid #444",
                                    }}
                                    onClick={ () => wish ? dispatch(removeFromWishlist(course._id)) : dispatch(addToWishlist(course)) }
                                >
                                    { 
                                        wish ?  (
                                            <FavoriteRoundedIcon />
                                        ) : (
                                            <FavoriteBorderRoundedIcon />
                                        )
                                    }
                                </IconButton>
                            }
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
