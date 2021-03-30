import apiFetch from "utils/api_fetch";
import * as ruleTypes from "components/rules/rule_types";

function activateEndpoint(id, ruleType) {
  switch(ruleType) {
    case ruleTypes.FIXED_COMMISSION_RULE:
      return `v1/rules/commission/fixed/${id}/activate`;
    case ruleTypes.FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/fixed/${id}/activate`;
    case ruleTypes.FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/fixed/rate/${id}/activate`;
    case ruleTypes.FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/rate/${id}/activate`;
    case ruleTypes.SLABBED_FIXED_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/fixed/${id}/activate`;
    case ruleTypes.SLABBED_FIXED_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/fixed/${id}/activate`;
    case ruleTypes.SLABBED_FIXED_RATE_COMMISSION_RULE:
      return `v1/rules/commission/slabbed/rate/${id}/activate`;
    case ruleTypes.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE:
      return `v1/rules/interchange/slabbed/rate/${id}/activate`;
    case ruleTypes.ACCOUNT_ENTRY_RULE:
      return `v1/rules/entry/${id}/activate`;
    default:
      return new Error(`did not recognize ruleType ${ruleType}`);
  }
}

const activateRule = function activateRule(id, { ruleType }) {
  return apiFetch.authenticatedPut(activateEndpoint(id, ruleType));
};

export default activateRule;
