import {
  SHOW_MERCHANT,
  SHOW_MERCHANT_DONE,
  ADDRESS_VERIFY_DONE,
  APPROVE_DONE,
  ACTIVATE_DONE,
  DEACTIVATE_DONE
} from '../actions/action_types';

export default function merchant(state = {}, action) {
  switch(action.type) {
    case SHOW_MERCHANT:
      return {};
    case SHOW_MERCHANT_DONE:
    case ADDRESS_VERIFY_DONE:
      return action.merchant;
    case APPROVE_DONE:
    case ACTIVATE_DONE:
    case DEACTIVATE_DONE:
      if (action.recordType === 'merchant') {
        return action.record;
      } else {
        return state;
      }
    default:
      return state;
  }
}
