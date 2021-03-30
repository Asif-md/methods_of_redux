/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const showScheduleType = function showScheduleType(id) {
    return apiFetch.authenticatedGet(`v1/schedulingRule/formatted/settlementRule/${id}`);
};

export default showScheduleType;
