/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import apiFetch from 'utils/api_fetch';

const closeToa = function closeToa(data) {
  return apiFetch.authenticatedPost(`v1/transaction/toa/close`, data);
};

export default closeToa;