import React from 'react';
import Section from 'components/Section';
import withI18n from 'components/I18n';
import Check from 'components/Icons/CheckmarkRound';
import s from './styles.module.scss';

const BenefitsSection = ({ i18n: { benefitsWidget: i18n }}) => (
  <Section title={i18n.title} className={s.section}>
    <div className="row">
      <div className="col-10 offset-1 col-md-8 offset-md-2">
        <ul className={s.cols}>
          {i18n.items && i18n.items.map((benefit, idx) => (
            <li key={idx}>
              <Check />
              <h6>{benefit}</h6>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </Section>
);

export default withI18n(BenefitsSection);
