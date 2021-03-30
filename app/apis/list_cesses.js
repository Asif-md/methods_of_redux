import apiFetch from 'utils/api_fetch';

const listCesses = function listCesses() {
  return apiFetch.authenticatedGet("v1/cess/list");
};

export default listCesses;
