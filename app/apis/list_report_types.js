import apiFetch from 'utils/api_fetch';

const listReportTypes = function listReportTypes() {
  return apiFetch.authenticatedGet("v1/reporting/list");
};

export default listReportTypes;
