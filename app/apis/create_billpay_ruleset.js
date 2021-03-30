/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createBillpayRuleset = function createBillpayRuleset(billpay) {
  return apiFetch.authenticatedPost("v1/ruleset/composed/billpay", billpay);
};

export default createBillpayRuleset;

