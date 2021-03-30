import { combineReducers } from 'redux';
import filters from 'reducers/new_ruleset/filter/filters';
import name from 'reducers/new_ruleset/filter/name';

const filterReducer = combineReducers({
  name,
  filters
});

export default filterReducer;
