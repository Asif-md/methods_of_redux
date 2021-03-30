import apiFetch from 'utils/api_fetch';

const editFixedCommissionRule = function editFixedCommissionRule(id, payload) {
  return apiFetch.authenticatedPut(`v1/rules/commission/fixed/ratecard/${id}`, payload);
};

export default editFixedCommissionRule;
