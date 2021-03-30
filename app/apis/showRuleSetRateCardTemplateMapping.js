import apiFetch from 'utils/api_fetch';

const showRuleSetRateCardTemplateMapping = function showRuleSetRateCardTemplateMapping(rulesetId) {
  return apiFetch.authenticatedGet(`v1/ruleSetRateCardTemplateMapping/ruleset/${rulesetId}`);
};

export default showRuleSetRateCardTemplateMapping;
