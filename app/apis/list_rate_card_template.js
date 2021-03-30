import apiFetch from "utils/api_fetch";

const listRateCardTemplate = function listRateCardTemplate(
  page,
  pageSize,
  { active, approved, event, noFilter } = {},
  {
    pgId,
    shortId,
    merchant,
    providerName,
    rules

    // cardType,
    // slabbedFee,

    // slabbedFees
  } = {}
) {
  let params = {};
  page && (params.page = page);
  pageSize && (params.pageSize = pageSize);
  if (active) {
    params.active = active;
  } else if (approved) {
    params.approved = approved;
  }

  if (noFilter) {
    params.noFilters = noFilter;
  }

  if (event) {
    params.event = event;
  }

  // if (cardType) {
  //   params.slabbedFee = slabbedFee;
  // }
  // shortId && (params.shortId = shortId);

  // if (cardType === "BASIC_RATE_CARD" && "COUNT_BASED_RATE_CARD") {
  //   cardType && (params.card_type = cardType);
  // }

  // if (slabbedFee !== "Select Slabbed Condition") {
  //   slabbedFee && (params.slabbedFee = slabbedFee);
  // }

  // if (rate !== "Select Rate") {
  //   rate && (params.rate = rate);
  // }

  // DecimalValue && (params.value = DecimalValue);

  // pgId && (data.pgId = pgId);
  // merchant && (data.merchant = merchant);
  // providerName && (data.providerName = providerName);

  // if(pgId === ""){
  //   data.pgId
  // }

  // slabbedFees: [
  //   {
  //     fromAmount: fromAmount,
  //     toAmount: toAmount,
  //     value: 0,
  //     rate: true
  //   }
  // ]

  let data = {};

  shortId && (data.shortId = shortId);
  pgId && (data.pgId = pgId);
  merchant && (data.merchant = merchant);

  // if (rules.slabbedFees == []) {
  //   delete data.rules.slabbedFees;
  // } else {
  //   rules && (data.rules = rules);
  // }

  if (rules) {
    rules && (data.rules = rules);
  }

  // cardType && data.rules.push((card_type = cardType));
  // slabbedFee && (data.rules.slabbedFee = slabbedFee);

  // if (slabbedFee == true) {
  //   slabbedFees && (data.rules.slabbedFees = slabbedFees);
  // }

  // pgId: pgId,
  //   marchant: merchant,
  //   rules: [
  //     {
  //       card_type: cardType,
  //       slabbedFee: slabbedFee,
  //       slabbedFees: slabbedFees
  //     }
  //   ]

  // if (slabbedFee === false && data.slabbedFee === false) {
  //   return delete data.slabbedFees;
  // }

  return apiFetch.authenticatedPost("v1/rateCardTemplate/similar", data);
};

export default listRateCardTemplate;
