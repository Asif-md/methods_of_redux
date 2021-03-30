import apiFetch from "utils/api_fetch";
import * as ruleTypes from "components/rules/rule_types";

function deactivateEndpoint(id, ruleType) {
  switch(ruleType) {
    case ruleTypes.FIXED_COMMISSION_RULE:
      return `v1/rules/commission/fixed/${id}/deactivate`;
    case ruleTypes.FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/fixed/${id}/deactivate`;
    case ruleTypes.FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/fixed/rate/${id}/deactivate`;
    case ruleTypes.FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/rate/${id}/deactivate`;
    case ruleTypes.SLABBED_FIXED_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/fixed/${id}/deactivate`;
    case ruleTypes.SLABBED_FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/fixed/${id}/deactivate`;
    case ruleTypes.SLABBED_FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/rate/${id}/deactivate`;
    case ruleTypes.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/rate/${id}/deactivate`;
    case ruleTypes.ACCOUNT_ENTRY_RULE:
      return `v1/rules/entry/${id}/deactivate`;
    default:
      return new Error(`did not recognize ruleType ${ruleType}`);
  }
}

const deactivateRule = function deactivateRule(id, { ruleType }) {
  return apiFetch.authenticatedPut(deactivateEndpoint(id, ruleType));
};

export default deactivateRule;
