import * as React from 'react';
import Image from 'gatsby-image';
import Link from 'components/Link';
import InstagramIcon from 'components/Icons/Instagram';
import FacebookIcon from 'components/Icons/Facebook';
import TwitterIcon from 'components/Icons/Twitter';
import GoogleIcon from 'components/Icons/Google';
import withI18n from 'components/I18n';

import s from './styles.module.scss';

const YEAR = new Date().getFullYear();

const Section = ({ title, links, iconLinks }) => (
  <div className={s.section}>
    <h5 className={s.title}>{title}</h5>
    {links.map(({ name, path, ...rest }, index) => (
      <Link key={`${path}${index}`} to={path} className={s.link} {...rest}>
        {name}
      </Link>
    ))}
    <div className={s.sectionIcons}>{iconLinks}</div>
  </div>
);

const SocialLinks = () => (
  <div className={s.logoSection}>
    <div className={s.icons}>
      <Link to="https://www.instagram.com/avaxrent/" external>
        <InstagramIcon className={s.icon} />
      </Link>
      <Link to="https://www.facebook.com/avaxrentacar/" external>
        <FacebookIcon className={s.icon} />
      </Link>
      <Link to="https://twitter.com/avaxrent" external>
        <TwitterIcon className={s.icon} />
      </Link>
      <Link to="https://g.page/avax-rent-a-car-split?gm" external>
        <GoogleIcon className={s.icon} />
      </Link>
    </div>
  </div>
);

const Contact = ({ logo, iconLinks }) => (
  <div className={s.section}>
    {logo ? <Image className={s.logo} sizes={logo.sizes} /> : null}
    <div className={s.contactIcons}>{iconLinks}</div>
    <h5 className={s.title}>Contact</h5>
    <div>Obala Lazareta 3, 21000 Split</div>
    <div>Call us: +385 95 8235060</div>
    <div>Email: hi@support.avaxrent.com</div>
  </div>
);

const FooterBottom = () => (
  <div className={s.bottom}>
    <div className={s.bottomContent}>
       FUERTE d.o.o. Obala Lazareta 3, 21000 Split I OIB: 71550144918 I Subjekt upisan kod Trgovackog suda u Splitu
       Temeljni kapital: 20.000kn uplaćen u cijelosti. I Registar trgovačkih društava MB: 060395812
    </div>
    <div className={s.copyright}>
      Copyright ⓒ {YEAR} Avax rent a car All rights reserved. Powered by <a href="https://momentum.rent">Rent a car booking software Momentum</a> &{' '}
      <a href="https://appac.us">Mobile and web product development studio Appacus</a>
    </div>
  </div>
);

class Footer extends React.Component {
  render() {
    const { logo, lang } = this.props;
    const i18n = this.props.i18n.footer || {};

    const company = {
      title: i18n.company,
      links: [
        { name: i18n.faq, path: `/${lang}/faq` },
        { name: i18n.blog, path: 'https://blog.avaxrent.com', external: true },
        { name: i18n.about, path: `/${lang}/about/` },
        { name: i18n.affiliate, path: `/${lang}/affiliate` },
        { name: i18n.partners, path: `/${lang}/partners` },
        { name: i18n.customerService, path: `/${lang}/customerservice` },
        { name: i18n.status, path: 'https://status.avaxrent.com', external: true },
      ],
    };

    
    const services = {
      title: i18n.otherServices,
      links: [
        { name: i18n.longTermRental, path: `/${lang}/longtermrental` },
        { name: i18n.carRentalDelivery, path: `/${lang}/carrentaldelivery` },
        { name: i18n.motoRent, path: `/${lang}/rentmotocycle` },
        { name: i18n.transfers, path: `/${lang}/transfers` },
      ],
    };

    const info = {
      title: i18n.legal,
      links: [
        { name: i18n.toc, path: `/${lang}/terms` },
        { name: i18n.insurance, path: `/${lang}/insurance` },
        { name: i18n.privacy, path: `/${lang}/privacy` },
        { name: i18n.complain, path: `/${lang}/complain` },
      ],
    };

    return (
      <div className={s.footer}>
        <div className={s.content}>
          <Contact logo={logo} iconLinks={<SocialLinks />} />
          <Section title={company.title} links={company.links} />
          <Section title={services.title} links={services.links} />
          <Section title={info.title} links={info.links} iconLinks={<SocialLinks />} />
        </div>

        <FooterBottom />
      </div>
    );
  }
}

export default withI18n(Footer);
