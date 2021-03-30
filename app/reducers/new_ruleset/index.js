import { combineReducers } from 'redux';
import filter from 'reducers/new_ruleset/filter/index';
import rules from 'reducers/new_ruleset/rules';

const newRulesetReducer = combineReducers({
  rules,
  filter
});

export default newRulesetReducer;
