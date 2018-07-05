import formReducer from 'redux-form/lib/reducer';
import { combineReducers } from 'redux';

import { rootReducer as cagadas } from './cagadas';

const entities = combineReducers({
  cagadas
});

export default combineReducers({
  entities,
  form: formReducer
});
