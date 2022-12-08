import * as React from 'react';
import cx from 'classnames';
import Link from 'gatsby-link';
import Image from 'gatsby-image';

import s from './styles.module.scss';

export default class ImageCard extends React.Component {
  render() {
    const { title, text, img, className, path } = this.props;

    return (
      <Link to={path} className={cx(s.card, className)}>
        {img ? <Image outerWrapperClassName={s.imageWrapper} className={s.image} sizes={img.sizes} /> : null}
        <div className={s.content}>
          <h2 className={s.title}>{title}</h2>
          {text}
        </div>
      </Link>
    );
  }
}
