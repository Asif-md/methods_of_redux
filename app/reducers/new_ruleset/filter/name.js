import { CHANGE_FILTER_NAME } from 'actions/action_types';

const name = function name(state = "", action) {
  switch (action.type) {
  case CHANGE_FILTER_NAME:
    return action.name;
  default:
    return state;
  }
};

export default name;

