/**
 * Created by ashwin.raghavan on 24/08/17.
 */

import apiFetch from "utils/api_fetch";

const createPG = function createPG(pg) {
  return apiFetch.authenticatedPost("v1/ruleset/composed/pg", pg);
};

export default createPG;