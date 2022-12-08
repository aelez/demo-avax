import * as React from 'react';
import Pin from 'components/Icons/Pin';
import s from './styles.module.scss';

export default class Marker extends React.PureComponent {
  // static propTypes = {
  //   lat: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  //   lng: PropTypes.number.isRequired, // eslint-disable-line react/no-unused-prop-types
  //   label: PropTypes.node,
  // };

  static defaultProps = {
    label: null,
  };

  render() {
    const { label } = this.props;

    return (
      <div className={s.marker}>
        <section className={s.pinContainer}>
          <Pin type="environment" className={s.icon} />
          <span className={s.label}>{label}</span>
        </section>
      </div>
    );
  }
}
