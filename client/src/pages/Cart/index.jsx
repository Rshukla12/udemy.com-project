import { Container, Typography, Box, CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import OutlinedBtn from "../../components/Buttons/ContainedBtn";
import PopularCarousel from "../../components/Carousel/PopularCarousel";
import CartCourseCard from "../../components/CartCourseCard/CartCourseCard";
import { fetchCart } from "../../redux/actions/cart";

const Cart = () => {
    const { isLogin } = useSelector(state => state.auth);
    const { cart, total, isLoading } = useSelector(state => state.cart);
    const [org, setOrg] = useState(total);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        let t = 0;
        cart?.forEach(c => t += c.price);
        setOrg(t);
    }, [cart])

    useEffect(() => {
        dispatch(fetchCart())
    }, [])

    return (
        <Container maxWidth="xl">
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
                ) : (
                    <>
                        <Stack spacing={10} sx={{ width: "88%", m: "auto", my: 3 }}>
                            <Stack sx={{ width: "100%" }}>
                                <Typography variant="h3">
                                    Shopping Cart
                                </Typography>
                                <Typography variant="h6" sx={{ pl: 0.5, textAlign: "left" }}>
                                    {cart.length} Item in the cart
                                </Typography>
                                {
                                    cart.length !== 0 ? (
                                        <Stack direction="row" justifyContent="space-between" >
                                            <Stack spacing={2} sx={{ width: "65%" }}>
                                                {
                                                    cart.map(c => (
                                                        <CartCourseCard course={c} key={c._id} />
                                                    ))
                                                }
                                            </Stack>
                                            <Stack sx={{ width: { md: "27%", sm: "50%" } }}>
                                                <Typography variant="body1">Total: </Typography>
                                                <Typography variant="h3">&#8377;{total}</Typography>
                                                {
                                                    org !== total && (
                                                        <Typography
                                                            color="text.secondary"
                                                            variant="h6"
                                                            sx={{ textDecoration: "line-through" }}
                                                        >
                                                            &#8377;{org}
                                                        </Typography>
                                                    )
                                                }
                                                <Typography variant="h6" 
                                                    sx={{ 
                                                        fontWeight: "600" 
                                                    }}
                                                >
                                                    Promotions
                                                </Typography>

                                                <OutlinedBtn
                                                    component={Link} 
                                                    to={isLogin ? "/checkout" : "/auth"} 
                                                    sx={{
                                                        bgcolor: "#A435E0",
                                                        borderColor: "#A435E0",
                                                        textTransform: "capital",
                                                        height: "3rem",
                                                        fontSize: "1.05rem",
                                                        "&:hover": {
                                                            bgcolor: "#A435F0"
                                                        }
                                                    }} 
                                                    text="checkout" 
                                                />
                                            </Stack>
                                        </Stack>
                                    ) : (
                                        <Stack sx={{
                                            alignItems: "center",
                                            width: "100%",
                                            border: "0.25px solid gray",
                                            py: 3
                                        }}>
                                            <Box 
                                                component="img" 
                                                src="https://s.udemycdn.com/browse_components/flyout/empty-shopping-cart-v2.jpg" 
                                                sx={{ 
                                                    width: "14rem", heigth: "10rem", m: "auto" 
                                                }}     
                                            />
                                            <Typography variant="body1" 
                                                sx={{ mt: 3, textAlign: "center" }}
                                            >
                                                Your cart is empty. Keep shopping to find a course!
                                            </Typography>
                                            <OutlinedBtn sx={{
                                                bgcolor: "#A435F0", borderColor: "#A435E0"
                                                , mt: 3, maxWidth: "10rem", mx: "auto",
                                                "&:hover": {
                                                    bgcolor: "#A435F0"
                                                }
                                            }} text="Keep shopping" />
                                        </Stack>
                                    )
                                }
                            </Stack>
                        </Stack>
                        <PopularCarousel />
                    </>
                )
            }
        </Container>
    )
};

export default Cart;