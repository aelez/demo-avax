import React from 'react';
import Momentum from 'components/Momentum';
import Picture from 'components/Picture';
import { imgUrl } from 'utils/cloudinary';
import './styles.scss';

const HeroWithMomentum = ({ title, subtitle, searchCfg = {}, img }) => (
  <div className="avax-mom-hero">
    <div className="avx-herowmom-hero">
      <Picture getUrl={imgUrl} img={`rent-a-car-${img}`} alt={title} className="avx-herowmom-img" />
      <div className="avx-herowmom-centerhero">
        <div className="avx-herowmom-title">
          <h1>{title}</h1>
          <h4>{subtitle}</h4>
        </div>
        <Momentum features={{ navigation: false, searchResults: false }} {...searchCfg} />
      </div>
    </div>
  </div>
);

export default HeroWithMomentum;
