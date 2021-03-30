/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createComposedCampaignRuleset = function createComposedCampaignRuleset(ruleset) {
  return apiFetch.authenticatedPost("v2/ruleset/composed/campaign", ruleset);
};

export default createComposedCampaignRuleset;