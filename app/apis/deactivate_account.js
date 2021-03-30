import apiFetch from 'utils/api_fetch';

const deactivateAccount = function deactivateAccount(id) {
  return apiFetch.authenticatedPut(`v1/account/${id}/deactivate`);
};

export default deactivateAccount;
