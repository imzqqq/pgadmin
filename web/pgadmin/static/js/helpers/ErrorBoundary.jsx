/* https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html */

import React from 'react';

import gettext from 'sources/gettext';

import CustomPropTypes from '../custom_prop_types';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    console.error(error, info);
  }

  render() {
    if (this.state.hasError)
      // You can render any custom fallback UI
      return <h2>{gettext('Something went wrong.')}</h2>;

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: CustomPropTypes.children,
};
