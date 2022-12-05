import * as React from 'react';
import cx from 'classnames';
import { slide as HamburgerMenu } from 'react-burger-menu';

import s from './styles.module.scss';

const BurgerIcon = () => (
  <div className={cx(s.icon)}>
    <span className={s.bar} />
    <span className={s.bar} />
    <span className={s.bar} />
    <span className={s.bar} />
  </div>
);

export default class BurgerMenu extends React.Component {
  state = { isOpen: false };

  onClick = () => {
    this.setState(state => ({ isOpen: !state.isOpen }));
  };

  onStateChange = ({ isOpen }) => {
    this.setState({ isOpen });
  };

  close = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { isOpen } = this.state;
    const { menuClassName, buttonClassName } = this.props;

    return (
      <HamburgerMenu
        className={cx(s.menu, menuClassName)}
        isOpen={isOpen}
        onStateChange={this.onStateChange}
        customBurgerIcon={<BurgerIcon />}
        itemListClassName={s.list}
        burgerButtonClassName={cx(s.button, buttonClassName, {
          [s.open]: isOpen,
        })}
        onClick={this.onClick}
        customCrossIcon={false}
        noOverlay
        right
      >
        {React.cloneElement(this.props.children, { closeBurger: this.close })}
      </HamburgerMenu>
    );
  }
}
