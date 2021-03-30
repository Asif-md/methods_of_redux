/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editInterchange = function editInterchange(interchange, id) {
  return apiFetch.authenticatedPut(`v1/interchange/${id}`, interchange);
};

export default editInterchange;
