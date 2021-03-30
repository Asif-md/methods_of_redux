import apiFetch from 'utils/api_fetch';

const listMerchants = function listMerchants(page, pageSize, { active, approved, verified, pendingReactivation }={}) {
  let params = { page, pageSize };
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  } else if (verified) {
    params.verified = verified;
  }else if(pendingReactivation){
    params.pendingReactivation = pendingReactivation
  }
  return apiFetch.authenticatedGet("v1/merchant/list", params);
};

export default listMerchants;
