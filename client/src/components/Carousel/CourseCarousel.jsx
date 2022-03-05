import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Box from "@mui/material/Box";
import CourseCard from "../CourseCard/CourseCard";
import Carousel from './Carousel';

const data = [{
  id: "1",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "2",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "3",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "4",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "5",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "6",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "7",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "8",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}, {
  id: "9",
  details: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!Create their own Python Programs Become an experienced Python Programmer Parse the Web and Create their own Games",
  tagline: "Learn A-Z everything about Python, from the basics, to advanced topics like Python GUI, Python Data Analysis, and more!",
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7Lp-eS4p7bdxnQ1aGlstWCO8v8JGHOf4klg&usqp=CAU",
  instructor: ["ramesh", "suresh"],
  noOfRatings: 2,
  rating: 3.4,
  price: 799,
  onSale: true,
  title: "Python 101"
}];


const CourseCarousel = ({ courses = data }) => {
  return (
      <Box sx={{pt: 0, mt: 0}}>
        <Carousel len={courses.length}>
          {
            courses.map(course => (
              <CourseCard key={course.id} course={course} />
            ))
          }
        </Carousel>
      </Box>
  )
};

export default CourseCarousel;