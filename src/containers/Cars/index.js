import * as React from 'react';
import withI18n from 'components/I18n';
import ImageCard from 'components/ImageCard';

import s from './styles.module.scss';

class Cars extends React.Component {
  render() {
    const { images } = this.props;
    const i18n = this.props.i18n.recommendations || {};

    return (
      <div className={s.section}>
        <h1 className={s.title}>{i18n.title}</h1>
        <h3 className={s.subtitle}>{i18n.subtitle}</h3>
        <div className={s.posts}>
          {i18n.items && i18n.items.map(({ title, text, img, path = '#' }) => (
            <ImageCard path={path} className={s.card} key={title} img={images[img]} title={title} text={text} />
          ))}
        </div>
      </div>
    );
  }
}

export default withI18n(Cars);
