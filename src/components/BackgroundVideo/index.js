/* eslint-disable jsx-a11y/media-has-caption */
import React from 'react';
import cx from 'classnames';
import s from './styles.module.scss';

/**
 * Local Background Video
 * @param {String} sm Small video
 * @param {String} video Large video
 * @param {String} poster Poster
 */
export default class BackgroundVideo extends React.PureComponent {
  render() {
    const { sm, video, poster, className, ...rest } = this.props;

    return (
      <div className={cx(s.container, className)}>
        <video
          autoPlay
          loop
          playsInline
          muted
          volume={0}
          poster={poster}
          style={{ backgroundImage: `url(${poster})` }}
          className={s.video}
          {...rest}
        >
          <source src={video} type="video/mp4" />
          {sm ? <source src={sm} type="video/mp4" media="(max-width:380px)" /> : null}
        </video>
      </div>
    );
  }
}
