/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import Image from 'next/image';
import { Box, Button } from '@mui/material';
import { IImage } from '../../api';

import s from './style.module.scss';

type CarouselProps = {
  images: Array<IImage>;
};

const Carousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const slidesCount = images.length;
  const maxLeft = (slidesCount - 1) * 100 * -1;

  const changeSlide = (side: 'left' | 'right') => {
    if (side === 'right') {
      setCurrentSlide((current) => {
        if (current > maxLeft) {
          return current - 100;
        }
        return 0;
      });
    }
    if (side === 'left') {
      setCurrentSlide((current) => {
        if (current < 0) {
          return current + 100;
        }
        return maxLeft;
      });
    }
  };

  return (
    <Box className={s.cariusel_wrapper}>
      <Box className={s.carousel}>
        <Box className={s.slides} style={{ left: `${currentSlide}%` }}>
          {images.map((image) => (
            <div className={s.slide}>
              <Image src={image.image} width={1000} height={500} alt="" />
            </div>
          ))}
        </Box>
        <Box className={s.controls}>
          <Button className={s.control} onClick={() => changeSlide('left')}>
            Left
          </Button>
          <Button className={s.control} onClick={() => changeSlide('right')}>
            Right
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Carousel;
