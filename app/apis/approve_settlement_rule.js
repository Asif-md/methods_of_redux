/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const approveSettlement = function approveSettlement(id) {
  return apiFetch.authenticatedPut(`v1/rules/settlement/${id}/approve`);
};

export default approveSettlement;
