/**
 * Created by ashwin.raghavan on 12/01/17.
 */

import {LOOKUP_UTR, LOOKUP_UTR_DONE, CLEAR_STATE} from "../actions/action_types";

export default function utrLookupResult(state = {}, action) {
  switch(action.type) {
    case LOOKUP_UTR:
      return {};

    case LOOKUP_UTR_DONE:
      return action.utrLookupResult;

    case CLEAR_STATE:
      return {};

    default:
      return state;
  }
}
