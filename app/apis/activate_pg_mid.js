import apiFetch from 'utils/api_fetch';

const activatePgMId = function activatePgMId(id) {
  return apiFetch.authenticatedPut(`v1/pgMId/${id}/activate`);
};

export default activatePgMId;
