import apiFetch from 'utils/api_fetch';

const deactivateInterchange = function deactivateInterchange(id) {
  return apiFetch.authenticatedPut(`v1/interchange/${id}/deactivate`);
};

export default deactivateInterchange;
