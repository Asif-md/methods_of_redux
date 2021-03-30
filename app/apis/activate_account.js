import apiFetch from 'utils/api_fetch';

const activateAccount = function activateAccount(id) {
  return apiFetch.authenticatedPut(`v1/account/${id}/activate`);
};

export default activateAccount;
