/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const serviceTypes = function serviceTypes() {
  return apiFetch.authenticatedGet("v2/biller/services");
};

export default serviceTypes;

