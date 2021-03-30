/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editInvoice = function editInvoice(invoice, id) {
  return apiFetch.authenticatedPut(`v1/rules/invoice/${id}`, invoice);
};

export default editInvoice;
