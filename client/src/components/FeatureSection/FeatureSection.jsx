import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StarIcon from '@mui/icons-material/Star';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';

const FeatureList = [
    {
        icon: <PlayArrowIcon fontSize="small" />,
        label: "Learn in-demand skills with over 183,000 video courses"
    },
    {
        icon: <StarIcon fontSize="small" />,
        label: "Choose courses taught by real-world experts"
    },
    {
        icon: <AllInclusiveIcon fontSize="small" />,
        label: "Learn at your own pace, with lifetime access on mobile and desktop"
    },
];

const FeatureSection = () => {
    return (
        <Box sx={{ bgcolor: "#F7F9FA" }}>
            <Grid container maxWidth="xl" sx={{ m: "auto", width: "90%", pl: "5%", pb: 4 }} direction="row" >
                {
                    FeatureList.map((feature, ind) => (
                        <Grid item sm={12} md={4} key={1021 * (ind + 1)} sx={{pt: 4}}>
                            <Stack direction="row" spacing={2}>
                                <Box sx={{
                                    height: "40px",
                                    width: "40px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    borderRadius: "50%",
                                    bgcolor: "darkgray",
                                }}>
                                    {feature.icon}
                                </Box>
                                <Typography variant="body2" sx={{ textAlign: "left", fontWeight: 600, width: "60%" }}>
                                    {feature.label}
                                </Typography>
                            </Stack>
                        </Grid>
                    ))
                }
            </Grid>
        </Box>
    )
};

export default FeatureSection;