import {
    LIST_TAX_RULES,
    LIST_TAX_RULES_DONE,
    SEARCH_LIST,
    SEARCH_TAX_RULE_DONE,
    APPROVE_DONE,
    ACTIVATE_DONE,
    DEACTIVATE_DONE
} from "actions/action_types";

export default function taxRules(state = [], action) {
    switch (action.type) {
        case LIST_TAX_RULES:
            return {
                ...state,
                data: []
            };
        case LIST_TAX_RULES_DONE:
            return {
                data: action.taxRules,
                count: action.count
            };
        case SEARCH_LIST:
            return {
                ...state,
                data: []
            };
        case SEARCH_TAX_RULE_DONE:
            return {
                data: action.result,
                count: action.count
            };
        case APPROVE_DONE:
        case ACTIVATE_DONE:
        case DEACTIVATE_DONE:
            const { record, recordType } = action;

            if (recordType === 'rules/tax') {
                const data = state.data.map((existingRecord) => {
                    if (record.id === existingRecord.id) {
                        return record;
                    } else {
                        return existingRecord;
                    }
                });

                return {
                    ...state,
                    data
                };
            } else {
                return state;
            }
        default:
            return state;
    }
}
