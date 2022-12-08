import * as React from 'react';
import cx from 'classnames';
import Image from 'gatsby-image';

import s from './styles.module.scss';

export default class LabeledImage extends React.Component {
  render() {
    const { label, img, className, imageClassName } = this.props;

    return (
      <div className={className}>
        <Image
          outerWrapperClassName={s.image}
          className={cx(s.image, imageClassName)}
          sizes={img.sizes}
          resolutions={img.resolutions}
        />
        {label}
      </div>
    );
  }
}
