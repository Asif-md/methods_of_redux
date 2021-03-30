import apiFetch from 'utils/api_fetch';

const listTaxAccounts = function listTaxAccounts() {
  return apiFetch.authenticatedGet("v1/account/list");
};

export default listTaxAccounts;
