/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createSettlementRule = function createSettlementRule(settlementRule) {
   return apiFetch.authenticatedPost("v1/rules/settlement", settlementRule);
};

export default createSettlementRule;
