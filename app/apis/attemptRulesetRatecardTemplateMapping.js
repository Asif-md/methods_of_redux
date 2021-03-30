/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const attemptRulesetRatecardTemplateMapping = function attemptRulesetRatecardTemplateMapping(ruleSetId, rateCardTemplateId) {
    return apiFetch.authenticatedPost('v1/ruleSetRateCardTemplateMapping/map',{ruleSetId, rateCardTemplateId});
};

export default attemptRulesetRatecardTemplateMapping;
