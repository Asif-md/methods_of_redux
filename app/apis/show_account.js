import apiFetch from 'utils/api_fetch';

const showAccount = function showAccount(id) {
  return apiFetch.authenticatedGet(`v1/account/${id}`);
};

export default showAccount;
