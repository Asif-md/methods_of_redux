import apiFetch from 'utils/api_fetch';

const listAggegrateTypes = function listAggegrateTypes(page, pageSize, { active }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  }
  return apiFetch.authenticatedGet("v1/aggregator/servicetype/list",params);
};

export default listAggegrateTypes;
