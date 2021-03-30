/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createComposedMerchantRuleset = function createComposedMerchantRuleset(ruleset) {
  return apiFetch.authenticatedPost("v2/ruleset/composed/merchant", ruleset);
};

export default createComposedMerchantRuleset;