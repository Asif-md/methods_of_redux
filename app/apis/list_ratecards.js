/**
 * Created by ashwin.raghavan on 13/02/17.
 */

import apiFetch from "utils/api_fetch";

const listRatecards = function listRatecards(merchantId) {
  return apiFetch.authenticatedGet(`v1/ruleset/summary/${merchantId}`);
};

export default listRatecards;
