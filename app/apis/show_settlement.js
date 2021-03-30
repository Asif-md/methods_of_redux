/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const showSettlement = function showSettlement(id) {
  return apiFetch.authenticatedGet(`v1/rules/settlement/${id}`);
};

export default showSettlement;

