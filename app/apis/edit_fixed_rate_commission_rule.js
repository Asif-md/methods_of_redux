import apiFetch from 'utils/api_fetch';

const editFixedRateCommissionRule = function editFixedRateCommissionRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/commission/fixed/rate/ratecard/${id}`, payload);
};

export default editFixedRateCommissionRule;
