import {
  SHOW_INTERNAL_FUND_TRANSFER,
  SHOW_INTERNAL_FUND_TRANSFER_DONE,
  APPROVE_DONE
} from 'actions/action_types';

export default function internalFundTransfer(state = {}, action) {
  switch(action.type) {
  case SHOW_INTERNAL_FUND_TRANSFER:
    return {};
  case SHOW_INTERNAL_FUND_TRANSFER_DONE:
    return action.internalFundTransfer;
  case APPROVE_DONE:
    if (action.recordType === 'internalFundTransfer') {
      return action.record;
    } else {
      return state;
    }
  default:
    return state;
  }
}
