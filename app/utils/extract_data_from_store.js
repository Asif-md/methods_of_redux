import * as rules from "components/rules/rule_types";
import { dateStringToISO } from "utils/helpers";

function extractFixedCommissionRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    commission,
    effectiveFrom,
    effectiveTo,
    priority,
    entryType
  } = rule;

  return {
    name,
    entryFor,
    transactionType: txnType,
    merchantId: rule.merchantSearchResult
      ? rule.merchantSearchResult.details.id
      : "",
    commission,
    effectiveFrom: dateStringToISO(effectiveFrom),
    effectiveTo: dateStringToISO(effectiveTo),
    priority,
    payer: rule.payerSearchResult ? rule.payerSearchResult.details.id : "",
    payerType: rule.payerSearchResult.details.entryType,
    entryType
  };
}

function extractFixedInterchangeFeeRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    paymentGatewayId,
    fee,
    effectiveFrom,
    effectiveTo,
    priority,
    taxable,
    taxes,
    cesses,
    taxAccountId,
    entryType
  } = rule;
 return {
    name,
    entryFor,
    transactionType: txnType,
    interchangeId: paymentGatewayId,
    fee,
    effectiveFrom: dateStringToISO(effectiveFrom),
    effectiveTo: dateStringToISO(effectiveTo),
    priority,
    payer: rule.payerSearchResult ? rule.payerSearchResult.details.id : "",
    payerType: rule.payerSearchResult
      ? rule.payerSearchResult.details.entryType
      : "",
    taxable,
    taxes,
    cesses,
    taxAccountId,
    entryType
  };
}

function extractSlabbedFixedCommissionRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    commissions,
    effectiveFrom,
    effectiveTo,
    priority,
    entryType
  } = rule;

  return {
    name,
    entryFor,
    transactionType: txnType,
    merchantId: rule.merchantSearchResult
      ? rule.merchantSearchResult.details.id
      : "",
    commissions,
    effectiveFrom: dateStringToISO(effectiveFrom),
    effectiveTo: dateStringToISO(effectiveTo),
    priority,
    payer: rule.payerSearchResult ? rule.payerSearchResult.details.id : "",
    payerType: rule.payerSearchResult
      ? rule.payerSearchResult.details.entryType
      : ""
  };
}

function extractSlabbedFixedInterchangeFeeRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    paymentGatewayId,
    fee,
    effectiveFrom,
    effectiveTo,
    priority,
    taxable,
    taxes,
    cesses,
    taxAccountId,
    entryType
  } = rule;

  return {
    name,
    entryFor,
    transactionType: txnType,
    interchangeId: paymentGatewayId,
    fee,
    effectiveFrom: dateStringToISO(effectiveFrom),
    effectiveTo: dateStringToISO(effectiveTo),
    priority,
    payer: rule.payerSearchResult ? rule.payerSearchResult.details.id : "",
    payerType: rule.payerSearchResult
      ? rule.payerSearchResult.details.entryType
      : "",
    taxable,
    taxes,
    cesses,
    taxAccountId,
    entryType
  };
}

function extractAccountingEntryRuleData(rule) {
  const { name, entryFor, entryType, transactionType, filterExpression } = rule;
  return {
    name,
    entryFor,
    transactionType,
    filterExpression,
    ...extractPartyType(rule, rule.toPartySearchResult, "to"),
    ...extractPartyType(rule, rule.fromPartySearchResult, "from"),
    entryType
  };
}


function extractAccountingPreCalEntryRuleData(rule) {
  const {  name,filterExpression,transactionType, entryFor, entryType, taxable,taxExemptionThreshold } = rule;
  return {
    name,
    filterExpression,
    transactionType,
    entryFor,
    transactionType,
    filterExpression,
    ...extractPartyType(rule, rule.toPartySearchResult, "to"),
    ...extractPartyType(rule, rule.fromPartySearchResult, "from"),
    entryType,
    taxable,
    taxExemptionThreshold
  };
}


function extractPartyType(rule, searchResult, type) {
  let party = "";
  let partyType = rule[type + "PartyType"];
  let partyExpression = rule[type + "Expression"];
  if (partyExpression || !Array.isArray(searchResult.details)) {
    party = searchResult.details.id || "";
  } else if (partyType === "User") {
    party = "USER";
  } else {
    party =
      searchResult && searchResult.locked
        ? searchResult.details[searchResult.index].id
        : "";
  }
  return {
    [type + "Party"]: party,
    [type + "PartyType"]: partyType,
    [type + "Expression"]: partyExpression
  };
}

function extractBasicRateCardRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    entryType,
    slabbedFee,
    slabbedFees,
    commission,
    countBasedWaiver,
    filterExpression,
    perTransaction,
    systemReversible,
    taxable,
    timeBasedWaiver,
    waiverLimitCount,
    taxExemptionThreshold,
    waiverStartDate,
    waiverEndDate,
    value,
    rate
  } = rule;
  return {
    name,
    entryFor,
    transactionType: txnType,
    ...extractPartyType(rule, rule.toPartySearchResult, "to"),
    ...extractPartyType(rule, rule.fromPartySearchResult, "from"),
    entryType,
    commission,
    countBasedWaiver,
    filterExpression,
    perTransaction,
    systemReversible,
    taxable,
    timeBasedWaiver,
    waiverLimitCount,
    taxExemptionThreshold,
    slabbedFee,
    slabbedFees,
    rate,
    value,
    waiverStartDate: dateStringToISO(waiverStartDate),
    waiverEndDate: dateStringToISO(waiverEndDate)
  };
}

function extractCountBasedRateCardRuleData(rule) {
  const {
    name,
    entryFor,
    txnType,
    entryType,
    commission,
    countBasedWaiver,
    filterExpression,
    perTransaction,
    systemReversible,
    taxable,
    timeBasedWaiver,
    waiverLimitCount,
    taxExemptionThreshold,
    waiverStartDate,
    waiverEndDate,
    postFact,
    calculationWindowUnit,
    calculationFrequency,
    countBasedSlabs
  } = rule;
  return {
    name,
    entryFor,
    transactionType: txnType,
    ...extractPartyType(rule, rule.toPartySearchResult, "to"),
    ...extractPartyType(rule, rule.fromPartySearchResult, "from"),
    entryType,
    commission,
    countBasedWaiver,
    filterExpression,
    perTransaction,
    systemReversible,
    taxable,
    timeBasedWaiver,
    waiverLimitCount,
    taxExemptionThreshold,
    waiverStartDate: dateStringToISO(waiverStartDate),
    waiverEndDate: dateStringToISO(waiverEndDate),
    postFact,
    calculationWindowUnit,
    calculationFrequency,
    countBasedSlabs
  };
}

function extractRuleData(ruleType, rule) {
  switch (ruleType) {
    case rules.FIXED_COMMISSION_RULE:
    case rules.FIXED_RATE_COMMISSION_RULE:
      return extractFixedCommissionRuleData(rule);
    case rules.FIXED_INTERCHANGE_FEE_RULE:
    case rules.FIXED_RATE_INTERCHANGE_FEE_RULE:
      return extractFixedInterchangeFeeRuleData(rule);
    case rules.SLABBED_FIXED_COMMISSION_RULE:
    case rules.SLABBED_FIXED_RATE_COMMISSION_RULE:
      return extractSlabbedFixedCommissionRuleData(rule);
    case rules.SLABBED_FIXED_INTERCHANGE_FEE_RULE:
    case rules.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE:
      return extractSlabbedFixedInterchangeFeeRuleData(rule);
    case rules.ACCOUNT_ENTRY_RULE:
      return extractAccountingEntryRuleData(rule);
    case rules.BASIC_RATE_CARD_RULE:
      return extractBasicRateCardRuleData(rule);
    case rules.COUNT_BASED_RATE_CARD_RULE:
      return extractCountBasedRateCardRuleData(rule);
      case rules.PRE_CALCULATED_RATE_CARD_RULE:
        return extractAccountingPreCalEntryRuleData(rule);
    default:
      return {};
  }
}

export function extractRuleFromStore(rule) {
  const ruleType = rule.type;

  return {
    type: ruleType,
    data: extractRuleData(ruleType, rule)
  };
}
