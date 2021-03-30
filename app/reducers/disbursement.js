import {
  CLEAR_STATE,
  SHOW_DISBURSEMENT,
  SHOW_DISBURSEMENT_DONE,
  SHOW_SETTLEMENT,
  SHOW_SETTLEMENT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "../actions/action_types";

export default function disbursement(state = {}, action) {
  switch(action.type) {
    case CLEAR_STATE:
      return {};
    case SHOW_DISBURSEMENT:
      return {};
    case SHOW_DISBURSEMENT_DONE:
      return action.disbursement;
    case SHOW_SETTLEMENT:
      return {};
    case SHOW_SETTLEMENT_DONE:
      return action.disbursement;
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      if (action.recordType === 'disbursement') {
        return action.record;
      } else {
        return state;
      }
    default:
      return state;
  }
}
