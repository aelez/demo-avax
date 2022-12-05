import React from 'react';
import Image from 'gatsby-image';
import Carousel from '../../components/Carousel';

import s from './styles.module.scss';

const About = ({ images, localeData }) => (
  <div className={s.about}>
    <div className={s.content}>
      <h1>{localeData.introTitle}</h1>
      <p>{localeData.intro}</p>
    </div>
    <Carousel className={s.carousel} autoplay wrapAround>
      {images.map(({ image }, idx) => (
        <Image
          key={`about-image-${idx}`}
          outerWrapperClassName={s.imageWrapper}
          className={s.image}
          sizes={image.sizes}
        />
      ))}
    </Carousel>
  </div>
);

export default About;
