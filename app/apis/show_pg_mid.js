import apiFetch from 'utils/api_fetch';

const showPgMId = function showPgMId(id) {
  return apiFetch.authenticatedGet(`v1/pgMId/${id}`);
};

export default showPgMId;
