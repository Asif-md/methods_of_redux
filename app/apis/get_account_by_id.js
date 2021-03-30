/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const getAccountById = function getAccountById(id) {
  return apiFetch.authenticatedGet(`v1/account/${id}`);
};

export default getAccountById;
