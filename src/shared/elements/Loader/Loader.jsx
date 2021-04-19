import React from 'react';

import classes from './loader.module.scss';

export const Loader = () => {
  return (
    <div className={classes['loader']}>
      <div className={classes['loader__ellipsis']}>
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  );
};
