import apiFetch from 'utils/api_fetch';

const getInterchangeBySearchTerm = function getInterchangeBySearchTerm(searchTerm) {
  return apiFetch.authenticatedGet(`v1/interchange/search/${searchTerm}`);
};

export default getInterchangeBySearchTerm;
