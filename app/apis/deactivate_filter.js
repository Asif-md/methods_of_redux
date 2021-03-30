import apiFetch from 'utils/api_fetch';

const deactivateFilter = function activateFilter(id) {
  return apiFetch.authenticatedPut(`v1/filter/${id}/deactivate`);
};

export default deactivateFilter;
