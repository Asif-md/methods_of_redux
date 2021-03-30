/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editRuleset = function editRuleset(ruleset, id) {
  return apiFetch.authenticatedPut(`v1/ruleset/${id}`, ruleset);
};

export default editRuleset;
