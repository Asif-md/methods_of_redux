import apiFetch from 'utils/api_fetch';

const activateFilter = function activateFilter(id) {
  return apiFetch.authenticatedPut(`v1/filter/${id}/activate`);
};

export default activateFilter;
