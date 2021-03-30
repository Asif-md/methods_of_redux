import apiFetch from 'utils/api_fetch';

const verifyAddress = function verifyAddress(id) {
  return apiFetch.authenticatedPut(`v1/merchant/${id}/address/verify`);
};

export default verifyAddress;
