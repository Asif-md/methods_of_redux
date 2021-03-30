/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const countSearch = function countSearch(listType, searchTerm, { active, approved, verified, event}={}) {
  let params = { };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  } else if (verified) {
    params.verified = verified;
  }

  if (event) {
    params.event = event;
  }

  if (listType === 'settlement')
    return apiFetch.authenticatedGet(`v1/rules/${listType}/count/search/${searchTerm}`, params);
  else
    return apiFetch.authenticatedGet(`v1/${listType}/count/search/${searchTerm}`, params);
};

export default countSearch;
