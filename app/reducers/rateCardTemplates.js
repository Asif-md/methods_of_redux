import {
    SERVICE_TYPES,
    SERVICE_TYPES_DONE,
    EVENT_TYPES,
    EVENT_TYPES_DONE,
    LIST_RATE_CARD_TEMPLATE,
    LIST_RATE_CARD_TEMPLATE_DONE,
    SEARCH_LIST,
    SEARCH_RULESET_DONE,
    APPROVE_DONE,
    ACTIVATE_DONE,
    DEACTIVATE_DONE
  } from "actions/action_types";
  
  export default function rateCardTemplate(state = {}, action) {
    switch(action.type) {
      case SERVICE_TYPES:
        return {
          ...state,
          serviceTypes: []
        };
      case SERVICE_TYPES_DONE:
        return {
          ...state,
          serviceTypes: action.serviceTypes
        };
      case EVENT_TYPES:
        return {
          ...state,
          events: []
        };
      case EVENT_TYPES_DONE:
        return {
          ...state,
          events: action.eventTypes
        };
      case LIST_RATE_CARD_TEMPLATE:
        return {
          ...state,
          data: []
        };
      case LIST_RATE_CARD_TEMPLATE_DONE:
        return {
          ...state,
          data: action.rulesets,
          count: action.count
        };
      case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
      case SEARCH_RULESET_DONE:
        return {
          ...state,
          data: action.result,
          count: action.count
        };
      case APPROVE_DONE:
      case ACTIVATE_DONE:
      case DEACTIVATE_DONE:
        const { record, recordType } = action;
  
        if (recordType === 'ruleset') {
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
  