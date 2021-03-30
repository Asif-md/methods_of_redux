/**
 * Created by ashwin.raghavan on 11/01/17.
 */

import apiFetch from "utils/api_fetch";

const listMerchantDisbursements = function listMerchantDisbursements(interchangeId, merchantId, pageNo, pageSize) {
  let params = { pageNo, pageSize };

  return apiFetch.authenticatedGet(`v1/merchant/settlements/disbursements/${interchangeId}/${merchantId}`, params);
};

export default listMerchantDisbursements;
