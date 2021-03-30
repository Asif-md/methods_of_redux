import apiFetch from 'utils/api_fetch';

const getMerchantByShortId = function getMerchantByShortId(shortId) {
  return apiFetch.authenticatedGet(`v1/merchant/merchantId/${shortId}`);
};

export default getMerchantByShortId;
