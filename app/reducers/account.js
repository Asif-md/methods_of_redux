import {
  SHOW_ACCOUNT,
  SHOW_ACCOUNT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from 'actions/action_types';

export default function account(state = {}, action) {
  switch(action.type) {
  case SHOW_ACCOUNT:
    return {};
  case SHOW_ACCOUNT_DONE:
    return action.account;
  case APPROVE_DONE:
  case ACTIVATE_DONE:
  case DEACTIVATE_DONE:
    if (action.recordType === 'account') {
      return action.record;
    } else {
      return state;
    }
  default:
    return state;
  }
}
