import {
  LIST_REPORT_TYPES_DONE,
  EDIT_LOCK,
  MULTI_FIND,
  MULTI_FIND_INPUT,
  MULTI_FIND_DONE,
  LOCK_MULTI_FIND,
  MULTI_FIND_FAILED,
  MULTI_FIND_CANCELLED,
  MULTI_FIND_CLEAR
} from "actions/action_types";

import multiFindResult from "reducers/new_ruleset/multi_find_result";

export default function report(state = {}, action) {
  switch (action.type) {
    case LIST_REPORT_TYPES_DONE:
      return {
        ...state,
        reportTypes: action.reportTypes
      };
    case MULTI_FIND:
      if (action.forComponent === "report") {
        const searchResultKey =
          action.searchingFor === "FromParty"
            ? "fromPartySearchResult"
            : action.searchingFor === "Provider Name"
              ? "providerDetails"
              : action.searchingFor === "Merchant"
                ? "merchantDetails"
                : action.searchingFor === "Pg Id"
                  ? "pgId"
                  : "toPartySearchResult";

        return {
          ...state,
          [searchResultKey]: {
            entryType: action.entryType
          }
        };
      }
    case EDIT_LOCK:
    case MULTI_FIND_INPUT:
    case MULTI_FIND_DONE:
    case LOCK_MULTI_FIND:
    case MULTI_FIND_FAILED:
    case MULTI_FIND_CANCELLED:
    case MULTI_FIND_CLEAR:
      if (action.forComponent === "report") {
        const searchResultKey =
          action.searchingFor === "FromParty"
            ? "fromPartySearchResult"
            : action.searchingFor === "Provider Name"
              ? "providerDetails"
              : action.searchingFor === "Merchant"
                ? "merchantDetails"
                : action.searchingFor === "Pg Id"
                  ? "pgId"
                  : "toPartySearchResult";
        return {
          ...state,
          [searchResultKey]: multiFindResult(
            state[searchResultKey] || {},
            action
          )
        };
      } else {
        return state;
      }
    case "@@router/LOCATION_CHANGE":
      return {
        fromPartySearchResult: {},
        toPartySearchResult: {}
      };
    default:
      return state;
  }
}
