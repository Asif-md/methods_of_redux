/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editAccount = function editAccount(account, id) {
  return apiFetch.authenticatedPut(`v1/account/${id}`, account);
};

export default editAccount;
