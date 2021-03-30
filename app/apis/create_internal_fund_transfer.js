import apiFetch from 'utils/api_fetch';

const createInternalFundTransfer = function createInternalFundTransfer(internalFundTransfer) {
  return apiFetch.authenticatedPost("v1/internalFundTransfer", internalFundTransfer);
};

export default createInternalFundTransfer;
