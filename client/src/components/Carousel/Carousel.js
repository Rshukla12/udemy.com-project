import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useState } from 'react';
import Slider from 'react-slick';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosOutlinedIcon from '@mui/icons-material/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import styles from "./Carousel.module.css";

const Carousel = ({ children, len, size }) => {
  const [sliderRef, setSliderRef] = useState(null);
  const [active, setActive] = useState(0);
  const sliderSettings = {
    slidesToShow: size ? size : 4 > len ? len : 4,
    slidesToScroll: 3 > len ? 1 : 3,
    infinite: false,
    arrows: false,
    speed: 900, // ms
    autoplay: false,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 460,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ],
    beforeChange: (current, next) => setActive(next),
  };

  return (
    <Container maxWidth="xl" sx={{p: 0, m: 0}}>
      <div className='content'>
        <Box sx={{ px: 1 }}>
          {
            active > 0 ? (
              <IconButton className={styles.leftBtn} onClick={sliderRef?.slickPrev} >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
            ) : <div className={styles.leftBtn} style={{ visibility: "hidden" }}></div>
          }
          <Slider sx={{ width: "100%", m: "auto" }} ref={setSliderRef} {...sliderSettings}>
            {children}
          </Slider>
          {
            active < len - 1 ? (
              <IconButton className={styles.rightBtn} onClick={sliderRef?.slickNext}>
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            ) : <></>
          }
        </Box>
      </div>
    </Container>
  )
};

export default Carousel;