import apiFetch from 'utils/api_fetch';

const approveRuleset = function approveRuleset(id) {
  return apiFetch.authenticatedPut(`v1/ruleset/${id}/approve`);
};

export default approveRuleset;
