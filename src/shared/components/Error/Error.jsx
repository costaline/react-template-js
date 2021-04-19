import React from 'react';
import T from 'prop-types';

import classes from './error.module.scss';

export const Error = ({ message, details }) => (
  <div className={classes['error']}>
    <span className={classes['error__message']}>{message}</span>
    {details && <pre className={classes['error__details']}>{details}</pre>}
  </div>
);

Error.defaultProps = {
  message: 'Sorry, something went wrong...',
};

Error.propTypes = {
  message: T.string,
  details: T.string,
};
