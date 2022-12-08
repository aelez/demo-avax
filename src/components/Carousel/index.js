import React from 'react';
import cx from 'classnames';
import NukaCarousel from 'nuka-carousel';

import s from './styles.module.scss';

const Dots = ({ currentSlide, slideCount, goToSlide }) => (
  <div className={s.goTos}>
    {Array.from(Array(slideCount)).map((_, idx) => (
      <button
        key={`carousel-dot-${idx}`}
        onClick={() => goToSlide(idx)}
        className={cx(s.goTo, {
          [s.selected]: idx === currentSlide
        })}
      />
    ))}
  </div>
);

export default class Carousel extends React.Component {
  render() {
    const { autoplay, wrapAround, className, children } = this.props;

    return (
      <div className={cx(s.wrapper, className)}>
        <NukaCarousel
          wrapAround={wrapAround}
          autoplay={autoplay}
          decorators={[{ component: Dots, position: 'BottomCenter' }]}
          width="100%"
        >
          {children}
        </NukaCarousel>
      </div>
    );
  }
}
