/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const getMerchantById = function getMerchantById(id) {
  return apiFetch.authenticatedGet(`v1/merchant/${id}`);
};

export default getMerchantById;
