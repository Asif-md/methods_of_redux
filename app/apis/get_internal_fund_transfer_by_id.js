import apiFetch from "utils/api_fetch";

const getInternalFundTransferById = function getInternalFundTransferById(id) {
  return apiFetch.authenticatedGet(`v1/internalFundTransfer/${id}`);
};

export default getInternalFundTransferById;
