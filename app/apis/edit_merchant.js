/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editMerchant = function editMerchant(merchant, id) {
  return apiFetch.authenticatedPut(`v1/merchant/${id}`, merchant);
};

export default editMerchant;
