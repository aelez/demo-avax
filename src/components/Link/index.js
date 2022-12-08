import * as React from 'react';
import GatsbyLink from 'gatsby-link';

/**
 * Use Gatsby Link just for internal routing.
 */
const Link = ({ children, to, external, ...rest }) => {
  if (external) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <GatsbyLink to={to} {...rest}>
      {children}
    </GatsbyLink>
  );
};

export default Link;
