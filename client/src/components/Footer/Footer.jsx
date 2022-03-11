import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import LanguageIcon from "@mui/icons-material/Language";

const links = [
    ["Udemy Business", "Teach on Udemy", "Get the app", "About us", "Contact us"],
    ["Careers", "Blog", "Help and Support", "Affiliate", "Investors"],
    ["Terms", "Privacy policy", "Cookie settings", "Sitemap", "Accessibility statement"]
];

const StyledLink = ({ text }) => (
    <Link
        sx={{
            textDecoration: "none",
            color: "#d3d3d3",
            "&:hover": {
                textDecoration: "underline",
                cursor: "pointer"
            }
        }}
    >
        {text}
    </Link>
);

const Footer = ({isAuth}) => {
    return (
        <>  
            {
                isAuth ? (
                    <>
                        <Grid container justifyContent="flex-end" sx={{ py: 2.5, px: 4, pr:1, backgroundColor: "#1C1D1F", color: "#d3d3d3" }}>
                            <Grid item lg={8} md={6} xs={12}>
                                <Typography variant="h5" sx={{ mt: 1, textAlign: "left" }}>
                                    Top companies choose Udemy Business to build in-demand career skills.
                                </Typography>
                            </Grid>
                            <Grid item lg={4} md={6} xs={12}>
                                <img alt="Nasdaq" height="44" width="115"
                                    src="https://s.udemycdn.com/partner-logos/v4/nasdaq-light.svg"
                                />
                                <img alt="Volkswagen" height="44" width="44"
                                    src="https://s.udemycdn.com/partner-logos/v4/volkswagen-light.svg"
                                />
                                <img alt="Box" height="44" width="67"
                                    src="https://s.udemycdn.com/partner-logos/v4/box-light.svg"
                                />
                                <img alt="NetApp" height="44" width="115"
                                    src="https://s.udemycdn.com/partner-logos/v4/netapp-light.svg"
                                />
                                <img alt="Eventbrite" height="44" width="115"
                                    src="https://s.udemycdn.com/partner-logos/v4/eventbrite-light.svg"
                                />
                            </Grid>
                        </Grid>
                        <Divider />
                    </>
                ) : <></>
            }
            <Grid container sx={{ py: 2.5, px: 4, pr:1, pt: 4, backgroundColor: "#1C1D1F", color: "#d3d3d3" }}>
                {
                    links.map(linkGrp => (
                        <Grid key={linkGrp[0] + linkGrp[1]} item xs={12} md={6} lg={3}>
                            <Stack sx={{ textAlign: "left" }} spacing={1} >
                                {
                                    linkGrp.map(link => (
                                        <StyledLink
                                            key={link}
                                            text={link}
                                        />
                                    ))
                                }
                            </Stack>
                        </Grid>
                    ))
                }
                <Grid item xs={0} md={0} xl={1}>
                </Grid>
                <Grid item xs={12} md={6} xl={2}>
                    <Button
                        varient="outlined"
                        disableRipple
                        sx={{
                            color: "#f3f3f3",
                            border: "1px solid #f3f3f3",
                            textTransform: "none",
                            fontWeight: "600",
                            borderRadius: "1px",
                            pt: 1,
                            px: 2,
                            ml: 10,
                            height: "40px",
                            minWidth: "100px",
                            "&:hover": {
                                bgcolor: "#131313",
                            },
                        }}
                    >
                        <LanguageIcon sx={{mr: 1}}/> English
                    </Button>
                </Grid>
            </Grid>

            <Grid container sx={{ pt: 2.5, px: 4, pr:1, pb: 15, backgroundColor: "#1C1D1F", color: "#d3d3d3" }}>
                <Grid item xs={3} md={1}
                    sx={{ maxWidth: "6rem" }}
                >
                    <img style={{ width: "100%" }} src="https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg" alt="logo" />
                </Grid>
                <Grid item sm={5} md={9}>
                </Grid>
                <Grid item sm={4} md={2} sx={{ pt: 3, pr: 3, color: "white", textAlign: "right" }}>
                    © 2022 Udemy, Inc.
                </Grid>
            </Grid>
        </>
    )
};

export default Footer;