/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createComposedAggregatorRuleset = function createComposedAggregatorRuleset(ruleset) {
  return apiFetch.authenticatedPost("v1/ruleset/composed/aggregator", ruleset);
};

export default createComposedAggregatorRuleset;

