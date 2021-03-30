import apiFetch from 'utils/api_fetch';

const showTaxRule = function showTaxRule(id) {
    return apiFetch.authenticatedGet(`v1/rules/tax/${id}`);
};

export default showTaxRule;
