import { REQUEST_STATUSES } from '../../constants';

export default function requestStatus(type = 'CREATE', types) {
  return function actionRequestStatus(
    state = REQUEST_STATUSES.NOT_LOADED,
    action
  ) {
    switch (action.type) {
      case types[type]:
        return REQUEST_STATUSES.NOT_LOADED;
      case types[`${type}_REQUEST`]:
        return REQUEST_STATUSES.LOADING;
      case types[`${type}_SUCCESS`]:
        return REQUEST_STATUSES.LOADED;
      case types[`${type}_FAILURE`]:
        return REQUEST_STATUSES.FAILED;
      default:
        return state;
    }
  };
}
