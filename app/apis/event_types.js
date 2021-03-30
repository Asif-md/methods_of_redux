/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const eventTypes = function eventTypes() {
  return apiFetch.authenticatedGet("v1/ruleset/events");
};

export default eventTypes;

