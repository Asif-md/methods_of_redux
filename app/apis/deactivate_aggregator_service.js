import apiFetch from 'utils/api_fetch';

const deactivateAggregatorService = function deactivateAggregatorService(id) {
  return apiFetch.authenticatedPut(`v1/aggregator/servicetype/${id}/deactivate`);
};

export default deactivateAggregatorService;
