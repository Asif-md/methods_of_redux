import {
  ADD_RULE,
  CHANGE_RULE,
  REMOVE_RULE,

  MULTI_FIND,
  MULTI_FIND_INPUT,
  MULTI_FIND_DONE,
  LOCK_MULTI_FIND,
  MULTI_FIND_FAILED,
  MULTI_FIND_CANCELLED,
  MULTI_FIND_CLEAR,

  MERCHANT_SEARCH,
  MERCHANT_SEARCH_DONE,
  LOCK_MERCHANT_SEARCH,
  MERCHANT_SEARCH_FAILED,
  MERCHANT_SEARCH_CANCELLED
} from 'actions/action_types';

import merchantSearchResult from 'reducers/new_ruleset/merchant_search_result';
import multiFindResult from 'reducers/new_ruleset/multi_find_result';

function rules(state = [{}], action) {
  var oldState, newMultiFindResults, newMerchantResults;

  switch (action.type) {
    case ADD_RULE:
      return [
        ...state,
        {
          ...action.rule,
          timestamp: Date.now()
        }
      ];
    case CHANGE_RULE:
      oldState = state[action.index];

      return [
        ...state.slice(0, action.index),
        {
          ...oldState,
          ...action.rule
        },
        ...state.slice(action.index + 1),
      ];
    case REMOVE_RULE:
      oldState = state[action.index];

      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case MULTI_FIND:
    case MULTI_FIND_INPUT:
    case MULTI_FIND_DONE:
    case LOCK_MULTI_FIND:
    case MULTI_FIND_FAILED:
    case MULTI_FIND_CANCELLED:
    case MULTI_FIND_CLEAR:
      if (action.forComponent === "new_ruleset") {
        oldState = state[action.index];
        const searchResultKey = (action.searchingFor === "Payer") ? "payerSearchResult" :
                                action.searchingFor === "FromParty" ? "fromPartySearchResult" :
                                action.searchingFor === "Provider Name" ? "providerDetails" :
                                action.searchingFor === "Merchant" ? "merchantDetails" :
                                action.searchingFor === "Pg Id" ? "pgId" : "toPartySearchResult";
        newMultiFindResults = multiFindResult(oldState[searchResultKey] || {}, action);
        return [  
          ...state.slice(0, action.index),
          {
            ...oldState,
            [searchResultKey]: newMultiFindResults
          },
          ...state.slice(action.index + 1),
        ];
      } else {
        return state;
      }
    case MERCHANT_SEARCH:
    case MERCHANT_SEARCH_DONE:
    case LOCK_MERCHANT_SEARCH:
    case MERCHANT_SEARCH_FAILED:
    case MERCHANT_SEARCH_CANCELLED:
      oldState = state[action.index];
      newMerchantResults = merchantSearchResult(oldState.merchantSearchResult || {}, action);

      return [
        ...state.slice(0, action.index),
        {
          ...oldState,
          merchantSearchResult: newMerchantResults
        },
        ...state.slice(action.index + 1),
      ];
    case "@@router/LOCATION_CHANGE":
      return state.map((rule) => {
        return {
          merchantSearchResult: {},
          payerSearchResult: {},
          toPartySearchResult: {},
          fromPartySearchResult: {}
        };
      });
    default:
      return state;
  }
}

export default rules;
