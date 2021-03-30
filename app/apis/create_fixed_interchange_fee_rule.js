import apiFetch from 'utils/api_fetch';

const createFixedInterchangeFeeRule = function createFixedInterchangeFeeRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/interchange/fixed", rulesetId, request);
};

export default createFixedInterchangeFeeRule;
