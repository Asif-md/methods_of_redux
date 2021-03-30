/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createMerchantRuleset = function createMerchantRuleset(merchantRuleset) {
  return apiFetch.authenticatedPost("v2/ruleset/composed/merchant", merchantRuleset);
};

export default createMerchantRuleset;


