import apiFetch from 'utils/api_fetch';

const approveInterchange = function approveInterchange(id) {
  return apiFetch.authenticatedPut(`v1/interchange/${id}/approve`);
};

export default approveInterchange;
