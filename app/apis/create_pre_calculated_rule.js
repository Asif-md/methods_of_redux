import apiFetch from 'utils/api_fetch';

const createPreCalRuleset = function createPreCalRuleset(ruleset,request) {
  return apiFetch.createRule("v1/rules/preRateCardRule/entry", ruleset, request);
};


export default createPreCalRuleset;
