import apiFetch from "utils/api_fetch";
import * as ruleTypes from "components/rules/rule_types";

function approveEndpoint(id, ruleType) {
  switch (ruleType.trim()) {
    case ruleTypes.FIXED_COMMISSION_RULE:
      return `v1/rules/commission/fixed/${id}/approve`;
    case ruleTypes.FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/fixed/${id}/approve`;
    case ruleTypes.FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/fixed/rate/${id}/approve`;
    case ruleTypes.FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/rate/${id}/approve`;
    case ruleTypes.SLABBED_FIXED_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/fixed/${id}/approve`;
    case ruleTypes.SLABBED_FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/fixed/${id}/approve`;
    case ruleTypes.SLABBED_FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/rate/${id}/approve`;
    case ruleTypes.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/rate/${id}/approve`;
    case ruleTypes.ACCOUNT_ENTRY_RULE:
      return `v1/rules/entry/${id}/approve`;
    default:
      return new Error(`did not recognize ruleType ${ruleType}`);
  }
}

const approveRule = function approveRule(id, { ruleType }) {
  return apiFetch.authenticatedPut(approveEndpoint(id, ruleType));
};

export default approveRule;
