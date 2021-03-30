/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createInvoiceRule = function createInvoiceRule(invoiceRule) {
  return apiFetch.authenticatedPost("v1/rules/invoice", invoiceRule);
};

export default createInvoiceRule;
