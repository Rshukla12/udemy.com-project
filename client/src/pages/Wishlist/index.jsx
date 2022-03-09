import { Container, Typography, Box, CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutlinedBtn from "../../components/Buttons/ContainedBtn";
import CourseCarousel from "../../components/Carousel/CourseCarousel";
import PopularCarousel from "../../components/Carousel/PopularCarousel";
import { fetchWishlist } from "../../redux/actions/wishlist";

const Wishlist = () => {
    const { wishlist, isLoadingWishlist } = useSelector(state => state.wishlist);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchWishlist());
    }, [])

    return (
        <Container maxWidth="xl">
            <Stack sx={{ width: "88%", m: "auto", my: 3 }}>
                {
                    isLoadingWishlist ? (
                        <CircularProgress sx={{ width: "50rem", height: "50rem", m: "auto" }} />
                    ) : (
                        <>
                            <Typography variant="h3" sx={{pl:2.5}}>
                                Wishlist
                            </Typography>
                            <Typography variant="h6" sx={{ pl: 3, textAlign: "left" }}>
                                {wishlist.length} Item in the wishlist
                            </Typography>
                            {
                                wishlist.length !== 0 ? (
                                    <CourseCarousel courses={wishlist} />
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
                                        <Typography variant="body1" sx={{ mt: 3, textAlign: "center" }}>
                                            Your wishlist is empty. Keep shopping to find a course!
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
                        </>
                    )
                }
            </Stack>
            <PopularCarousel />
        </Container>
    )
};

export default Wishlist;