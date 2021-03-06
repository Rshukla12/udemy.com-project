import * as React from "react";
import Card from "@mui/material/Card";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import RatingComponent from "./RatingComponent";
import CourseToolTip from "./CourseToolTip";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

const CourseCard = ({ course }) => {
  const { isLogin } = useSelector((state) => state.auth);

  let {
    img,
    course_name,
    instructors,
    ratings,
    price,
    on_discount,
    no_of_ratings,
    tagline,
    description,
    _id: id,
    views,
    purchased,
    wishlisted,
  } = course;

  no_of_ratings = no_of_ratings ?? Math.round( ( ( views * 0.2 ) + ( purchased * 0.3 ) ) / 10 );

  let result = "";
  instructors?.forEach(
    (i, ind) => (result += (i.creator ? i.creator : "jon doe") + ", ")
  );
  instructors = result.slice(0, result.length - 2 );

  let salePrice = 700;
  if (isLogin) salePrice = 399;
  const newPrice = on_discount && price > salePrice ? salePrice : price;

  const history = useHistory();

  return (
    <>
      <CourseToolTip
        title={course_name}
        course={course}
        tagline={tagline}
        details={description}
        id={id}
      >
        <Card
          onClick={()=>history.push("/course/"+id)}
          sx={{ width: 250, borderRadius: 0, cursor: "pointer" }}
          elevation={0}
        >
          <CardMedia
            sx={{ borderRadius: 0, height: 150 }}
            component="img"
            image={img}
            alt={course_name}
          />
          <CardContent sx={{ height: 110, px: 0, py: 1, textAlign: "left" }}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              sx={{ fontWeight: 600, mb: 0 }}
            >
              {course_name}
            </Typography>
            <Typography variant="subtitle2" color="text.secondary">
              {instructors}
            </Typography>
            <RatingComponent rating={ratings} noOfRatings={no_of_ratings} />
            <Stack direction="row" spacing={1.5}>
              <Typography variant="body1" sx={{ fontWeight: 600 }}>
                &#8377;{salePrice < price ? salePrice : price}
              </Typography>
              {on_discount && price !== newPrice ? (
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ textDecoration: "line-through" }}
                >
                  &#8377;{price}
                </Typography>
              ) : (
                <></>
              )}
            </Stack>
          </CardContent>
          <CardActions>{/* bestSeller */}</CardActions>
        </Card>
      </CourseToolTip>
    </>
  );
};

export default CourseCard;
