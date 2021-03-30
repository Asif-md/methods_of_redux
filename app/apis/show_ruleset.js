import apiFetch from 'utils/api_fetch';

const showRuleset = function showRuleset(id) {
  return apiFetch.authenticatedGet(`v1/ruleset/${id}`);
};

export default showRuleset;
