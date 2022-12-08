import * as React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export default class Hoverable extends React.Component {
  render() {
    const { className, overlayClassName, overlay, children } = this.props;

    return (
      <div className={cx(s.wrapper, className)}>
        {children}
        <div className={cx(s.overlay, overlayClassName)}>{overlay}</div>
      </div>
    );
  }
}
