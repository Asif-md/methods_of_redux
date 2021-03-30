/**
 * Created by ashwin.raghavan on 26/05/17.
 */

import apiFetch from "utils/api_fetch";

const invalidateInvoice = function invalidateInvoice(merchant, invoiceNos) {
  var invoices = encodeURIComponent(invoiceNos);
  return apiFetch.authenticatedPost(`v1/recovery/invalidate/invoice/${merchant}/${invoices}`);
}

export default invalidateInvoice;