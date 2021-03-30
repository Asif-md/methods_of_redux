import apiFetch from 'utils/api_fetch';

const activateAggregatorService = function activateAggregatorService(id) {
  return apiFetch.authenticatedPut(`v1/aggregator/servicetype/${id}/activate`);
};
export default activateAggregatorService;
