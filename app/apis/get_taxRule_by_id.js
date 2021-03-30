/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const getTaxRuleById = function getTaxRuleById(id) {
    return apiFetch.authenticatedGet(`v1/rules/tax/${id}`);
};

export default getTaxRuleById;
