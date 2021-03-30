import apiFetch from 'utils/api_fetch';

const showMerchant = function showMerchant(id) {
  return apiFetch.authenticatedGet(`v1/merchant/${id}`);
};

export default showMerchant;
