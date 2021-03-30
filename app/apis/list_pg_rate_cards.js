/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const listPgRateCards = function listSettlements(page, pageSize) {
  let params = { page, pageSize };
  return apiFetch.authenticatedGet("v1/pgRateCard/list", params);
};

export default listPgRateCards;
