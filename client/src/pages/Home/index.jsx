import Stack from "@mui/material/Stack";

import HeroHeader from "../../components/HeroHeader/HeroHeader";
import MidSection from "../../components/FeatureSection/FeatureSection";
import TopCategories from "../../components/Categories/TopCategories";
import FeaturedCategories from "../../components/Categories/FeaturedCategories";
import CategorySelector from "../../components/Categories/CategorySelector";
import TwoSection from "../../components/DividedSection/DividedSection";
import PopularCarousel from "../../components/Carousel/PopularCarousel";

const HomePage = () => {

    return (
        <Stack spacing={4}>
            <HeroHeader />
            <CategorySelector />
            <MidSection />
            <PopularCarousel />
            <TopCategories />
            <FeaturedCategories />
            <TwoSection 
                img="https://s.udemycdn.com/home/non-student-cta/instructor-1x-v3.jpg"
                title="Become an instructor"
                body="Instructors from around the world teach millions of students on Udemy. We provide the tools and skills to teach what you love." 
                btnText="Start Teaching today"
            />
            <MidSection />
            <TwoSection 
                img="https://s.udemycdn.com/home/non-student-cta/ub-1x-v3.jpg"
                body="Get unlimited access to 6,000+ of Udemy’s top courses for your team. Learn and improve skills across business, tech, design, and more." 
                btnText="Get Udemy Business"
                logo="https://www.udemy.com/staticx/udemy/images/v7/logo-ub.svg"
                direction="row-reverse"
            />
            <TwoSection 
                img="https://s.udemycdn.com/home/non-student-cta/transform-1x-v3.jpg"
                body="Learners around the world are launching new careers, advancing in their fields, and enriching their lives."
                title="Transform your life through education"
                btnText="Find out how"
            />
        </Stack>
    )
};

export default HomePage;