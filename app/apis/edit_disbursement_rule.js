/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editDisbursement = function editDisbursement(disbursement, id) {
  return apiFetch.authenticatedPut(`v1/rules/disbursement/${id}`, disbursement);
};

export default editDisbursement;
