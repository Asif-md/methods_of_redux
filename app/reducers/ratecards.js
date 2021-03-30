/**
 * Created by ashwin.raghavan on 13/02/17.
 */

import {
  CLEAR_STATE,
  SHOW_RATECARDS,
  SHOW_RATECARDS_DONE,
  APPROVE_RATECARD_DONE,
  ACTIVATE_RATECARD_DONE,
  DEACTIVATE_RATECARD_DONE
} from "actions/action_types"

export default function ratecards(state = {}, action) {
  switch (action.type) {
    case CLEAR_STATE:
    return {};
    case SHOW_RATECARDS:
      return {};
    case SHOW_RATECARDS_DONE:
      return action.ratecards;
    case APPROVE_RATECARD_DONE:
    case ACTIVATE_RATECARD_DONE:
    case DEACTIVATE_RATECARD_DONE:
      return action.rateCards;
    default:
      return state;
  }
}