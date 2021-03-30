/**
 * Created by ashwin.raghavan on 11/01/17.
 */

import {
  CLEAR_STATE,
  MERCHANT_SETTLEMENT_STATUS,
  LIST_MERCHANT_SETTLEMENTS_DONE
} from "actions/action_types";

export default function merchantDisbursements(state = [], action) {
  switch(action.type) {
    case CLEAR_STATE:
      return {};
    case MERCHANT_SETTLEMENT_STATUS:
      return {
        settlementType: "",
        data: [],
        count: 0
      };
    case LIST_MERCHANT_SETTLEMENTS_DONE:
      return {
        settlementType: action.settlementType,
        data: action.merchantSettlements,
        count: action.count
      };
    default:
      return state;
  }
}
