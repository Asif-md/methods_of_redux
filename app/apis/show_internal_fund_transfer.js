import apiFetch from 'utils/api_fetch';

const showInternalFundTransfer = function showInternalFundTransfer(id) {
  return apiFetch.authenticatedGet(`v1/internalFundTransfer/${id}`);
};

export default showInternalFundTransfer;
