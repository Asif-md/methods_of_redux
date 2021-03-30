/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const lookupInvoice = function lookupInvoice(lookup) {
  return apiFetch.authenticatedPost("v1/rules/invoice/lookup", lookup);
}

export default lookupInvoice;