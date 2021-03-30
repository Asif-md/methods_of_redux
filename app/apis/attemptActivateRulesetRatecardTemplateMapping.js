/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const attemptActivateRulesetRatecardTemplateMapping = function attemptActivateRulesetRatecardTemplateMapping(rulesetId, mappingId, activate) {
    if(activate){
        return apiFetch.authenticatedPut(`v1/ruleSetRateCardTemplateMapping/activate/${rulesetId}/${mappingId}`);
    }else{
        return apiFetch.authenticatedPut(`v1/ruleSetRateCardTemplateMapping/deactivate/${rulesetId}/${mappingId}`);
    }  
};

export default attemptActivateRulesetRatecardTemplateMapping;
