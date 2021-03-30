/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const searchList = function searchList(listType, searchTerm, { active, approved, verified, event }={}) {
  let params = {};
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
    return apiFetch.authenticatedGet(`v1/rules/${listType}/search/${searchTerm}`, params);
  else
    return apiFetch.authenticatedGet(`v1/${listType}/search/${searchTerm}`, params);
};

export default searchList;

