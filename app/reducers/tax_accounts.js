import { LIST_TAX_ACCOUNTS, LIST_TAX_ACCOUNTS_DONE } from 'actions/action_types';

export default function taxAccounts(state = [], action) {
  switch(action.type) {
    case LIST_TAX_ACCOUNTS:
      return [];
    case LIST_TAX_ACCOUNTS_DONE:
      return action.taxAccounts;
    default:
      return state;
  }
}
