import {
  SHOW_INTERCHANGE,
  SHOW_INTERCHANGE_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from '../actions/action_types';

export default function interchange(state = {}, action) {
  switch(action.type) {
  case SHOW_INTERCHANGE:
    return {};
  case SHOW_INTERCHANGE_DONE:
    return action.interchange;
  case APPROVE_DONE:
  case ACTIVATE_DONE:
  case DEACTIVATE_DONE:
    if (action.recordType === 'interchange') {
      return action.record;
    } else {
      return state;
    }
  default:
    return state;
  }
}
