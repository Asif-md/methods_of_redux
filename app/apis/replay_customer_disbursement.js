/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import apiFetch from 'utils/api_fetch';

const replayCustomerDisbursement = function replayCustomerDisbursement(urn) {
  return apiFetch.authenticatedPost(`v1/transaction/disbursement/customer/replay/${urn}`);
};

export default replayCustomerDisbursement;