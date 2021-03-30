import apiFetch from 'utils/api_fetch';

const editSlabbedFixedInterchangeFeeRule = function editSlabbedFixedInterchangeFeeRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/interchange/slabbed/fixed/ratecard/${id}`, payload);
};

export default editSlabbedFixedInterchangeFeeRule;
