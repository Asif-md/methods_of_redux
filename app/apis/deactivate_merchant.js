import apiFetch from 'utils/api_fetch';

const deactivateMerchant = function deactivateMerchant(id) {
  return apiFetch.authenticatedPut(`v1/merchant/${id}/deactivate`);
};

export default deactivateMerchant;
