/**
 * Created by ashwin.raghavan on 26/05/17.
 */

import {PENDING_SETTLEMENT_AMOUNT, PENDING_SETTLEMENT_AMOUNT_DONE, CLEAR_STATE} from "../actions/action_types";

export default function pendingSettlementAmount(state = {}, action) {
  switch(action.type) {
    case PENDING_SETTLEMENT_AMOUNT:
      return {
        searching: true
      };

    case PENDING_SETTLEMENT_AMOUNT_DONE:
      return {
        searching: false,
        amount: action.pendingSettlementAmount
      };

    case CLEAR_STATE:
      return {};

    default:
      return state;
  }
}