import apiFetch from 'utils/api_fetch';

const deactivateTaxRule = function deactivateTaxRule(id) {
    return apiFetch.authenticatedPut(`v1/rules/tax/${id}/deactivate`);
};

export default deactivateTaxRule;
