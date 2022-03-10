import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CourseCarousel from "./CourseCarousel";
import * as api from '../../api/index.js';

const { useEffect, useState } = require("react");

const PopularCarousel = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [posts, setPost] = useState(null);

    useEffect(async () => {
        setIsLoading(true);
        const {
            data: { data }
        } = await api.fetchPosts(1);
        setPost(data);
        console.log(data);
        setIsLoading(false);
    }, []);

    return (
        <Container maxWidth="xl">
            <Box sx={{ textAlign: "left", py: 2, px: 1, pr: 5 }}>
                <Stack sx={{ px: 3 }}>
                    <Typography variant="h5" sx={{ fontWeight: 600, pl: 4, mb: 0, pb: 0 }}>
                        Students are viewing
                    </Typography>
                    <CourseCarousel courses={posts} isLoading={isLoading} />
                </Stack>
            </Box>
        </Container>
    )
};

export default PopularCarousel;