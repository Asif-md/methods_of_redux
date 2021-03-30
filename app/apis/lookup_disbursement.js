/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const lookupDisbursement = function lookupDisbursement(lookup) {
  return apiFetch.authenticatedPost("v1/rules/disbursement/lookup", lookup);
}

export default lookupDisbursement;