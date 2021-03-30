import apiFetch from 'utils/api_fetch';

const createCountBasedRateCardRule = function createFixedCommissionRule(rulesetId, request) {
  return apiFetch.authenticatedPost("v1/rateCardRule/countBased", {...request, rateCardTemplateId:rulesetId});
};

export default createCountBasedRateCardRule;
