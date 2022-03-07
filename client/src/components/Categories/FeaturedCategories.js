import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import OutlinedBtn from "../Buttons/OutlinedBtn";

const categories = [
    ["Development", ["Python", "33,949,254 students"], ["Web Development", "10,689,527 students"], ["Machine Learning", "6,675,420 students"]],
    ["Business", ["Financial Analysis", "1,149,959 students"], ["SQL", "5,369,855 students"], ["PMP", "1,592,223 students"]],
    ["IT and Software", ["AWS Certification", "5,326,527 students"], ["Ethical Hacking", "10,362,817 students"], ["Cyber Security", "3,736,281 students"]],
    ["Design", ["Photoshop", "10,522,599 students"], ["Graphic Design", "3,197,424 students"], ["Drawing", "2,354,580 students"]]
];

const FeaturedCategories = () => {
    return (
        <Container maxWidth="xl" sx={{ bgcolor: "#F7F9FA" }}>
            <Box sx={{ p: 5, mb: 3, textAlign: "left" }}>

                <Typography variant="h4">
                    Featured topics by category
                </Typography>
                <Grid container sx={{pr:10}}>
                    {
                        categories.map((category, index) => (
                            <Grid item xs={12} md={6} lg={3} sx={{ cursor: "pointer", pt: 2 }} key={8912*(index+1)}>
                                <Typography variant="h5">
                                    {category[0]}
                                </Typography>
                                {
                                    category.map((cat, ind) => (
                                        <Box key={(ind + 1) * 873} sx={{mt: 3}}>
                                            {
                                                ind ? (
                                                    <Stack spacing={0.5} >
                                                        <Link sx={{ color: "violetblue", fontWeight: 600 }}>
                                                            {cat[0]}
                                                        </Link>
                                                        <Typography variant="body2" sx={{ color: "gray" }}>
                                                            {cat[1]}
                                                        </Typography>

                                                    </Stack>
                                                ) : <></>
                                            }
                                        </Box>
                                    ))

                                }

                            </Grid>
                        ))
                    }
                    <OutlinedBtn sx={{mt: 7}} text="Explore more Topics"/>

                </Grid>
            </Box>
        </Container>
    )
};

export default FeaturedCategories;