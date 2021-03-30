/**
 * Created by ashwin.raghavan on 24/08/17.
 */

import apiFetch from "utils/api_fetch";

const createPgRateCard = function createPgRateCard(pgRateCard) {
  return apiFetch.authenticatedPost("v1/pgRateCard", pgRateCard);
};

export default createPgRateCard;