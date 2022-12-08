import React from 'react';
import ContentLoader from 'react-content-loader';

import s from './styles.module.scss';

const ItemLoader = () => (
  <ContentLoader height={240} width={325} speed={2} primaryColor="#f3f3f3" secondaryColor="#ecebeb">
    <rect x="10" y="10" rx="4" ry="5" width="150" height="45" />
    <rect x="170" y="10" rx="4" ry="5" width="150" height="45" />
    <rect x="10" y="65" rx="4" ry="5" width="310" height="45" />
    <rect x="10" y="120" rx="4" ry="5" width="150" height="45" />
    <rect x="170" y="120" rx="4" ry="5" width="150" height="45" />
    <rect x="65" y="190" rx="4" ry="5" width="200" height="40" />
  </ContentLoader>
);

const InsuranceLoadingIndicator = () => (
  <div className={s.loadingIndicator}>
    <ItemLoader />
  </div>
);

export default InsuranceLoadingIndicator;
