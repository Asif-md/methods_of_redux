import apiFetch from 'utils/api_fetch';

const createSlabbedFixedRateInterchangeFeeRule = function createSlabbedFixedRateInterchangeFeeRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/interchange/slabbed/rate", rulesetId, request);
};

export default createSlabbedFixedRateInterchangeFeeRule;
