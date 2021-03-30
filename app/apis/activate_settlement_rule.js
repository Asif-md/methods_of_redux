/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const activateSettlement = function activateSettlement(id) {
  return apiFetch.authenticatedPut(`v1/rules/settlement/${id}/activate`);
};

export default activateSettlement;