import React from 'react';
import Link from 'gatsby-link';
import Section from 'components/Section';
import withI18n from 'components/I18n';
import s from './styles.module.scss';

const LocationSection = ({ locations, lang, i18n: { allLocationsWidget: i18n = {} } }) => (
  <Section title={i18n.title}>
    <div className={s.cols}>
      {locations.map(({ location }) => (
        <div key={location.slug}>
          <Link to={`/${lang}/locations/${location.slug}/`}>{location.name.en_EN}</Link>
        </div>
      ))}
    </div>
  </Section>
);

export default withI18n(LocationSection);
