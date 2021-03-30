import apiFetch from 'utils/api_fetch';

const createAggregateService = function createAggregateService(serviceType) {
  return apiFetch.authenticatedPost("v1/aggregator/servicetype", serviceType);
}

export default createAggregateService;
