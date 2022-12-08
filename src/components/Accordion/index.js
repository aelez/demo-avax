import React from 'react';

export Slide from './Slide';

class Accordion extends React.PureComponent {
  state = {
    expanded: 0,
  };

  onToggle = id => e => {
    e.preventDefault();
    this.setState(state => ({ expanded: state.expanded === id ? null : id }));
  };

  render() {
    const { children, ...rest } = this.props;
    const { expanded } = this.state;

    return (
      <div role="tablist" aria-multiselectable="true" {...rest}>
        {React.Children.map(children, (child, index) =>
          React.cloneElement(child, { id: index, onToggle: this.onToggle, expanded: expanded === index, key: index })
        )}
      </div>
    );
  }
}

export default Accordion;
