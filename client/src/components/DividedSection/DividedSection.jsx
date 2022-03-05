import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import ContainedBtn from "../Buttons/ContainedBtn";
import { useMediaQuery } from "@mui/material";

const DividedSection = ({ img, title, logo=false, body, btnText, btnAction, direction="row" }) => {
    const matches = useMediaQuery('(min-width:800px)');
    return (
        <Container maxWidth="xl" sx={{px: 5, py: 10, textAlign: "left"}}>
            <Stack direction={matches ? direction : "column" } spacing={12} justifyContent="center">
                <Box component="img" src={img} alt={title} />
                <Stack direction="column" justifyContent="center" spacing={2.5} sx={{width: "80%", maxWidth: "30rem" }}>
                    {
                        logo ? (
                            <Box component="img" src={logo} alt={title} sx={{width: "220px"}} />            
                        ) : (
                            <Typography variant="h4">
                                {title}
                            </Typography>
                        )
                    }
                    <Typography variant="body1" sx={{pr: 2}}>
                        {body}
                    </Typography>
                    <ContainedBtn text={btnText} onClick={btnAction} sx={{maxWidth: "fit-content"}}/>
                </Stack>
            </Stack>
        </Container>
    )
};

export default DividedSection;