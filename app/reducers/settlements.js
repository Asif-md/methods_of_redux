/**
 * @author ashwin.raghavan
 */
import {
  LIST_SETTLEMENTS,
  LIST_SETTLEMENTS_DONE,
  SEARCH_LIST,
  SEARCH_SETTLEMENT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "actions/action_types";

export default function settlements(state = {}, action) {
  switch(action.type) {
    case LIST_SETTLEMENTS:
      return {
        ...state,
        data: []
      };
    case LIST_SETTLEMENTS_DONE:
      return {
        data: action.settlements,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data: []
      };
    case SEARCH_SETTLEMENT_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      const { record, recordType } = action;

      if (recordType === 'settlement') {
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