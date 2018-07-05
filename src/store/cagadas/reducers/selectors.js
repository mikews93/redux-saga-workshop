import map from 'lodash/map';

import { REQUEST_STATUSES } from '../../../constants';

export default function selectors(globalState) {
  const { cagadas } = globalState.entities;

  const getCagadas = () => map(cagadas.entities);

  const getCagadaById = cagadaId => cagadas.entities[cagadaId] || {};

  const getCagadasFetchStatus = () =>
    cagadas.fetchStatus || REQUEST_STATUSES.NOT_LOADED;

  return {
    getCagadas,
    getCagadaById,
    getCagadasFetchStatus
  };
}
