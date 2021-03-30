import apiFetch from 'utils/api_fetch';

const getAggregatorServiceType = function getAggregatorServiceType() {
  return apiFetch.authenticatedGet("v1/aggregator/servicetype/list?active=true");
};

export default getAggregatorServiceType;
