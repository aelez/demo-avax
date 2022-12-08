/* eslint-disable react/no-danger */
import React from 'react';

let stylesStr;
if (process.env.NODE_ENV === 'production') {
  try {
    stylesStr = require('!raw-loader!../public/styles.css'); // eslint-disable-line
  } catch (e) {
    console.log(e); // eslint-disable-line no-console
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css;
    if (process.env.NODE_ENV === 'production') {
      css = <style id="gatsby-inlined-css" dangerouslySetInnerHTML={{ __html: stylesStr }} />;
    }
    return (
      // lang will come automatically
      // eslint-disable-next-line jsx-a11y/html-has-lang
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5.0" />
          <meta httpEquiv="Accept-CH" content="DPR, Viewport-Width, Width" />
          {this.props.headComponents}
          {css}
          <script
            dangerouslySetInnerHTML={{
              __html: `
                window._MOM = {
                  el: 'momentum',
                  key: '${process.env.MOM_KEY}',
                  location: 'pAIJ53LK',
                };

                // load fonts
                WebFontConfig = {
                  google: {
                    families: ['Montserrat:300,400,600', 'Roboto', 'Roboto+Condensed']
                  },
                };
                (function(d) {
                    var wf = d.createElement('script'), s = d.scripts[0];
                    wf.src = 'https://cdnjs.cloudflare.com/ajax/libs/webfont/1.6.28/webfontloader.js';
                    wf.async = true;
                    s.parentNode.insertBefore(wf, s);
                })(document);

                window.$crisp=[];window.CRISP_WEBSITE_ID="088fd74b-327a-4792-a2e3-9d34744f6d00";
                (function(){d=document;s=d.createElement("script");
                s.src="https://client.crisp.chat/l.js";
                s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();
              `,
            }}
          />
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div key="body" id="___gatsby" dangerouslySetInnerHTML={{ __html: this.props.body }} />
          {this.props.postBodyComponents}
        </body>
      </html>
    );
  }
};
