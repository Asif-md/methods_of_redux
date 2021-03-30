/**
 * @author ashwin.raghavan
 */
import {
    SHOW_TAX_RULE,
    SHOW_TAX_RULE_DONE,
    APPROVE_DONE,
    ACTIVATE_DONE,
    DEACTIVATE_DONE
} from "../actions/action_types";

export default function taxRule(state = {}, action) {
    switch (action.type) {
        case SHOW_TAX_RULE:
            return {};
        case SHOW_TAX_RULE_DONE:
            return action.taxRule;
        case APPROVE_DONE:
        case ACTIVATE_DONE:
        case DEACTIVATE_DONE:
            if (action.recordType === 'rules/tax') {
                return action.record;
            } else {
                return state;
            }
        default:
            return state;
    }
}
