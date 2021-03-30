/**
 * @author ashwin.raghavan
 */
import apiFetch from "utils/api_fetch";

const getOnDemandById = function getOnDemandById(id) {
    return apiFetch.authenticatedGet(`v1/onDemandSettlement/${id}`);
};

export default getOnDemandById;
