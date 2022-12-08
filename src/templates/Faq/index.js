import React from 'react';
import Helmet from 'react-helmet';
import Hero from 'containers/HeroWithSearch';
import Accordion, { Slide } from 'components/Accordion';

class FaqTemplate extends React.Component {
  render() {
    const { data: text, locale } = this.props.pathContext;

    return [
      <Helmet
        key="helmet"
        title={text.pageTitle}
        meta={[
          { name: 'description', content: text.description },
          { name: 'keywords', content: text.keywords },
        ]}
      >
        <html lang={locale} />
      </Helmet>,
      <Hero key="hero" title={text.pageTitle} subtitle={text.pageSubTitle} img="faq" />,
      <Accordion key="accordion">
        {text.faq.map((item, idx) => (
          <Slide header={item.question} key={idx}>
            {item.answer}
          </Slide>
        ))}
      </Accordion>,
    ];
  }
}

export default FaqTemplate;
