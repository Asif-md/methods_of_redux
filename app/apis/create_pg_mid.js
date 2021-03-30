/**
 * Created by ashwin.raghavan on 24/08/17.
 */

import apiFetch from "utils/api_fetch";

const createPgMId = function createPgMId(pgMId) {
  return apiFetch.authenticatedPost("v1/pgMId", pgMId);
};

export default createPgMId;