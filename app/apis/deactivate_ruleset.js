import apiFetch from 'utils/api_fetch';

const deactivateRuleset = function deactivateRuleset(id) {
  return apiFetch.authenticatedPut(`v1/ruleset/${id}/deactivate`);
};

export default deactivateRuleset;
