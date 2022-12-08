import * as React from 'react';
import Helmet from 'react-helmet';
import Img from 'gatsby-image';
import Hero from 'containers/HeroWithSearch';

import s from './styles.module.scss';

const Section = ({ title, children }) => (
  <div>
    {title ? <h2 className={s.sectionTitle}>{title}</h2> : null}
    {children}
  </div>
);

const Subsection = ({ title, children }) => (
  <div>
    {title ? <h5 className={s.subsectionTitle}>{title}</h5> : null}
    {children}
  </div>
);

export default class Terms extends React.Component {
  render() {
    const { data: text, locale } = this.props.pathContext;
    const { data } = this.props;

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
        <Hero title={text.pageTitle} subtitle={text.pageSubTitle} img="complain" />
        <div className={s.container}>
          <div className={s.termsWrapper}>
            <h1 className={s.pageTitle}>{text.pageTitle}</h1>
            <div className={s.intro}>
              <i>{text.intro}</i>
              <div className={s.companyInfo}>{text.companyInfo}</div>
            </div>

            {text.sections.map((section, fidx) => (
              <Section key={fidx} title={section.title}>
                {section.sections.map(({ title, html }, sidx) => (
                  <Subsection key={sidx} title={title}>
                    <div dangerouslySetInnerHTML={{ __html: Array.isArray(html) ? html.join('') : html }} />
                  </Subsection>
                ))}
              </Section>
            ))}

          </div>
          {data.banner ? (
            <Img outerWrapperClassName={s.bannerWrapper} className={s.banner} resolutions={data.banner.resolutions} />
          ) : null}
        </div>
      </div>
    );
  }
}

export const bannerImageQuery = graphql`
  query BannerImageQueryComplain {
    banner: imageSharp(id: { regex: "img/promo_avax.png/" }) {
      resolutions(width: 600, height: 1200) {
        ...GatsbyImageSharpResolutions_withWebp
      }
    }
  }
`;
