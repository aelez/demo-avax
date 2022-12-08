import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import Header from 'components/Header';
import Footer from 'components/Footer';
import { momUrl } from 'utils/mom';
import favicon from 'manifest/favicon.ico';
import './index.scss';
import s from './index.module.scss';

class TemplateWrapper extends React.Component {
  static propTypes = {
    children: PropTypes.func,
  };

  static defaultProps = {
    children: Function.prototype, // noop
  };

  static childContextTypes = {
    sharedData: PropTypes.object,
    i18n: PropTypes.object,
    setLang: PropTypes.func,
    lang: PropTypes.string,
  };

  getChildContext() {
    return {
      sharedData: this.props.data,
      i18n: this.props.layoutContext.i18n || {},
      lang: this.props.layoutContext.lang || 'en',
      setLang: this.setLanguage,
    };
  }

  render() {
    const { data, children } = this.props;
    const { lang = 'en' } = this.props.layoutContext;

    return (
      <div className={s.main}>
        <Helmet
          title="Avax Rent-a-Car"
          meta={[
            { name: 'description', content: 'Avax rent-a-car' },
            {
              name: 'keywords',
              content: 'rent a car, cars hire, avax, car rental',
            },
            { name: 'format-detection', content: 'telephone=no' },
          ]}
        >
          <html lang={lang} />
          <link rel="preload" href={momUrl} as="script" />
          <link rel="shortcut icon" href={favicon} type="image/x-icon" />
          <link rel="icon" href={favicon} type="image/x-icon" />
          {process.env.NODE_ENV === 'production' ? (
            <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
          ) : null}
        </Helmet>

        <Header locations={data.locationsQuery.results} logo={data.logoDark} lang={lang} />
        <article>{children()}</article>
        <Footer logo={data.logoLight} />
      </div>
    );
  }
}

export default TemplateWrapper;

export const locationsAndlogoImageQuery = graphql`
  query LocationsAndLogoImageQuery {
    logoLight: imageSharp(id: { regex: "img/logoLight.png/" }) {
      sizes(maxWidth: 250) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }

    logoDark: imageSharp(id: { regex: "img/logoDark.png/" }) {
      sizes(maxWidth: 250) {
        ...GatsbyImageSharpSizes_tracedSVG
      }
    }

    locationsQuery: allLocations {
      results: edges {
        location: node {
          name {
            en_EN
          }
          contact {
            city
          }
          icon
          slug
        }
      }
    }
  }
`;
