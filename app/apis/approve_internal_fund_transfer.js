import apiFetch from 'utils/api_fetch';

const approveInternalFundTransfer = function approveInternalFundTransfer(id) {
  return apiFetch.authenticatedPut(`v1/internalFundTransfer/${id}/approve`);
};

export default approveInternalFundTransfer;
