import React from 'react';
import cx from 'classnames';
import s from './styles.module.scss';

const TRANSITION_DURATION = 60;

class Slide extends React.PureComponent {
  state = {
    expanding: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.expanded !== this.props.expanded) {
      this.setState({ expanding: true });
      this.expandingTimeout = setTimeout(() => this.setState({ expanding: false }), TRANSITION_DURATION);
    }
  }

  componentWillUnmount() {
    clearTimeout(this.expandingTimeout);
  }

  blockEl;

  render() {
    const { header, children, id, onToggle, expanded } = this.props;
    const { expanding } = this.state;

    return (
      <div className={cx('card', s.slide)}>
        <div className={cx('card-header', s.header, { [s.expandedHeader]: expanded })} role="tab" id={`heading${id}`}>
          <h5 className="mb-0">
            <a
              data-toggle="collapse"
              href={`#collapse${id}`}
              aria-expanded="true"
              aria-controls={`collapse${id}`}
              onClick={onToggle(id)}
              className={s.headerLink}
            >
              {header}
            </a>
          </h5>
        </div>

        <div
          id={`collapse${id}`}
          className={cx({ collapse: !expanding, show: expanded && !expanding, collapsing: expanding })}
          role="tabpanel"
          aria-labelledby={`heading${id}`}
          style={expanding && this.blockEl.scrollHeight ? { height: this.blockEl.scrollHeight } : {}}
        >
          <div
            className={cx('card-block', s.body)}
            ref={el => {
              this.blockEl = el;
            }}
          >
            {children}
          </div>
        </div>
      </div>
    );
  }
}

export default Slide;
