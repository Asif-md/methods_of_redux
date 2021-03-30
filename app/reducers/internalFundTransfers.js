import {
  LIST_INTERNAL_FUND_TRANSFERS,
  LIST_INTERNAL_FUND_TRANSFERS_DONE,
  SEARCH_LIST,
  SEARCH_INTERNAL_FUND_TRANSFER_DONE,
  APPROVE_DONE
} from "actions/action_types";

export default function internalFundTransfers(state = [], action) {
  switch(action.type) {
    case LIST_INTERNAL_FUND_TRANSFERS:
      return {
        ...state,
        data: []
      };
    case LIST_INTERNAL_FUND_TRANSFERS_DONE:
      return {
        data: action.internalFundTransfers,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_INTERNAL_FUND_TRANSFER_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
      const { record, recordType } = action;

      if (recordType === 'internalFundTransfer') {
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
