/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const getInterchangeById = function getInterchangeById(id) {
  return apiFetch.authenticatedGet(`v1/interchange/${id}`);
};

export default getInterchangeById;
