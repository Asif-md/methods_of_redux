import apiFetch from 'utils/api_fetch';

const activateRuleset = function activateRuleset(id) {
  return apiFetch.authenticatedPut(`v1/ruleset/${id}/activate`);
};

export default activateRuleset;
