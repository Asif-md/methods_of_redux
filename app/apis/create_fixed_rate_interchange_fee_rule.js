import apiFetch from 'utils/api_fetch';

const createFixedRateInterchangeFeeRule = function createFixedRateInterchangeFeeRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/interchange/rate", rulesetId, request);
};

export default createFixedRateInterchangeFeeRule;
