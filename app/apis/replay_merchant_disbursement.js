/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import apiFetch from 'utils/api_fetch';

const replayMerchantDisbursement = function replayMerchantDisbursement(urn) {
  return apiFetch.authenticatedPost(`v1/transaction/disbursement/merchant/replay/${urn}`);
};

export default replayMerchantDisbursement;