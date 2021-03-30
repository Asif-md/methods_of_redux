import apiFetch from 'utils/api_fetch';

const createFixedRateCommissionRule = function createFixedRateCommissionRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/commission/fixed/rate", rulesetId, request);
};

export default createFixedRateCommissionRule;
