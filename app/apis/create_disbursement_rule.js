/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createDisbursementRule = function createDisbursementRule(disbursement) {
  return apiFetch.authenticatedPost("v1/rules/disbursement", disbursement);
};

export default createDisbursementRule;
