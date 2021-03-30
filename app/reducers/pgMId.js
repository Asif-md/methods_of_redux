import {
  SHOW_PG_MID,
  SHOW_PG_MID_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from '../actions/action_types';

export default function merchant(state = {}, action) {
  switch(action.type) {
    case SHOW_PG_MID:
      return {};
    case SHOW_PG_MID_DONE:
      return action.pgMId;
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      if (action.recordType === 'pgMId') {
        return action.record;
      } else {
        return state;
      }
    default:
      return state;
  }
}
