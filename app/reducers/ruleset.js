import {
  SHOW_RULESET,
  SHOW_RULESET_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from 'actions/action_types';

import filters from 'reducers/ruleset/filters';
import rules from 'reducers/ruleset/rules';

export default function ruleset(state = {}, action) {
  switch(action.type) {
    case SHOW_RULESET:
      return {};
    case SHOW_RULESET_DONE:
      return action.ruleset;
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      if (action.recordType === 'ruleset') {
        return action.record;
      } else if (action.recordType === 'rule') {
        return {
          ...state,
          rules: rules(state.rules, {
            type: action.type,
            index: action.extra.index,
            rule: action.record
          })
        };
      } else if (action.recordType === 'filter') {
        return {
          ...state,
          filters: filters(state.filters, {
            type: action.type,
            index: action.extra.index,
            filter: action.record
          })
        };
      } else {
        return state;
      }
    default:
      return state;
  }
}
