/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const createOnDemand = function createOnDemand(onDemandRule) {
    return apiFetch.authenticatedPost("v1/onDemandSettlement", onDemandRule);
};

export default createOnDemand;
