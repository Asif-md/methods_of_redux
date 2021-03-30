import {
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from 'actions/action_types';

export default function rules(state = [], action) {
  switch(action.type) {
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
    case APPROVE_DONE:
      return [
        ...state.slice(0, action.index),
        action.rule,
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}
