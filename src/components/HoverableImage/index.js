import * as React from 'react';
import cx from 'classnames';
import Image from 'gatsby-image';
import Hoverable from 'components/Hoverable';

import s from './styles.module.scss';

export default class HoverableImage extends React.Component {
  render() {
    const { img, overlay, className, imageClassName, label } = this.props;

    return (
      <Hoverable className={cx(s.wrapper, className)} overlay={overlay}>
        {React.cloneElement(label, {
          className: cx(s.label, label.props.className)
        })}
        {img ? (
          <Image
            outerWrapperClassName={s.image}
            className={cx(s.image, imageClassName)}
            sizes={img.sizes}
            resolutions={img.resolutions}
          />
        ) : null}
      </Hoverable>
    );
  }
}
