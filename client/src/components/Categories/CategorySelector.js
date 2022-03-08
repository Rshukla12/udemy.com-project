import * as api from '../../api/index.js';
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import CourseCarousel from "../Carousel/CourseCarousel";
import OutlinedBtn from "../Buttons/OutlinedBtn";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import { getPostsBySearch } from "../../redux/actions/posts";

const categoryList = [
  {
    title: "Python",
    heading: "Expand your career opportunities with Python",
    body: "Take one of Udemy’s range of Python courses and learn how to code using this incredibly useful language. Its simple syntax and readability makes Python perfect for Flask, Django, data science, and machine learning. You’ll learn how to build everything from games to sites to apps. Choose from a range of courses that will appeal to...",
  },
  {
    title: "Excel",
    heading: "Analyze and visualize data with Excel",
    body: "Take a Microsoft Excel course from Udemy, and learn how to use this industry-standard software. Real-world experts will show you the basics like how to organize data into sheets, rows and columns, and advanced techniques like creating complex dynamic formulas. Both small businesses and large companies use Excel to turn...",
  },
  {
    title: "Web Development",
    heading: "Build websites and applications with Web Development",
    body: "The world of web development is as wide as the internet itself. Much of our social and vocational lives play out on the internet, which prompts new industries aimed at creating, managing, and debugging the websites and applications that we increasingly rely on.",
  },
  {
    title: "JavaScript",
    heading: "Grow your software development skills with JavaScript",
    body: "JavaScript is a text-based computer programming language used to make dynamic web pages. A must-learn for aspiring web developers or programmers, JavaScript can be used for features like image carousels, displaying countdowns and timers, and playing media on a webpage. With JavaScript online classes, you can learn to build...",
  },
  {
    title: "Data Science",
    heading: "Lead data-driven decisions with Data Science",
    body: "Data science application is an in-demand skill in many industries worldwide — including finance, transportation, education, manufacturing, human resources, and banking. Explore data science courses with Python, statistics, machine learning, and more to grow your knowledge. Get data science training if you’re into research, statistics,...",
  },
  {
    title: "AWS Certification",
    heading: "Become an expert in cloud computing with AWS Certification",
    body: "Prep for your AWS certification with an AWS course on Udemy. Learn the fundamentals of AWS such as working with a serverless platform, the various frameworks, security and more. With these courses, you’ll build the valuable skills you need to implement cloud initiatives — and open up new career opportunities. If you want to...",
  },
  {
    title: "Drawing",
    heading: "Expand your creative skillset with Drawing",
    body: "Want to start drawing for fun or take your craft to the next level? Explore our online drawing classes and learn pencil drawing, figure drawing, cartoon drawing, character drawing for cartoons and anime, illustration, sketching, shading and more. Take an overview course on the fundamentals of drawing...",
  },
];

const CategorySelector = () => {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPost] = useState(null);
  const screenLessThan800 = useMediaQuery("(max-width:800px)");

  useEffect(async () => {
    setIsLoading(true);
    const {
      data
    } = await api.fetchPostsByTag( categoryList[active].title );
    console.log(data)
    setPost(data);
    setIsLoading(false);
    console.log(data)
  }, [active]);

  return (
    <Container maxWidth="xl">
      <Box sx={{ textAlign: "left", py: 2, px: 8 }}>
        <Stack spacing={1.5}>
          <Stack spacing={1.5}>
            <Typography variant="h3">A broad selection of courses</Typography>
            <Typography variant="body1">
              Choose from 183,000 online video courses with new additions
              published every month
            </Typography>
          </Stack>
          <Stack direction={screenLessThan800 ? "column" : "row"} spacing={3}>
            {categoryList.map((cat, ind) => (
              <Typography
                variant="body1"
                key={545 * (ind + 1)}
                sx={{
                  color: ind === active ? "black" : "#838383",
                  fontWeight: 600,
                  cursor: "pointer",
                  "&:hover": {
                    color: "black",
                  },
                }}
                onClick={ind !== active ? () => setActive(ind) : null}
              >
                {cat.title}
              </Typography>
            ))}
          </Stack>
          <Stack sx={{ border: "0.25px solid #53537370" }} spacing={1}>
            <Stack sx={{ px: 4, pt: 4 }}>
              <Typography variant="h4" sx={{ pb: 1 }} overflow="elipsis">
                {categoryList[active].heading}
              </Typography>
              <Typography
                variant="body1"
                sx={{ width: "100%", pb: 2, maxWidth: "55rem" }}
              >
                {categoryList[active].body}
              </Typography>
              <OutlinedBtn
                sx={{ width: "fit-content" }}
                text={"Explore " + categoryList[active].title}
              />
            </Stack>
            <CourseCarousel courses={posts} isLoading={isLoading} />
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default CategorySelector;
