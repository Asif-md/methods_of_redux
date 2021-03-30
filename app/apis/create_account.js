import apiFetch from 'utils/api_fetch';

const createAccount = function createAccount(account) {
  return apiFetch.authenticatedPost("v1/account", account);
};

export default createAccount;
