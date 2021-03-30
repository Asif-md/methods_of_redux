import apiFetch from 'utils/api_fetch';

const editFixedInterchangeFeeRule = function editFixedInterchangeFeeRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/interchange/fixed/ratecard/${id}`, payload);
};

export default editFixedInterchangeFeeRule;
