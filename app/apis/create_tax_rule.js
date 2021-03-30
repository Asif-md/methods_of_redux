import apiFetch from 'utils/api_fetch';

const createTaxRule = function createTaxRule(taxRule) {
    return apiFetch.authenticatedPost("v1/rules/tax", taxRule);
};

export default createTaxRule;
