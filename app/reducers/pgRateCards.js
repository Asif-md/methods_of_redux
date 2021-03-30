import {
  LIST_PG_RATE_CARDS,
  LIST_PG_RATE_CARDS_DONE,
  CREATE_PG_RATE_CARD_DONE,
  SEARCH_LIST,
  SEARCH_PG_RATE_CARDS_DONE,
  CLEAR_STATE
} from '../actions/action_types';

export default function pgRateCards(state = {}, action) {
  switch(action.type) {
    case LIST_PG_RATE_CARDS:
      return {
        ...state,
        data: []
      };
    case LIST_PG_RATE_CARDS_DONE:
      return {
        data: action.pgRateCards,
        count: action.count
      };
    case SEARCH_LIST:
      return {
        ...state,
        data:[]
      };
    case SEARCH_PG_RATE_CARDS_DONE:
      return {
        data: action.result,
        count: action.count
      };
    case CREATE_PG_RATE_CARD_DONE:
      return {
        data: [...state.data, action.pgRateCard],
        count: +state.count + 1
      };
    default:
      return state;
  }
}