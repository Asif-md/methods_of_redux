/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const deactivateSettlement = function deactivateSettlement(id) {
  return apiFetch.authenticatedPut(`v1/rules/settlement/${id}/deactivate`);
};

export default deactivateSettlement;
