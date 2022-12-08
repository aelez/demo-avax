import React from 'react';
import Helmet from 'react-helmet';
import get from 'lodash/get';
import PropTypes from 'prop-types';
import { imgUrl } from 'utils/cloudinary';
import Hero from 'containers/HeroWithSearch';
import LocationsSection from 'containers/LocationsSection';
import BenefitsSection from 'containers/BenefitsSection';
import Accordion, { Slide } from 'components/Accordion';
import Section from 'components/Section';
import Map from 'components/Map';
import Marker from 'components/Map/Marker';
import withI18n from 'components/I18n';

import s from './styles.module.scss';

const Hours = ({ label, opening, closing }) => (
  <React.Fragment>
    <dt>{label}</dt>
    <dd>
      {opening} - {closing}
    </dd>
  </React.Fragment>
);

const Contact = withI18n(({ contact, hours, i18n: { location: i18n } }) => (
  <dl>
    <dt>{i18n.address}</dt>
    <dd>
      <div>{`${contact.address} ${contact.streetNumber}`}</div>
      <div>{`${contact.zip} ${contact.city}, ${contact.country}`}</div>
    </dd>
    <dt>{i18n.phone}</dt>
    <dd>
      <a href={`tel:${contact.phone}`}>{contact.phone}</a>
    </dd>
    <dt>{i18n.email}</dt>
    <dd>
      <a href={`mailto:${contact.email}`}>{contact.email}</a>
    </dd>
    {Array.isArray(hours) && hours.length === 1 && <Hours label={i18n.openingHours} {...hours[0]} />}
    {Array.isArray(hours) &&
      hours.length > 1 && (
        <aside>
          <h3>{i18n.openingHours}</h3>
          {hours.map((item, idx) => <Hours label={item.days} {...item} key={idx} />)}
        </aside>
      )}
  </dl>
));

const Faq = withI18n(({ i18n: { location: i18n } }) => (
  <Accordion>
    {i18n.faq &&
      i18n.faq.map(({ question, answer }, idx) => (
        <Slide key={idx} header={question}>
          {answer}
        </Slide>
      ))}
  </Accordion>
));

class LocationTemplate extends React.Component {
  static contextTypes = {
    sharedData: PropTypes.object,
  };

  render() {
    const { name, id, description, contact, slug, smart_hours, hours } = this.props.pathContext;
    const { data, lang } = this.props;
    const { sharedData } = this.context;
    const i18n = this.props.i18n.location;

    return (
      <div>
        <Helmet
          title={`${i18n.title} ${name.en_EN}`}
          meta={[
            { name: 'description', content: get(description, lang, '') },
            {
              name: 'keywords',
              content: `rent a car ${name.en_EN}, cars hire ${name.en_EN}, avax ${name.en_EN}, car rental ${
                name.en_EN
              }`,
            },
            { name: 'format-detection', content: 'telephone=no' },
          ]}
          script={[
            { src: "https://apps.elfsight.com/p/platform.js", defer: true },
            {
              type: 'application/ld+json',
              innerHTML: `{
              "@context": "http://schema.org",
              "@graph": [
                {
                  "@type": "LocalBusiness",
                  "@id": "https://avaxrent.com/",
                  "url": "https://avaxrent.com/locations/${slug}",
                  "name": "Avax Rent a Car ${name.en_EN}",
                  "description": "${get(description, lang, '')}",
                  "image": "https://avaxrent.com${sharedData.logoDark.sizes.src}",
                  "telephone": "${contact.phone}",
                  "priceRange": "$",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "${contact.address} ${contact.streetNumber}",
                    "addressLocality": "${contact.city}",
                    "addressRegion": "${contact.country}",
                    "telephone": "${contact.phone}",
                    "email": "${contact.email}"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": "${contact.lat}",
                    "longitude": "${contact.lng}"
                  }
                },
                {
                  "@type": "AutoRental",
                  "url": "https://avaxrent.com/locations/${slug}",
                  "name": "Avax Rent a Car ${name.en_EN}",
                  "openingHours": [${Array.isArray(hours) ? hours
                    .map(({ day, workingFrom, workingTo }) => `"${day.slice(0, 2)} ${workingFrom}-${workingTo}"`)
                    .join(',') : '""'}],
                  "paymentAccepted": "Cash, All major credit cards",
                  "priceRange": "$",
                  "currenciesAccepted": "EUR, HRK",
                  "image": "${imgUrl`${'c_lfill,g_auto,h_200,w_500'}${`rent-a-car-${slug}`}.jpg`}",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "${contact.address} ${contact.streetNumber}",
                    "addressLocality": "${contact.city}",
                    "addressRegion": "${contact.country}",
                    "telephone": "${contact.phone}",
                    "email": "${contact.email}"
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
        <Hero
          title={`${i18n.title} ${name.en_EN}`}
          subtitle={`${name.en_EN} ${i18n.subtitle}`}
          searchCfg={{ location: id }}
          img={slug}
        />
        <article className={s.content}>
          <div className="row">
            <div className="col-10 offset-1 col-md-8 offset-md-2">
              <div className="row">
                <div className="col-lg-4">
                  <h2 className="caps">{name.en_EN}</h2>
                  <Contact contact={contact} hours={smart_hours} />
                </div>
                <div className="col-lg-8">
                  <h3>{`${i18n.title} ${name.en_EN}`}</h3>
                  {get(description, lang, '')}
                </div>
              </div>

              <div className={get(description, 'elfsight', 'elfsight-app-24572c2d-e346-420b-9bb9-2ce792de5c7c')} />

              {contact.lat && contact.lng ? (
                <Section>
                  <Map zoom={14} center={{ ...contact }} className={s.map}>
                    <Marker lat={contact.lat} lng={contact.lng} label={`Avax ${name.en_EN}`} />
                  </Map>
                </Section>
              ) : null}
              <Section title={i18n.faqTitle}>
                <Faq />
              </Section>
            </div>
          </div>
          <BenefitsSection />
          <div className="row">
            <div className="col-10 offset-1 col-md-8 offset-md-2">
              <LocationsSection locations={data.locations.results} />
            </div>
          </div>
        </article>
      </div>
    );
  }
}

export default withI18n(LocationTemplate);

export const locationsSectionQuery = graphql`
  query LocationsSectionQuery {
    locations: allLocations {
      results: edges {
        location: node {
          name {
            en_EN
          }
          slug
          id
        }
      }
    }
  }
`;
