import apiFetch from 'utils/api_fetch';

const approvePgMId = function approvePgMId(id) {
  return apiFetch.authenticatedPut(`v1/pgMId/${id}/approve`);
};

export default approvePgMId;
