import apiFetch from 'utils/api_fetch';

const editSlabbedFixedCommissionRule = function editSlabbedFixedCommissionRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/commission/slabbed/fixed/ratecard/${id}`, payload);
};

export default editSlabbedFixedCommissionRule;
