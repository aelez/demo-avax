import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import About from 'containers/About';
import Cars from 'containers/Cars';
import Locations from 'containers/Locations';
import Blog from 'containers/Blog';
import BackgroundVideo from 'components/BackgroundVideo';
import Typist from 'components/Typist';
import Momentum from 'components/Momentum';
import withI18n from 'components/I18n';
import mobileVideo from 'images/avax-intro-mobile.mp4';
import desktopVideo from 'images/avax-intro.mp4';
import posterVideo from 'images/avax-intro-poster.jpg';
import s from './index.module.scss';

class IndexPage extends React.Component {
  static contextTypes = {
    sharedData: PropTypes.object,
  };

  render() {
    const { data, lang } = this.props;
    const { sharedData } = this.context;
    const { data: localeData } = this.props.pathContext;

    return (
      <div className={s.containerHeroj}>
        <Helmet
          title={`${localeData.introTitle} Split, Zagreb, Dubrovnik, Zadar, Šibenik, Pula, Rijeka, Opatija, Korcula`}
          meta={[
            { name: 'description', content: localeData.intro },
            { name: 'keywords', content: localeData.keywords },
            { name: 'format-detection', content: 'telephone=no' },
          ]}
          script={[
            {
              type: 'application/ld+json',
              innerHTML: `{
              "@context": "http://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://avaxrent.com/",
                  "url": "https://avaxrent.com/${lang}/",
                  "name": "${localeData.introTitle}",
                  "description": "${localeData.intro}",
                  "image": "https://avaxrent.com${sharedData.logoDark.sizes.src}",
                  "telephone": "+385 21 342 364",
                  "priceRange": "$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Obala Lazareta 3",
                    "addressLocality": "Split",
                    "addressRegion": "Croatia",
                    "telephone": "+385 21 342 364",
                    "email": "hi@support.avaxrent.com"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "43.506793",
                    "longitude": "16.440007"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "reviewCount": "254",
                    "ratingValue": "96",
                    "bestRating": "100",
                    "worstRating": "0",
                    "name": "Reviews of Avax Rent a Car"
                  }
                }
              ]
            }`,
            },
          ]}
        />
        <div className={s.heroj}>
          <BackgroundVideo sm={mobileVideo} video={desktopVideo} poster={posterVideo} />
          <div className={s.centerHeroj}>
            <div className={s.titleHeroj}>
              <h1>
                {localeData.title}{' '}
                <Typist
                  className={s.typist}
                  words={['Split', 'Dubrovnik', 'Korčula', 'Pula', 'Zagreb', 'Rijeka', 'Trogir', 'Šibenik']}
                />
              </h1>
              <h4>{localeData.subtitle}</h4>
            </div>
            <Momentum features={{ navigation: false, searchResults: false }} />
          </div>
        </div>

        <About images={data.carImages.results} localeData={localeData} />
        <Cars images={data} />
        <Locations images={data} />
        <Blog images={data} />
      </div>
    );
  }
}

export default withI18n(IndexPage);

export const imagesQuery = graphql`
  query imagesQuery {
    carImages: allImageSharp(filter: { id: { regex: "/car/" } }) {
      results: edges {
        image: node {
          sizes(maxWidth: 480) {
            ...GatsbyImageSharpSizes
          }
        }
      }
    }

    zadar: imageSharp(id: { regex: "/zadar.jpg/" }) {
      sizes(maxWidth: 950) {
        ...GatsbyImageSharpSizes
      }
    }

    sibenik: imageSharp(id: { regex: "/sibenik.jpg/" }) {
      sizes(maxWidth: 950) {
        ...GatsbyImageSharpSizes
      }
    }

    split: imageSharp(id: { regex: "/split.jpg/" }) {
      sizes(maxWidth: 950) {
        ...GatsbyImageSharpSizes
      }
    }

    zagreb: imageSharp(id: { regex: "/zagreb.jpg/" }) {
      sizes(maxWidth: 950) {
        ...GatsbyImageSharpSizes
      }
    }

    dubrovnik: imageSharp(id: { regex: "/dubrovnik.jpg/" }) {
      sizes(maxWidth: 950) {
        ...GatsbyImageSharpSizes
      }
    }

    swift: imageSharp(id: { regex: "/swift.png/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }

    ignis: imageSharp(id: { regex: "/ignis.jpg/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }

    scross: imageSharp(id: { regex: "/scross.jpg/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }

    crossBorderPost: imageSharp(id: { regex: "/map.jpg/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }

    carRentalPost: imageSharp(id: { regex: "/promo.jpg/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }

    insurancePost: imageSharp(id: { regex: "/promo2.jpg/" }) {
      sizes(maxWidth: 1024, maxHeight: 682) {
        ...GatsbyImageSharpSizes
      }
    }
  }
`;
