import { Container, Typography, Box, CircularProgress } from "@mui/material";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OutlinedBtn from "../../components/Buttons/ContainedBtn";
import CourseCarousel from "../../components/Carousel/CourseCarousel";
import PopularCarousel from "../../components/Carousel/PopularCarousel";
import { fetchPurchased } from "../../redux/actions/purchase";

const Purchased = () => {
    const { purchased, isLoadingPurchased } = useSelector(state => state.purchased);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchPurchased());
    }, [])

    return (
        <Container maxWidth="xl">
            <Stack sx={{ width: "88%", m: "auto", my: 3 }}>
                {
                    isLoadingPurchased ? (
                        <CircularProgress sx={{ width: "50rem", height: "50rem", m: "auto" }} />
                    ) : (
                        <>
                            <Typography variant="h3" sx={{pl:2.5}}>
                                Purchased
                            </Typography>
                            <Typography variant="h6" sx={{ pl: 3, textAlign: "left" }}>
                                You have purchased {purchased.length} Courses
                            </Typography>
                            {
                                purchased.length !== 0 ? (
                                    <CourseCarousel courses={purchased} />
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
                                            You have no purchased courses!
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

export default Purchased;