import React from 'react';
import cx from 'classnames';
import s from './styles.module.scss';

class Section extends React.PureComponent {
  render() {
    const { title, children, className, ...rest } = this.props;
    return (
      <section className={cx(s.section, className)} {...rest}>
        {title ? <h3 className={s.title}>{title}</h3> : null}
        {children}
      </section>
    );
  }
}

export default Section;
