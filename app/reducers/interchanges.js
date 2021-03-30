import {
  LIST_INTERCHANGES,
  LIST_INTERCHANGES_DONE,
  SEARCH_LIST,
  SEARCH_INTERCHANGE_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "actions/action_types";

export default function interchanges(state = [], action) {
  switch(action.type) {
    case LIST_INTERCHANGES:
      return {
        ...state,
        data: []
      };
    case LIST_INTERCHANGES_DONE:
      return {
        data: action.interchanges,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_INTERCHANGE_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      const { record, recordType } = action;

      if (recordType === 'interchange') {
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
