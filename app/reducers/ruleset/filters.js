import {
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from 'actions/action_types';

export default function filters(state = [], action) {
  switch(action.type) {
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      return [
        ...state.slice(0, action.index),
        action.filter,
        ...state.slice(action.index + 1)
      ];
    default:
      return state;
  }
}
