import {
  LIST_PG_MIDS,
  LIST_PG_MIDS_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE,
  SEARCH_PG_MID_DONE,
  SEARCH_LIST,
  LIST_PG_RATE_CARD_MIDS,
  LIST_PG_RATE_CARD_MIDS_DONE
} from '../actions/action_types';

export default function pgMIds(state = {}, action) {
  switch(action.type) {
    case LIST_PG_MIDS:
      return {
        ...state,
        data: []
      };
    case LIST_PG_MIDS_DONE:
      return {
        data: action.pgMIds,
        count: action.count
      };
    case LIST_PG_RATE_CARD_MIDS:
      return {
        ...state,
        data: []
      };
    case LIST_PG_RATE_CARD_MIDS_DONE:
      return {
        data: action.pgMIds,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_PG_MID_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      const { record, recordType } = action;
      if (recordType === 'pgMId') {
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