import {
  EDIT_LOCK,
  MULTI_FIND,
  MULTI_FIND_INPUT,
  MULTI_FIND_DONE,
  LOCK_MULTI_FIND,
  MULTI_FIND_CLEAR,
  MULTI_FIND_FAILED,
  MULTI_FIND_CANCELLED
} from 'actions/action_types';

function searchDetail(action) {
  var result, subResult;
  const entryType = action.entryType;

  if (entryType === "Interchange") {
    result = action.result.interchangeId;
    subResult = action.result.name;
  } else if (entryType === "Merchant") {
    result = action.result.merchantId;
    subResult = action.result.name;
  } else if (entryType === "Account") {
    result = action.result.name;
    subResult = action.result.accountType;
  }
  return {
    id: action.result.id,
    result,
    subResult,
    entryType
  };
}

function searchDetails(action) {
  var result, subResult;
  const entryType = action.entryType;
  return action.result.map(item => {
    if (entryType === "Interchange") {
      result = item.interchangeId;
      subResult = item.name;
    } else if (entryType === "Merchant") {
      result = item.merchantId;
      subResult = item.name;
    } else if (entryType === "Account") {
      result = item.name;
      subResult = item.accountType;
    }
    return {
      id: item.id,
      result,
      subResult,
      entryType
    };
  })
  
}

export default function multiFindResult(state = {}, action) {
  switch(action.type) {
    case EDIT_LOCK:
      return {
        details: {
          id: action.result.id,
          entryType: action.result.entryType
        },
        searching: false,
        locked: true,
        errorMessage: null
      };
    case MULTI_FIND_INPUT:
      const isExpression = (action.entryType === "Expression");
      return {
        details: {
          // id: (isExpression ? `$.${action.input}` : action.input),
          id: action.input,
          isExpression: isExpression,
          entryType: (isExpression ? action.expressionEntryType : action.entryType)
        },
        searching: false,
        locked: false,
        errorMessage: null
      };
    case MULTI_FIND:
      return {
        details: null,
        searching: true,
        locked: false,
        errorMessage: null
      };
    case MULTI_FIND_DONE:
      return {
        details: Array.isArray(action.result) ? searchDetails(action) : searchDetail(action),
        searching: false,
        locked: false,
        errorMessage: null
      };
    case LOCK_MULTI_FIND:
      return {
        ...state,
        searching: false,
        locked: true,
        index: action.searchIndex || 0,
        errorMessage: null
      };
    case MULTI_FIND_FAILED:
      return {
        ...state,
        searching: false,
        locked: false,
        errorMessage: action.errorMessage
      };
    case MULTI_FIND_CLEAR:
      return {
        details: [],
        searching: false,
        locked: false,
        errorMessage: null
      }
    case MULTI_FIND_CANCELLED:
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
