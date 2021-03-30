import apiFetch from 'utils/api_fetch';

const deactivateRatecard = function deactivateRatecard(merchantId, ruleSetId) {
  return apiFetch.authenticatedPut(`v1/ruleset/summary/deactivate/${merchantId}/${ruleSetId}`);
};

export default deactivateRatecard;
