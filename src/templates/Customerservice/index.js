import * as React from 'react';
import Helmet from 'react-helmet';

import s from './styles.module.scss';

export default class Support extends React.Component {
  render() {
    const { data: text, locale } = this.props.pathContext;

    return (
      <div>
        <Helmet
          title={text.pageTitle}
          meta={[
            { name: 'description', content: text.description },
            {
              name: 'keywords',
              content: text.keywords,
            },
          ]}
        >
          <html lang={locale} />
        </Helmet>,
        <div className={s.container}>
        <iframe
            width="100%"
            frameBorder="0"
            height="900"
            title="Avax Support"
            src="https://help.avaxrent.com/en/"
          />
        </div>
      </div>
    );
  }
}
