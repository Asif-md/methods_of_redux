import { LIST_CESSES, LIST_CESSES_DONE } from 'actions/action_types';

export default function cesses(state = [], action) {
  switch(action.type) {
  case LIST_CESSES:
    return [];
  case LIST_CESSES_DONE:
    return action.cesses;
  default:
    return state;
  }
}
