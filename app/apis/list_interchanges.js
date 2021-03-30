import apiFetch from "utils/api_fetch";

const listInterchanges = function listInterchanges(page, pageSize, { active, approved, pendingReactivation }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }else if(pendingReactivation){
    params.pendingReactivation = pendingReactivation
  }

  return apiFetch.authenticatedGet("v1/interchange/list", params);
};

export default listInterchanges;
