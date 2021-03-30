import {
  SHOW_SETTLEMENT,
  SHOW_SETTLEMENT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "../actions/action_types";

export default function invoice(state = {}, action) {
  switch(action.type) {
  case SHOW_SETTLEMENT:
    return {};
  case SHOW_SETTLEMENT_DONE:
    return action.invoice;
  case APPROVE_DONE:
  case ACTIVATE_DONE:
  case DEACTIVATE_DONE:
    if (action.recordType === 'invoice') {
      return action.record;
    } else {
      return state;
    }
  default:
    return state;
  }
}
