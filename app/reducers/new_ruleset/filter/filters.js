import {
  ADD_FILTER,
  REMOVE_FILTER,
  CHANGE_FILTER
} from '../../../actions/action_types';

export default function filters(state = [{}], action) {
  switch(action.type) {
    case ADD_FILTER:
      return [
        ...state,
        {
          timestamp: Date.now()
        }
      ];
    case REMOVE_FILTER:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1),
      ];
    case CHANGE_FILTER:
      const oldState = state[action.index];

      return [
        ...state.slice(0, action.index),
        {
          ...oldState,
          ...action.filter
        },
        ...state.slice(action.index + 1),
      ];
    default:
      return state;
  }
}
