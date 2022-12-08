import React from 'react';
import { navigateTo } from 'gatsby-link';
import withI18n from 'components/I18n';
import { momUrl } from 'utils/mom';
import Placeholder from './Placeholder';
import './styles.scss';

const momentum = (el) => {
  if (typeof window._MOM.momentum === 'function') {
    window._MOM.momentum(el);
  }
};

/**
 * Cloudinary Background Video
 * @param {String} files Filename on Cloudinary
 * @param {String} params Video params for Cloudinary
 */
class Momentum extends React.PureComponent {
  componentDidMount() {
    window._MOM = Object.assign({}, window._MOM, {
      el: 'momentum',
      elRef: this.el,
      key: process.env.MOM_KEY,
      resultsRoute: `/${this.props.lang}/results/`,
      termsRoute: `/${this.props.lang}/terms`,
      manageBookingRoute: `/${this.props.lang}/booking`,
      push: navigateTo,
      // Default location id: Split center
      location: 'pAIJ53LK',
      ...this.props,
      features: this.props.features || null,
    });

    // IE doesn't support Intl (doh!)
    if (!window.Intl) {
      require.ensure(
        ['intl', 'intl/locale-data/jsonp/en.js'],
        require => {
          require('intl');
          require('intl/locale-data/jsonp/en.js');
          this.runMomentum();
        },
        'intl'
      );
    } else {
      this.runMomentum();
    }
  }

  runMomentum = () => {
    // inject script
    const mom = document.createElement('script');
    mom.type = 'text/javascript';
    mom.async = true;
    mom.src = momUrl;
    const s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(mom, s);

    // call if script already there
    momentum(this.el);
  };

  render() {
    return (
      <div
        ref={el => {
          this.el = el;
        }}
        id="momentum"
      >
        <Placeholder />
      </div>
    );
  }
}

export default withI18n(Momentum);
