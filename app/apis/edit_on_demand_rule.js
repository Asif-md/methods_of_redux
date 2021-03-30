/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const editOnDemand = function editOnDemand(onDemand, id) {
    return apiFetch.authenticatedPut(`v1/onDemandSettlement/${id}`, onDemand);
};

export default editOnDemand;

