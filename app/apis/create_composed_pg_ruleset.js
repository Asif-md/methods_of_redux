/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createComposedPGRuleset = function createComposedPGRuleset(ruleset) {
  return apiFetch.authenticatedPost("v1/ruleset/composed/pg", ruleset);
};

export default createComposedPGRuleset;

