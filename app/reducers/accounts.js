/**
 * @author ashwin.raghavan
 */
import {
  LIST_ACCOUNTS,
  LIST_ACCOUNTS_DONE,
  SEARCH_LIST,
  SEARCH_ACCOUNT_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from "actions/action_types";

export default function accounts(state = [], action) {
  switch(action.type) {
    case LIST_ACCOUNTS:
      return {
        ...state,
        data: []
      };
    case LIST_ACCOUNTS_DONE:
      return {
        data: action.accounts,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_ACCOUNT_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      const { record, recordType } = action;

      if (recordType === 'account') {
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
