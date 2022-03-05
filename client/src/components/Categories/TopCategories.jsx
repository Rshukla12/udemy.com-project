import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const CategoryList = [
    {
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-design-v2.jpg",
        title: "Design"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-development-v2.jpg",
        title: "Development"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-marketing-v2.jpg",
        title: "Marketing"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-it-and-software-v2.jpg",
        title: "IT and Software"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-personal-development-v2.jpg",
        title: "Personal Development"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-business-v2.jpg",
        title: "Business"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-photography-v2.jpg",
        title: "Photography"
    },{
        img: "https://s.udemycdn.com/home/top-categories/lohp-category-music-v2.jpg",
        title: "Music"
    }
];


const TopCategories = () => {
    return (
        <Container maxWidth="xl">
            <Box sx={{textAlign: "left", px: 5}}>
                <Typography variant="h4" sx={{pb: 2}}>
                    Top Categories
                </Typography>
                <Grid container>
                    {
                        CategoryList.map( (cat, ind) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={901*ind+1} >
                                <Box sx={{width: "90%", maxWidth: "20rem", overflow: "hidden", cursor: "pointer"}}>
                                    <Box sx={{width:"100%", transition: "all 0.3s", "&:hover": {
                                        transform: "scale(1.1)"
                                    }}} component="img" src={cat.img} alt={cat.title} />
                                </Box>
                                <Typography variant="body1" sx={{textAlign: "left", pb: 5, cursor: "pointer", fontWeight: 600}}>
                                    {cat.title}
                                </Typography>
                            </Grid>
                        ) )
                    }
                </Grid>
            </Box>
        </Container>
    )
};

export default TopCategories; 