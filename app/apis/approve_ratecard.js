import apiFetch from 'utils/api_fetch';

const approveRatecard = function approveRatecard(merchantId, ruleSetId) {
  return apiFetch.authenticatedPut(`v1/ruleset/summary/approve/${merchantId}/${ruleSetId}`);
};

export default approveRatecard;
