import * as React from 'react';

import s from './styles.module.scss';

const Language = ({ icon, language }) => (
  <span className={s.language}>
    {React.cloneElement(icon, {
      className: s.flagIcon
    })}
    {language}
  </span>
);

export default Language;
