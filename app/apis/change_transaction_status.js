/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const changeTransactionStatus = function changeTransactionStatus(id, status) {
  return apiFetch.authenticatedPut(`v1/transaction/reconcile/${id}/${status}`);
}

export default changeTransactionStatus;
