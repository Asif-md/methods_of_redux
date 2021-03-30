import apiFetch from 'utils/api_fetch';

const approveTaxRule = function approveTaxRule(id) {
    return apiFetch.authenticatedPut(`v1/rules/tax/${id}/approve`);
};

export default approveTaxRule;
