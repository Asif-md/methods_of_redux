import apiFetch from 'utils/api_fetch';

const deactivatePgMId = function deactivatePgMId(id) {
  return apiFetch.authenticatedPut(`v1/pgMId/${id}/deactivate`);
};

export default deactivatePgMId;
