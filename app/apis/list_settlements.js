/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const listSettlements = function listSettlements(page, pageSize, { active, approved, pendingReactivation }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  } else if(pendingReactivation){
    params.pendingReactivation = pendingReactivation
  }

  return apiFetch.authenticatedGet("v1/rules/settlement/list", params);
};

export default listSettlements;
