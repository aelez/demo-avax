import * as React from 'react';
import cx from 'classnames';

import s from './styles.module.scss';

export default class Popup extends React.Component {
  popupEl;

  state = {
    open: false,
  };

  componentDidMount() {
    document.addEventListener('click', this.onOutsideClick, false);
  }

  componentWillUnmount() {
    // prevent undefined exception when doing server prerendering
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', this.onOutsideClick, false);
    }
  }

  onClick = () => {
    this.setState(state => ({ open: !state.open }));
  };

  onOutsideClick = e => {
    e.stopPropagation();

    if (this.popupEl && !this.popupEl.contains(e.target) && this.state.open) {
      this.setState({ open: false });
    }
  };

  render() {
    const {
      /**
       * Position is always beneath the label
       * and the prop currently aligns popup.
       * This can be tweaked in the future
       * to allow positioning around label.
       * Otherwise position can be custom through popupClassName.
       */
      position = 'bottom',
      label,
      children,
      className,
      popupClassName,
      labelClassName,
      openIcon = '▲',
      closeIcon = '▼',
    } = this.props;
    const { open } = this.state;

    return (
      <div
        ref={el => {
          this.popupEl = el;
        }}
        className={cx(s.wrapper, className)}
      >
        <button className={cx(s.label, labelClassName)} onClick={this.onClick}>
          {label}
          <span className={s.caret}>
            {open
              ? React.cloneElement(openIcon, {
                  open,
                })
              : closeIcon}
          </span>
        </button>
        {open ? (
          <div
            className={cx(
              s.popup,
              {
                [s.bottom]: position === 'bottom',
                [s.right]: position === 'right',
              },
              popupClassName
            )}
          >
            {React.cloneElement(children, {
              togglePopup: this.onClick,
            })}
          </div>
        ) : null}
      </div>
    );
  }
}
