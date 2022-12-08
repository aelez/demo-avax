import React from 'react';

// Cloudinary sizes
const SZ_LG_H = 'c_lfill,g_auto,h_300,w_900';
const SZ_LG_V = 'c_lfill,g_auto,h_500,w_500';
const SZ_SM_H = 'c_lfill,g_auto,h_200,w_700';
const SZ_SM_V = 'c_lfill,g_auto,h_360,w_360';

const MQ_LG_H = '(min-width: 40em) and (orientation: landscape)';   // large horizontal
const MQ_LG_V = '(min-width: 40em) and (orientation: portrait)';    // large vertical
const MQ_SM_H = '(max-width: 40em) and (orientation: landscape)';   // small horizontal
const MQ_SM_V = 'max-width: 40em) and (orientation: portrait)';     // small vertical

class Picture extends React.PureComponent {
  static defaultProps = {
    getUrl: (strings, params, img) => img,
  };

  render() {
    const { getUrl, img, alt = '', ...rest } = this.props;

    return (
      <picture>
        <source srcSet={getUrl`${SZ_LG_H}${img}.jxr`} type="image/vnd.ms-photo" media={MQ_LG_H}/>
        <source srcSet={getUrl`${SZ_LG_H}${img}.jp2`} type="image/jp2" media={MQ_LG_H} />
        <source srcSet={getUrl`${SZ_LG_H}${img}.webp`} type="image/webp" media={MQ_LG_H} />

        <source srcSet={getUrl`${SZ_LG_V}${img}.jxr`} type="image/vnd.ms-photo" media={MQ_LG_V}/>
        <source srcSet={getUrl`${SZ_LG_V}${img}.jp2`} type="image/jp2" media={MQ_LG_V} />
        <source srcSet={getUrl`${SZ_LG_V}${img}.webp`} type="image/webp" media={MQ_LG_V} />

        <source srcSet={getUrl`${SZ_SM_H}${img}.jxr`} type="image/vnd.ms-photo" media={MQ_SM_H}/>
        <source srcSet={getUrl`${SZ_SM_H}${img}.jp2`} type="image/jp2" media={MQ_SM_H} />
        <source srcSet={getUrl`${SZ_SM_H}${img}.webp`} type="image/webp" media={MQ_SM_H} />

        <source srcSet={getUrl`${SZ_SM_V}${img}.jxr`} type="image/vnd.ms-photo" media={MQ_SM_V}/>
        <source srcSet={getUrl`${SZ_SM_V}${img}.jp2`} type="image/jp2" media={MQ_SM_V} />
        <source srcSet={getUrl`${SZ_SM_V}${img}.webp`} type="image/webp" media={MQ_SM_V} />

        <img srcSet={getUrl`${SZ_LG_H}${img}.jpg`} alt={alt} {...rest} />
      </picture>
    );
  }
}

export default Picture;
