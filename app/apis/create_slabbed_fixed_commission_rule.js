import apiFetch from 'utils/api_fetch';

const createSlabbedFixedCommissionRule = function createSlabbedFixedCommissionRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/commission/slabbed/fixed", rulesetId, request);
};

export default createSlabbedFixedCommissionRule;
