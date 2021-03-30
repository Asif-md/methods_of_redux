/**
 * Created by ashwin.raghavan on 26/05/17.
 */

import apiFetch from "utils/api_fetch";

const reconcileInvoice = function reconcileInvoice(merchant, invoiceNos) {
  var invoices = encodeURIComponent(invoiceNos);
  return apiFetch.authenticatedPost(`v1/recovery/reconcile/invoice/${merchant}/${invoices}`);
}

export default reconcileInvoice;