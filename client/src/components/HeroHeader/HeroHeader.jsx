import Container from "@mui/material/Container"
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";
import styles from "./HeroHeader.module.css";

const img = "https://img-c.udemycdn.com/notices/web_banner/slide_1_image_udlite/6f6556d3-99cf-48e5-b130-4b1ce1818c0b.jpg";

const head = "Get there. From here.";
const subHead = "Welcome to the place where success begins. Log in for savings. Ends soon.";

const HeroHeader = ({heading=head, subHeading=subHead, imgSrc=img}) => {
    return (
        <Container maxWidth="xl" sx={{mt: 1}}>
            <Box>
                <img src={imgSrc} className={styles.img} alt={"udemy "+ heading} />
            </Box>
            <Card className={styles.card} elevation={10} >
                <Typography variant="h4">
                    { heading }
                </Typography>
                <Typography variant="body1">
                    { subHeading }
                </Typography>
            </Card>
        </Container>
    )
};

export default HeroHeader;