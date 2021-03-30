import apiFetch from 'utils/api_fetch';

const activateRatecard = function activateRatecard(merchantId, ruleSetId) {
  return apiFetch.authenticatedPut(`v1/ruleset/summary/activate/${merchantId}/${ruleSetId}`);
};

export default activateRatecard;
