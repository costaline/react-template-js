import React, { Component } from 'react';
import T from 'prop-types';

import { Error } from '@@/shared/components';

export class ErrorBoundary extends Component {
  static propTypes = {
    children: T.node,
  };

  state = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    return hasError ? <Error /> : children;
  }
}
