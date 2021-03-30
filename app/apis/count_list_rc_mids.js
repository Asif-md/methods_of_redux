/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const countListRCMIds = function countListRCMIds(listType, rateCardId, { active, approved, event }={}) {
  let params = { };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }

  if (event) {
    params.event = event;
  }
  return apiFetch.authenticatedGet(`v1/${listType}/count/${rateCardId}`, params);
};

export default countListRCMIds;

