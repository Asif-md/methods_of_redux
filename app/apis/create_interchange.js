import apiFetch from 'utils/api_fetch';

const createInterchange = function createInterchange(interchange) {
  return apiFetch.authenticatedPost("v1/interchange", interchange);
};

export default createInterchange;
