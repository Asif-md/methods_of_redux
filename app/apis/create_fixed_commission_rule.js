import apiFetch from 'utils/api_fetch';

const createFixedCommissionRule = function createFixedCommissionRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/commission/fixed", rulesetId, request);
};

export default createFixedCommissionRule;
