import apiFetch from 'utils/api_fetch';

const activateMerchant = function activateMerchant(id) {
  return apiFetch.authenticatedPut(`v1/merchant/${id}/activate`);
};

export default activateMerchant;
