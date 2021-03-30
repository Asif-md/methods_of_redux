/**
 * @author ashwin.raghavan
 */

import {SHOW_TRANSACTION_STATUS, SHOW_TRANSACTION_STATUS_DONE, CLEAR_STATE} from "../actions/action_types";

export default function transaction(state = {}, action) {
    switch(action.type) {
        case SHOW_TRANSACTION_STATUS:
            return {};
        case SHOW_TRANSACTION_STATUS_DONE:
            return action.transactionStatus;
        case CLEAR_STATE:
            return {};
        default:
            return state;
    }
}
