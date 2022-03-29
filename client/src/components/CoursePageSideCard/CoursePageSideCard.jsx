import * as React from "react";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import AllInclusiveOutlinedIcon from '@mui/icons-material/AllInclusiveOutlined';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined';
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import { CircularProgress } from '@mui/material';
import { addToCart, removeFromCart } from '../../redux/actions/cart';
import { addToWishlist, removeFromWishlist } from '../../redux/actions/wishlist';
import OutlinedBtn from "../Buttons/OutlinedBtn"

const menuList = [
    {
        icon: <OndemandVideoIcon fontSize="small" />,
        text: "24 hours on-demand video"
    },
    {
        icon: <SystemUpdateAltOutlinedIcon fontSize="small" />,
        text: "1 downloadable resource"
    },
    {
        icon: <AllInclusiveOutlinedIcon fontSize="small" />,
        text: "Full lifetime access"
    },
    {
        icon: <SmartphoneIcon fontSize="small" />,
        text: "Access on mobile and TV"
    },
    {
        icon: <EmojiEventsOutlinedIcon fontSize="small" />,
        text: "Certificate of completion"
    }
];

const CoursePageSideCard = ({ course, onPlay }) => {
    const { isLogin } = useSelector((state) => state.auth);

    let {
        img,
        course_name,
        price,
        on_discount,
        _id: id
    } = course;

    let salePrice = 700;
    if (isLogin) salePrice = 399;
    const newPrice = on_discount && price > salePrice ? salePrice : price;
    
    const [state, setState] = React.useState(false);
    const [wish, setWish] = React.useState(false);
    const [bought, setBought] = React.useState(false);

    const { isLoading, cart } = useSelector(state => state.cart);
    const { isLoadingWishlist, wishlist } = useSelector(state => state.wishlist);
    const { purchased } = useSelector(state => state.purchased);

    const dispatch = useDispatch();
    const history = useHistory();

    React.useEffect(() => {
        let isPurchased = false;
        for (const c of purchased) {
            if (course._id === c._id) isPurchased = true;
        }
        if (isPurchased) setBought(true);
    }, []);

    React.useEffect(() => {
        let a = false;
        for (const c of cart) {
            if (course._id === c._id) a = true;
        }
        if (a) setState(true);
        else setState(false);
    }, [cart]);

    React.useEffect(() => {
        let b = false;
        for (const c of wishlist) {
            if (course._id === c._id) b = true;
        }
        if (b) setWish(true);
        else setWish(false);
    }, [wishlist]);


    return (

        <Card
            sx={{ 
                width: 350, 
                borderRadius: 0, 
                position:"absolute",
                // position: "fixed",
                right: 80,
                top: 80,
                zIndex: 1 
            }}
            elevation={10}
        >
            <CardMedia
                sx={{ borderRadius: 0, height: 180, width: "99%", py: 0.1, m: "auto" }}
                component="img"
                image={img}
                alt={course_name}
            />
            <Box 
                sx={{ 
                    position: "absolute", 
                    top: "0rem", 
                    height: 160, 
                    width: "100%", 
                    bgcolor: "#21212121", 
                    display: "flex", 
                    alignItems: "center", 
                    justifyContent: "center",
                    cursor: "pointer"
                }}
                onClick={onPlay}
            >
                <Box sx={{ width: "4rem", height: "4rem", borderRadius: "50%", bgcolor: "#fff" }}>
                    <PlayArrowIcon sx={{mt: "5%", width: "100%", height: "90%"}} />
                </Box>
            </Box>

            <CardContent sx={{ 
                height: "fit-content", 
                p: 2,  
                pb: 1,
                textAlign: "left",
                display: "flex",
                flexDirection: "column",
                gap: 1 
            }}>
                {
                    !bought && (
                        <Stack direction="row" spacing={1.5}>
                            <Typography variant="h5" sx={{ fontWeight: 600 }}>
                                &#8377;{salePrice < price ? salePrice : price}
                            </Typography>
                            {on_discount && price !== newPrice ? (
                                <Typography
                                    variant="body1"
                                    color="text.secondary"
                                    sx={{ pt: 0.5, textDecoration: "line-through" }}
                                >
                                    &#8377;{price}
                                </Typography>
                            ) : (
                                <></>
                            )}
                        </Stack>
                    )
                }
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    {
                        isLoading ? (
                            <Box
                                sx={{
                                    height: "50px",
                                    minWidth: "200px"
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <Button
                                variant="contained"
                                onClick={() => bought ? onPlay() : state ? history.push("/cart") : dispatch(addToCart(course))}
                                disableRipple
                                sx={{
                                    textTransform: "none",
                                    bgcolor: "#A435F0",
                                    color: "white",
                                    borderRadius: "0px",
                                    height: "50px",
                                    minWidth: "250px",
                                    fontSize: "1.1rem",
                                    "&:hover": {
                                        color: "white",
                                        bgcolor: "blueviolet",
                                    },
                                }}
                            >
                                {
                                    bought ? "View Video" : state ? "Go to Cart" : "Add to Cart"
                                }
                            </Button>
                        )
                    }
                    {
                        isLoadingWishlist ? (
                            <Box
                                sx={{
                                    color: "black",
                                    height: "47px",
                                    width: "46px",
                                    border: "1px solid #444",
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : (
                            <IconButton
                                variant="outlined"
                                sx={{
                                    width: "50px",
                                    color: "black",
                                    height: "50px",
                                    borderRadius: 0,
                                    border: "1px solid #444",
                                }}
                                onClick={() => wish ? dispatch(removeFromWishlist(course._id)) : dispatch(addToWishlist(course))}
                            >
                                {
                                    wish ? (
                                        <FavoriteRoundedIcon />
                                    ) : (
                                        <FavoriteBorderRoundedIcon />
                                    )
                                }
                            </IconButton>
                        )
                    }
                </Box>
                {
                    !bought && (
                        <Typography variant="subtitle2" color="text.secondary" sx={{width: "100%", textAlign: "center"}}>
                            30-Day Money-Back Guarantee
                        </Typography>                 
                    )
                }

                <Stack>
                    <Typography variant="body1" sx={{width: "100%", fontWeight: "bold"}}>
                        This course includes: 
                    </Typography>
                    <Stack spacing={1}>
                        {
                            menuList.map( (el, ind) => (
                                <Box key={(ind+1*221)} fullWidth sx={{display: "flex", gap: 1}}>
                                    {el.icon}
                                    <Typography variant="body1" color="text.secondary">
                                        {el.text} 
                                        </Typography> 
                                </Box>
                            ))
                        }
                    </Stack>
                </Stack>
            </CardContent>
            <Divider fullWidth />
            <CardActions 
                sx={{
                    display: "flex", 
                    flexDirection: "column",
                    p: 2
                }}
            >
                <Typography variant="h6" sx={{ fontWeight: 500, textAlign: "left" }}>
                    Training 5 or more people?
                </Typography>
                <Typography
                    variant="caption"
                    color="text.secondary"
                >
                    Get your team access to 6,000+ top Udemy courses anytime, anywhere.
                </Typography>
                <OutlinedBtn
                    fullWidth
                    sx={{ 
                        borderRadius: 0,
                        height: 50,
                        color: "black",
                        fontSize: "1.1rem"
                    }}
                    text="Try Udemy Business"
                />
            </CardActions>
        </Card>
    );
};

export default CoursePageSideCard;