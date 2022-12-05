import * as React from 'react';
import ImageCard from 'components/ImageCard';
import withI18n from 'components/I18n';

import s from './styles.module.scss';

class Blog extends React.Component {
  render() {
    const { images } = this.props;
    const i18n = this.props.i18n.blogWidget || {};

    return (
      <div className={s.section}>
        <h1 className={s.title}>{i18n.title}</h1>
        <h3 className={s.subtitle}>{i18n.subtitle}</h3>
        <div className={s.posts}>
          {i18n.items && i18n.items.map(({ title, text, img }) => (
            <ImageCard path="/" key={title} className={s.card} img={images[img]} title={title} text={text} />
          ))}
        </div>
      </div>
    );
  }
}

export default withI18n(Blog);
