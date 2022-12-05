import * as React from 'react';
import cx from 'classnames';
import Link from 'gatsby-link';
import Helmet from 'react-helmet';
import HoverableImage from 'components/HoverableImage';
import LabeledImage from 'components/LabeledImage';
import withI18n from 'components/I18n';

import s from './styles.module.scss';

const Label = ({ title, text, path }) => (
  <span className={s.content}>
    <h2 className={s.cityLabel}>{title}</h2>
    {text}
    <Link to={path} className={s.button}>
      Explore
    </Link>
  </span>
);

const Location = ({ open, name, img, width, ...rest }) => (
  <div className={cx(s.wrapper, `col-lg-${width}`)}>
    {open ? (
      <LabeledImage className={cx(s.card, s.open)} imageClassName={s.image} label={<Label {...rest} />} img={img} />
    ) : (
      <HoverableImage
        className={s.card}
        imageClassName={s.image}
        label={<h3 className={s.name}>{name}</h3>}
        overlay={<Label {...rest} />}
        img={img}
      />
    )}
  </div>
);

class Locations extends React.Component {
  render() {
    const { images } = this.props;
    const i18n = this.props.i18n.locationsWidget || {};

    return (
      <div className={s.section}>
        <Helmet script={[ { src: "https://apps.elfsight.com/p/platform.js", defer: true } ]} />
        <h1 className={s.title}>{i18n.title}</h1>
        <h3 className={s.subtitle}>{i18n.subtitle}</h3>
        <div className={cx('row', s.posts)}>
          {i18n.items &&
            i18n.items.map(location => <Location key={location.name} img={images[location.image]} {...location} />)}
        </div>
        <div className="elfsight-app-24572c2d-e346-420b-9bb9-2ce792de5c7c" />
      </div>
    );
  }
}

export default withI18n(Locations);
