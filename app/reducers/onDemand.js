import {
    SHOW_SETTLEMENT,
    SHOW_SETTLEMENT_DONE,
    SHOW_ON_DEMAND,
    SHOW_ON_DEMAND_DONE,
    APPROVE_DONE,
    ACTIVATE_DONE,
    DEACTIVATE_DONE
} from "../actions/action_types";

export default function onDemand(state = {}, action) {
    switch (action.type) {
        case SHOW_SETTLEMENT:
            return {};
        case SHOW_ON_DEMAND:
            return {};
        case SHOW_ON_DEMAND_DONE:
            return action.onDemand;
        case SHOW_SETTLEMENT_DONE:
            return action.onDemand;;
        case APPROVE_DONE:
        case ACTIVATE_DONE:
        case DEACTIVATE_DONE:
            if (action.recordType === 'onDemand') {
                return action.record;
            } else {
                return state;
            }
        default:
            return state;
    }
}
