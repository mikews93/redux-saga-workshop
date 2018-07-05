import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import App from './App';

export function mapStateToProps(state) {
  return {};
}

export default withRouter(
  connect(
    mapStateToProps,
    {}
  )(App)
);
