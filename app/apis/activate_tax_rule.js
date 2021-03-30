import apiFetch from 'utils/api_fetch';

const activateTaxRule = function activateTaxRule(id) {
    return apiFetch.authenticatedPut(`v1/rules/tax/${id}/activate`);
};

export default activateTaxRule;
