import apiFetch from 'utils/api_fetch';

const createBasicRateCardRule = function createFixedCommissionRule(rulesetId, request) {
  return apiFetch.authenticatedPost("v1/rateCardRule/basic", {...request, rateCardTemplateId:rulesetId});
};

export default createBasicRateCardRule;
