import { SENDING_REQUEST, SOMETHING_WENT_WRONG } from 'actions/action_types';

export default function error(state = "", action) {
  switch(action.type) {
    case SENDING_REQUEST:
      return "";
    case SOMETHING_WENT_WRONG:
      return action.message;
    default:
      return state;
  }
}
