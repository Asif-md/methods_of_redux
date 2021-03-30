import {
  LIST_MERCHANTS,
  LIST_MERCHANTS_DONE,
  SEARCH_LIST,
  SEARCH_MERCHANT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "actions/action_types";

export default function merchants(state = {}, action) {
  switch(action.type) {
    case LIST_MERCHANTS:
      return {
        ...state,
        data: []
      };
    case LIST_MERCHANTS_DONE:
      return {
        data: action.merchants,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_MERCHANT_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      const { record, recordType } = action;

      if (recordType === 'merchant') {
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
