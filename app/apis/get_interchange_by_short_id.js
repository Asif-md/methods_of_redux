import apiFetch from 'utils/api_fetch';

const getInterchangeByShortId = function getInterchangeByShortId(shortId) {
  return apiFetch.authenticatedGet(`v1/interchange/interchangeId/${shortId}`);
};

export default getInterchangeByShortId;
