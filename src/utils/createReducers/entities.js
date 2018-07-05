export default function entitiesReducer(
  { FETCH_SUCCESS, CLEAR_ENTITIES } = {},
  entityName = ''
) {
  return function entities(state = {}, action) {
    switch (action.type) {
    case FETCH_SUCCESS:
      return {
        ...state,
        ...action.payload[entityName]
      };
    case CLEAR_ENTITIES:
      return {};
    default:
      return state;
    }
  };
}
