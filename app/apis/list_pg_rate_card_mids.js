import apiFetch from "utils/api_fetch";

const listPgRateCardMIds = function listPgRateCardMIds(pgRateCardId, page, pageSize, { active, approved }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }

  return apiFetch.authenticatedGet(`v1/pgRateCard/mIds/${pgRateCardId}`, params);
};

export default listPgRateCardMIds;
