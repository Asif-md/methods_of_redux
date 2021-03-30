import apiFetch from 'utils/api_fetch';

const editSlabbedFixedRateInterchangeFeeRule = function editSlabbedFixedRateInterchangeFeeRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/interchange/slabbed/rate/ratecard/${id}`, payload);
};

export default editSlabbedFixedRateInterchangeFeeRule;
