import React from 'react';
import Typist, { Backspace } from 'react-typist';
import s from 'react-typist/dist/Typist.css';

export default class ReTypist extends React.Component {
  state = { typing: true };

  timeout;

  done = () => {
    this.setState({ typing: false }, () => {
      this.timeout = setTimeout(() => this.setState({ typing: true }), this.props.timeout || 10);
    });
  };

  componentWillUnmount() {
    window.clearTimeout(this.timeout);
  }

  render() {
    const { words, timeout, ...props } = this.props;
    return this.state.typing ? (
      <Typist {...props} onTypingDone={this.done} avgTypingDelay={100}>
        {words.map((phrase, idx) => (
          <span key={idx}>
            <Typist.Delay ms={500} />
            {phrase}
            <Typist.Backspace count={phrase.length} delay={1200} />
          </span>
        ))}
      </Typist>
    ) : null;
  }
}
