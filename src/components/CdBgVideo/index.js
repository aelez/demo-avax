import React from 'react';
import { vUrl } from 'utils/cloudinary';

/**
 * Cloudinary Background Video
 * @param {String} files Filename on Cloudinary
 * @param {String} params Video params for Cloudinary
 */
export default class CdBgVideo extends React.PureComponent {
  render() {
    const { file, params = '', ...rest } = this.props;
    const stillImage = vUrl`${params}${file}.jpg`;

    return (
      <video
        autoPlay
        loop
        playsInline
        muted
        volume={0}
        poster={stillImage}
        style={{
          backgroundImage: `url(${stillImage})`,
          backgroundSize: 'cover',
          backgroundRepat: 'no-repeat',
          zIndex: 2,
        }}
        {...rest}
      >
        <source src={vUrl`${params}${file}.webm`} type="video/webm" />
        <source src={vUrl`${params}${file}.mp4`} type="video/mp4" />
        <source src={vUrl`${params}${file}.ogv`} type="video/ogg" />
      </video>
    );
  }
}
