import * as React from 'react';
import PropTypes from 'prop-types';

const withI18n = WrappedComponent =>
  class WithI18n extends React.Component {
    static contextTypes = {
      i18n: PropTypes.object,
      lang: PropTypes.string,
    };

    render() {
      return <WrappedComponent {...this.props} {...this.context} />;
    }
  };

  export default withI18n;