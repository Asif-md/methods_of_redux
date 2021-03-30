/**
 * @author ashwin.raghavan
 */
import {
  SHOW_SETTLEMENT,
  SHOW_SETTLEMENT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "../actions/action_types";

export default function settlementRule(state = {}, action) {
  switch (action.type) {
    case SHOW_SETTLEMENT:
      return {};
    case SHOW_SETTLEMENT_DONE:
      return action.settlementRule;
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      if (action.recordType === 'settlement') {
        return action.record;
      } else {
        return state;
      }
    default:
      return state;
  }
}
