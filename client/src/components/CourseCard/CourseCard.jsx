import * as React from 'react';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import RatingComponent from './RatingComponent';
import CourseToolTip from "./CourseToolTip";

const CourseCard = ({ course }) => {
    let { img, title, instructor, rating, price, onSale, noOfRatings, tagline, details, id } = course;
    instructor = instructor.join(", ");
    let salePrice = 700;
    const isLogin = true;
    if (isLogin) salePrice = 399;
    const newPrice = (onSale && price > salePrice) ? salePrice : price;
    return (
        <CourseToolTip title={title} tagline={tagline} details={details} id={id}>
            <Card sx={{ width: 250, borderRadius: 0, cursor: "pointer" }} elevation={0} >
                <CardMedia
                    sx={{borderRadius: 0, height: 150}}
                    component="img"
                    image={img}
                    alt={title}
                />
                <CardContent sx={{ height: 110, px: 0, py: 1, textAlign: "left" }}>
                    <Typography gutterBottom variant="body1" component="div" sx={{ fontWeight: 600, mb: 0 }}>
                        {title}
                    </Typography>
                    <Typography variant="subtitle2" color="text.secondary">
                        {instructor}
                    </Typography>
                    <RatingComponent rating={rating} noOfRatings={noOfRatings} />
                    <Stack
                        direction="row"
                        spacing={1.5}
                    >
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            &#8377;{salePrice < price ? salePrice : price}
                        </Typography>
                        { 
                            onSale && ( price !== newPrice ) ? ( 
                                <Typography variant="body1" color="text.secondary" sx={{textDecoration: "line-through"}} >
                                    &#8377;{price}
                                </Typography>
                            ) : <></>
                        }

                    </Stack>
                </CardContent>
                <CardActions>
                    {/* bestSeller */}
                </CardActions>
            </Card>
        </CourseToolTip>
    )
};

export default CourseCard;