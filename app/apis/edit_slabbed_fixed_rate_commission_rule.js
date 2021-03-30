import apiFetch from 'utils/api_fetch';

const editSlabbedFixedRateCommissionRule = function editSlabbedFixedRateCommissionRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/commission/slabbed/rate/ratecard/${id}`, payload);
};

export default editSlabbedFixedRateCommissionRule;
