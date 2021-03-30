import apiFetch from "utils/api_fetch";

const listInternalFundTransfers = function listInternalFundTransfers(page, pageSize, { approved }={}) {
  let params = { page, pageSize };
  if (approved) {
    params.approved = approved;
  }

  return apiFetch.authenticatedGet("v1/internalFundTransfer/list", params);
};

export default listInternalFundTransfers;
