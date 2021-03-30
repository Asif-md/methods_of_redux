import apiFetch from 'utils/api_fetch';

const activateInterchange = function activateInterchange(id) {
  return apiFetch.authenticatedPut(`v1/interchange/${id}/activate`);
};

export default activateInterchange;
