import apiFetch from 'utils/api_fetch';

const showInterchange = function showInterchange(id) {
  return apiFetch.authenticatedGet(`v1/interchange/${id}`);
};

export default showInterchange;
