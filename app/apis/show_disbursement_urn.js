/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import apiFetch from 'utils/api_fetch';

const showDisbursementByUrn = function showDisbursementByUrn(urn) {
  return apiFetch.authenticatedGet(`v1/transaction/disbursement/status/${urn}`);
};

export default showDisbursementByUrn;