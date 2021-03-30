import apiFetch from 'utils/api_fetch';

const approveAccount = function approveAccount(id) {
  return apiFetch.authenticatedPut(`v1/account/${id}/approve`);
};

export default approveAccount;
