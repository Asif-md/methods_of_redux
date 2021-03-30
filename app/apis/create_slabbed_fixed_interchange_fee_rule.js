import apiFetch from 'utils/api_fetch';

const createSlabbedFixedInterchangeFeeRule = function createFixedInterchangeFeeRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/interchange/slabbed/fixed", rulesetId, request);
};

export default createSlabbedFixedInterchangeFeeRule;
