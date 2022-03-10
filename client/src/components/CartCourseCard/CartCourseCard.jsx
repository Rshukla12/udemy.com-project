import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import { useDispatch } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart";
import { useSelector } from "react-redux";
import { addToWishlist } from "../../redux/actions/wishlist";

const data = {
    "_id": "6227782b05039a492845be13",
    "instructors": [
        {
            "_id": "622776f905039a492845be0e",
            "creator": "James Welsh"
        }
    ],
    "img": "https://img-c.udemycdn.com/course/240x135/995016_ebf4_3.jpg",
    "reviews": [],
    "on_discount": false,
    "description": [
        "Build amazing Vue.js Applications - all the Way from Small and Simple Ones up to Large Enterprise-level Ones",
        "Understand the Theory behind Vue.js and use it in Real Projects",
        "Leverage Vue.js in both Multi- and Single-Page-Applications (MPAs and SPAs)"
    ],
    "tags": [
        "web development",
        "aws"
    ],
    "purchased": 129,
    "wishlisted": 40,
    "languages": [
        "English"
    ],
    "course_name": "Vue - The Complete Guide (incl. Router & Composition API)",
    "tagline": "Vue.js is an awesome JavaScript Framework for building Frontend Applications! VueJS mixes the Best of Angular + React!",
    "price": 4999,
    "course_time": 3400,
    "level": "Intermediate",
    "createdAt": "2022-03-08T15:37:15.475Z",
    "updatedAt": "2022-03-08T15:37:15.475Z",
    "views": 211
}

const CartCourseCard = ({ course = data }) => {
    const { isLogin } = useSelector(state=>state.auth);
    
    let { img, course_name, instructors, rating, course_time, price, on_discount, no_of_ratings, tagline, description, _id: id, purchased, wishlisted } = course;
    
    const dispatch = useDispatch();

    let result = "";
    instructors?.forEach((i, ind) => result += (i.name ? i.name : "jon doe") + ", ");
    instructors = result;
    
    let salePrice = 700;
    if (isLogin) salePrice = 399;
    const newPrice = (on_discount && price > salePrice) ? salePrice : price;
    
    return (
        <Stack 
            direction="row" 
            justifyContent="space-between"
            sx={{
                border: "0.25px solid #53535355", 
                p: 1,
                maxWidth: "60rem", 
                width: "100%"
            }}
        >
            <Box component="img" src={img} alt={course_name} sx={{width: "10rem", height: "6rem"}}/>
            <Stack 
                direction="column" 
                spacing={0.1} 
                sx={{
                    textAlign: "left",
                    width: "50%"
                }}
            >
                <Typography variant="body1" textOverflow="ellipsis">
                    { course_name }
                </Typography>
                <Typography variant="subtitle2" textOverflow="ellipsis">
                    By { instructors }
                </Typography>
                <Typography variant="subtitle2" textOverflow="ellipsis">
                    { course_time } total mins
                </Typography>
            </Stack>
            <Stack direction="column" sx={{textAlign: "right", color: "#A435F0A0"}}>
                <Typography 
                    onClick={() => dispatch(removeFromCart(id))}
                    variant="text2" 
                    sx={{"&:hover": { color: "#9122E5", cursor: "pointer" }}}
                >
                    Remove
                </Typography>
                <Typography 
                    onClick={() => {dispatch(addToWishlist(course)) ,dispatch(removeFromCart(id)) }}
                    variant="text1" 
                    sx={{"&:hover": { color: "#9122E5", cursor: "pointer" }}}
                >
                    Save for Later
                </Typography>
            </Stack>
            
            <Stack>
                <Stack direction="row" sx={{color: "#A435F0"}}>
                    <Typography variant="h6">
                        &#x20b9;{ newPrice }
                    </Typography>
                    <LocalOfferIcon sx={{pt: 0.5}}/>
                </Stack>
                {
                    on_discount ? (
                        <Typography variant="body1" sx={{textDecoration: "line-through", pl: 2}}>
                            &#x20b9;{ price }
                        </Typography>   
                    ) : (
                        <></>
                    )
                }
            </Stack>
        </Stack >
    )
};

export default CartCourseCard;