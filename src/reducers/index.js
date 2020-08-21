import { combineReducers } from 'redux';
import ListReducers from './ListReducers';
import AuthReducers from './AuthReducers';

export default combineReducers({
  listResponse: ListReducers,
  authResponse: AuthReducers,
});
