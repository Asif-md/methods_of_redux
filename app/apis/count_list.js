/**
 * @author ashwin.raghavan
 */

import apiFetch from "utils/api_fetch";

const countLists = function countLists(
  listType,
  { active, approved, event, noFilter, pendingReactivation } = {},
  {
    pgId,
    shortId,
    merchant,
    providerName,
    pgIdFilter,
    searchTerm,
    merchantFilter,
    providerNameFilter,
    DecimalValue,
    cardType,
    slabbedFee,
    rate
  } = {}
) {
  let params = {};
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  } else if (pendingReactivation) {
    params.pendingReactivation = pendingReactivation;
  }
  if (noFilter) {
    params.noFilters = noFilter;
  }

  if (event) {
    params.event = event;
  }

  if (listType === "rateCardTemplate") {
    shortId && (params.shortId = shortId);
    pgId && (params.pgId = pgId);
    merchant && (params.merchant = merchant);
    providerName && (params.providerName = providerName);
    if (cardType === "BASIC_RATE_CARD" && "COUNT_BASED_RATE_CARD") {
      cardType && (params.card_type = cardType);
    }

    if (slabbedFee !== "Select Slabbed Condition") {
      slabbedFee && (params.slabbedFee = slabbedFee);
    }

    DecimalValue && (params.value = DecimalValue);
    rate && (params.rate = rate);

    return apiFetch.authenticatedGet(`v1/${listType}/count/search`, params);
  } else if (listType == "ruleset") {
    searchTerm && (params.searchTerm = searchTerm);
    pgIdFilter && (params.pgIdFilter = pgIdFilter);
    params.event && (params.forEvent = params.event);
    merchantFilter && (params.merchantFilter = merchantFilter);
    providerNameFilter && (params.providerNameFilter = providerNameFilter);
    delete params.event;

    return apiFetch.authenticatedGet(`v1/${listType}/count/search`, params);
  } else {
    return apiFetch.authenticatedGet(`v1/${listType}/count`, params);
  }
};

export default countLists;
