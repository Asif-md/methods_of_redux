import apiFetch from 'utils/api_fetch';

const generateReport = function generateReport(report) {
  return apiFetch.authenticatedPost("v1/reporting/generate", report);
};

export default generateReport;
