import { combineReducers } from 'redux';
import ListReducers from './ListReducers';

export default combineReducers({
  listResponse: ListReducers,
});
