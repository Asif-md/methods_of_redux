/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const editSettlementRule = function editSettlementRule(settlement, id) {
   return apiFetch.authenticatedPut(`v1/rules/settlement/${id}`, settlement);
};

export default editSettlementRule;
