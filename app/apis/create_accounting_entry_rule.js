import apiFetch from 'utils/api_fetch';

const createAccountingEntryRule = function createFixedCommissionRule(rulesetId, request) {
  return apiFetch.createRule("v1/rules/entry", rulesetId, request);
};

export default createAccountingEntryRule;
