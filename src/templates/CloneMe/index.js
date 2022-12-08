import React from 'react';
import Helmet from 'react-helmet';
import Hero from 'containers/HeroWithSearch';

class PageNameHere extends React.Component {
  render() {
    const { data: text, locale } = this.props.pathContext;

    return [
      <Helmet
        key="helmet"
        title={text.pageTitle}
        meta={[
          { name: 'description', content: 'Frequently asked questions for rent a car in Croatia' },
          { name: 'keywords', content: 'car hire, renta car, rent a car, car rental, faq, frequently asked questions' },
        ]}
      >
        <html lang={locale} />
      </Helmet>,
      <Hero key="hero" title={text.heroTitle} subtitle={text.heroSubTitle} img="img-name" />,
      <main key="content">{text.content}</main>,
    ];
  }
}

export default PageNameHere;
