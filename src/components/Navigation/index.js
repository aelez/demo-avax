import * as React from 'react';
import cx from 'classnames';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import withRouter from 'react-router-dom/withRouter';
import BurgerMenu from 'components/BurgerMenu';
import withI18n from 'components/I18n';
import Popup from 'components/Popup';
import {
  CroatiaIcon,
  FranceIcon,
  EnglandIcon,
  ItalyIcon,
  GermanyIcon,
  NetherlandsIcon,
  SpainIcon,
} from 'components/Icons/countryFlags';
import ArrowIcon from 'components/Icons/Arrow';
import Language from 'components/Language';
import LocationIcon from 'components/Icons/LocationIcon';
import noop from 'utils/noop';

import s from './styles.module.scss';

// eslint-disable-next-line no-restricted-globals
const domain = (typeof location !== 'undefined' && location.host) || 'avaxrent.com';

const PopupIcon = ({ open }) => <ArrowIcon className={cx(s.popupIcon, { [s.open]: open })} />;

const Location = ({ location }) => (
  <span className={s.location}>
    <LocationIcon className={s.locationIcon} type={location.icon} /> {location.name.en_EN}
  </span>
);

const NavigationList = ({ routes, closeBurger = noop, togglePopup = noop }) => {
  const onLinkClick = () => {
    togglePopup();
    closeBurger();
  };
  return routes.map(
    ({ name, path, children, ...rest }) =>
      children ? (
        <Popup
          key={`nav-${path || name}`}
          openIcon={<PopupIcon />}
          closeIcon={<PopupIcon />}
          label={name}
          className={cx(s.popupWrapper, s.listItem)}
          popupClassName={s.popup}
          labelClassName={s.link}
        >
          {<NavigationList routes={children} closeBurger={closeBurger} />}
        </Popup>
      ) : (
        <div className={s.listItem} key={`nav-${path || name}`}>
          <Link className={s.link} onClick={onLinkClick} to={path} {...rest}>
            {name}
          </Link>
        </div>
      )
  );
};

const replacePathname = (currentPath, newLanguage) => currentPath.replace(/^\/[a-z]{2}\//, `/${newLanguage}/`);

class Navigation extends React.Component {
  componentWillMount() {
    this.allRoutes = this.getRoutes(this.props.locations);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.location !== this.props.location) {
      this.allRoutes = this.getRoutes(this.props.locations);
    }
  }

  getRoutes = locations => {
    const { pathname } = this.props.location;
    const i18n = this.props.i18n.nav || {};
    const { lang } = this.props;
    const cities = new Set(locations.map(({ location }) => location.contact.city));

    const locationRoutes = Array.from(cities).map(city => ({
      name: city,
      locations: locations.filter(({ location }) => location.contact.city === city),
    }));

    return [
      {
        name: i18n.home,
        path: `/${lang}/`,
      },
      {
        name: i18n.locations,
        children: locationRoutes.map(route => ({
          name: route.name,
          children: route.locations.map(({ location }) => ({
            name: <Location location={location} />,
            path: `/${lang}/locations/${location.slug}/`,
          })),
        })),
      },
        {
        name: i18n.terms,
        path: `/${lang}/terms/`,
      },
          {
        name: i18n.support,
        path: `/${lang}/support/`,
      },
      {
        name: i18n.lang,
        children: [
          {
            name: <Language icon={<EnglandIcon />} language="ENG" />,
            path: replacePathname(pathname, 'en'),
          },
          {
            name: <Language icon={<CroatiaIcon />} language="HR" />,
            path: replacePathname(pathname, 'hr'),
          },
          {
            name: <Language icon={<ItalyIcon />} language="ITA" />,
            path: replacePathname(pathname, 'it'),
          },
          {
            name: <Language icon={<FranceIcon />} language="FRA" />,
            path: replacePathname(pathname, 'fr'),
          },
          {
            name: <Language icon={<GermanyIcon />} language="GER" />,
            path: replacePathname(pathname, 'de'),
          },
          {
            name: <Language icon={<NetherlandsIcon />} language="NED" />,
            path: replacePathname(pathname, 'nl'),
          },
          {
            name: <Language icon={<SpainIcon />} language="SPA" />,
            path: replacePathname(pathname, 'es'),
          },
        ],
      },
    ];
  };

  allRoutes = [];

  render() {
    const { burgerClassName } = this.props;
    const { pathname } = this.props.location;

    return (
      <nav className={s.navigation}>
        <Helmet>
          {['en', 'hr', 'es', 'it', 'fr', 'de', 'nl'].map(locale => (
            <link
              rel="alternate"
              key={locale}
              href={`https://${domain}${replacePathname(pathname, locale)}`}
              hrefLang={locale}
            />
          ))}
        </Helmet>
        <div className={s.desktop}>
          <NavigationList routes={this.allRoutes} />
        </div>

        <BurgerMenu buttonClassName={burgerClassName}>
          <NavigationList routes={this.allRoutes} />
        </BurgerMenu>
      </nav>
    );
  }
}

export default withRouter(withI18n(Navigation));
