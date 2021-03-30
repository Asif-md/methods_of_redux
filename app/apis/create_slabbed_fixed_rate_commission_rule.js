import apiFetch from 'utils/api_fetch';

const createSlabbedFixedRateCommissionRule = function createSlabbedFixedRateCommissionRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/commission/slabbed/rate", rulesetId, request);
};

export default createSlabbedFixedRateCommissionRule;
