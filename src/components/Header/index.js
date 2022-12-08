import React from 'react';
import Link from 'gatsby-link';
import Image from 'gatsby-image';
import Navigation from '../Navigation';

import s from './styles.module.scss';

const Header = ({ logo, locations, lang }) => (
  <header className={s.header}>
    <Link to={`/${lang}/`}>{logo ? <Image className={s.logo} sizes={logo.sizes} /> : null}</Link>
    <Navigation locations={locations} burgerClassName={s.burger} lang={lang} />
  </header>
);

export default Header;
