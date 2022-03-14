import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import StarIcon from '@mui/icons-material/Star';
import { Link } from "react-router-dom";

const CoursePageNavbar = ({title, rating, no_of_rating, purchased}) => {
    return (
        <Container 
            maxWidth="xl"
            sx={{
                position:"fixed",
                top: 0,
                bgcolor: "#1C1D1F",
                zIndex: 100 ,
                py: 1,
            }}
        >
            <Typography variant="h5" sx={{color: "white"}}>
                { title }
            </Typography>
            <Stack direction="row" spacing={2}>
                <Stack direction="row">
                    <Typography variant="body1" sx={{color: "yellow"}}>
                        { rating }
                    </Typography>
                    <StarIcon fontSize="small" sx={{color: "yellow", mt: 0.1}}/>
                </Stack>
                <Link to="/" style={{color: "#8A2BE2"}}>
                    ({ no_of_rating } ratings)
                </Link>
                <Typography variant="body1" sx={{color: "white"}}>
                    { purchased } students
                </Typography>
            </Stack>
        </Container>
    )
};

export default CoursePageNavbar;