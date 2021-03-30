/**
 * Created by ashwin.raghavan on 12/01/17.
 */

import apiFetch from 'utils/api_fetch';

const utrLookup = function utrLookup(utr) {
  return apiFetch.authenticatedGet(`v1/lookup/utr/${utr}`);
};

export default utrLookup;


