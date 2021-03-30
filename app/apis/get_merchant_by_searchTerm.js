import apiFetch from 'utils/api_fetch';

const getMerchantBySearchTerm = function getMerchantBySearchTerm(searchTerm) {
  return apiFetch.authenticatedGet(`v1/merchant/search/${searchTerm}`);
};

export default getMerchantBySearchTerm;
