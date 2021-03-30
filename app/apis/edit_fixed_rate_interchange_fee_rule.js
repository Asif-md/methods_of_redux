import apiFetch from 'utils/api_fetch';

const editFixedRateInterchangeFeeRule = function editFixedRateInterchangeFeeRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/interchange/rate/ratecard/${id}`, payload);
};

export default editFixedRateInterchangeFeeRule;
