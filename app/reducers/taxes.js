import { LIST_TAXES, LIST_TAXES_DONE } from 'actions/action_types';

export default function taxes(state = [], action) {
  switch(action.type) {
  case LIST_TAXES:
    return [];
  case LIST_TAXES_DONE:
    return action.taxes;
  default:
    return state;
  }
}
