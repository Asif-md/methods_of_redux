/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editTaxRule = function editTaxRule(taxRule, id) {

    return apiFetch.authenticatedPut(`v1/rules/tax/${id}`, taxRule);
};


export default editTaxRule;
