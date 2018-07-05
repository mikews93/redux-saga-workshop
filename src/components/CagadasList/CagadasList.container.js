import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { actions, selectors } from '../../store/cagadas';
import CagadasList from './CagadasList';
export function mapStateToProps(state) {
  const cagada = selectors(state);
  return {
    cagadas: cagada.getCagadas(),
    cagadaFetchStatus: cagada.getCagadasFetchStatus()
  };
}

export default withRouter(
  connect(
    mapStateToProps,
    {
      fetchCagadas: actions.fetchCagadas
    }
  )(CagadasList)
);
