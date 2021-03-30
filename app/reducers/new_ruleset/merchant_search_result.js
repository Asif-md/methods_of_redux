import {
  MERCHANT_SEARCH,
  MERCHANT_SEARCH_DONE,
  LOCK_MERCHANT_SEARCH,
  MERCHANT_SEARCH_FAILED,
  MERCHANT_SEARCH_CANCELLED
} from 'actions/action_types';

function merchantSearchDetails(action) {
  var { id, merchantId, name } = action.result;

  return {
    id,
    result: merchantId,
    subResult: name
  };
}

export default function merchantSearchResult(state = {}, action) {
  switch(action.type) {
    case MERCHANT_SEARCH:
      return {
        details: null,
        searching: true,
        locked: false,
        errorMessage: null
      };
    case MERCHANT_SEARCH_DONE:
      return {
        details: merchantSearchDetails(action),
        searching: false,
        locked: false,
        errorMessage: null
      };
    case LOCK_MERCHANT_SEARCH:
      return {
        ...state,
        searching: false,
        locked: true,
        errorMessage: null
      };
    case MERCHANT_SEARCH_FAILED:
      return {
        ...state,
        searching: false,
        locked: false,
        errorMessage: action.errorMessage
      };
    case MERCHANT_SEARCH_CANCELLED:
      return {
        ...state,
        searching: false,
        locked: false,
        errorMessage: null
      };
    default:
      return state;
  }
}
