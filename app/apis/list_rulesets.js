import apiFetch from "utils/api_fetch";

const listRulesets = function listRulesets(page, pageSize, { active, approved, event, noFilter}={}, {pgIdFilter, searchTerm, merchantFilter, providerNameFilter} = {}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }
  if (noFilter) {
    params.noFilters = noFilter;
  }

  if (event) {
    params.forEvent = event;
  }
  searchTerm && (params.searchTerm = searchTerm)
  pgIdFilter && (params.pgIdFilter = pgIdFilter)
  merchantFilter && (params.merchantFilter = merchantFilter)
  providerNameFilter && (params.providerNameFilter = providerNameFilter)
  return apiFetch.authenticatedGet("v1/ruleset/search", params);
};

export default listRulesets;
