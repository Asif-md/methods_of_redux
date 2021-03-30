import apiFetch from 'utils/api_fetch';

const approveMerchant = function approveMerchant(id) {
  return apiFetch.authenticatedPut(`v1/merchant/${id}/approve`);
};

export default approveMerchant;
