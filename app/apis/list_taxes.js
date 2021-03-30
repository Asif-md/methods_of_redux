import apiFetch from 'utils/api_fetch';

const listTaxes = function listTaxes() {
  return apiFetch.authenticatedGet("v1/tax/list");
};

export default listTaxes;
