import apiFetch from "utils/api_fetch";

const listPgMIds = function listPgMIds(page, pageSize, { active, approved }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }

  return apiFetch.authenticatedGet("v1/pgMId/list", params);
};

export default listPgMIds;
