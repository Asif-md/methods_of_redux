import apiFetch from 'utils/api_fetch';

const createMerchant = function createMerchant(merchant) {
  return apiFetch.authenticatedPost("v1/merchant", merchant);
}

export default createMerchant;
