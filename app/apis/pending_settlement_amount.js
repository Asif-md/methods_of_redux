/**
 * Created by ashwin.raghavan on 26/05/17.
 */

import apiFetch from "utils/api_fetch";

const pendingSettlementAmount = function pendingSettlementAmount(merchant) {
  return apiFetch.authenticatedGet(`v1/recovery/invoice/pending/${merchant}`);
}

export default pendingSettlementAmount;