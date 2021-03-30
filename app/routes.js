import history from "./history";

export const ROOT_PATH = "/ui";

export function forwardToRootPath() {
  history.replace(ROOT_PATH);
}

export const LOGIN_PATH = `${ROOT_PATH}/login`;
export const LOGOUT_PATH = `${ROOT_PATH}/logout`;

export function forwardToLoginPath() {
  history.replace(LOGIN_PATH);
}

export function forwardToRatecardSummaryPath() {
  history.push(SHOW_RATECARD_PATH);
}

export function forwardToListPath(recordType) {
  var LIST_PATH = `${ROOT_PATH}/${recordType}`;
  history.push(LIST_PATH);
}

export const ADD_TRANSACTION_PATH = `${ROOT_PATH}/addTransactionType`;
export const TRANSACTION_TYPE_DETAILS = `${ROOT_PATH}/addTransactionType/:id`;

export const LIST_MERCHANTS_PATH = `${ROOT_PATH}/merchants`;
export const CREATE_MERCHANT_PATH = `${ROOT_PATH}/merchant/new`;
export const SHOW_MERCHANT_PATH = `${ROOT_PATH}/merchant/:merchantId`;
export const EDIT_MERCHANT_PATH = `${ROOT_PATH}/merchant/edit/:merchantId`;

export function merchantPath(merchantId) {
  return `${ROOT_PATH}/merchant/${merchantId}`;
}

export function editMerchantPath(merchantId) {
  return `${ROOT_PATH}/merchant/edit/${merchantId}`;
}

export const LIST_RULESETS_PATH = `${ROOT_PATH}/rulesets`;
export const CREATE_RULESET_PATH = `${ROOT_PATH}/ruleset/new`;
export const SHOW_RULESET_PATH = `${ROOT_PATH}/ruleset/:rulesetId`;
export const EDIT_RULESET_PATH = `${ROOT_PATH}/ruleset/edit/:rulesetId`;

export function rulesetPath(rulesetId) {
  return `${ROOT_PATH}/ruleset/${rulesetId}`;
}

export function editRulesetPath(rulesetId) {
  return `${ROOT_PATH}/ruleset/edit/${rulesetId}`;
}

export const LIST_ACCOUNTS_PATH = `${ROOT_PATH}/accounts`;
export const CREATE_ACCOUNT_PATH = `${ROOT_PATH}/account/new`;
export const SHOW_ACCOUNT_PATH = `${ROOT_PATH}/account/:accountId`;
export const EDIT_ACCOUNT_PATH = `${ROOT_PATH}/account/edit/:accountId`;

export function accountPath(accountId) {
  return `${ROOT_PATH}/account/${accountId}`;
}

export function editAccountPath(accountId) {
  return `${ROOT_PATH}/account/edit/${accountId}`;
}

export function internalFundTransferPath(internalFundTransferId) {
  return `${ROOT_PATH}/internalFundTransfer/${internalFundTransferId}`;
}

export const LIST_INTERCHANGES_PATH = `${ROOT_PATH}/interchanges`;
export const CREATE_INTERCHANGE_PATH = `${ROOT_PATH}/interchange/new`;
export const SHOW_INTERCHANGE_PATH = `${ROOT_PATH}/interchange/:interchangeId`;
export const EDIT_INTERCHANGE_PATH = `${ROOT_PATH}/interchange/edit/:interchangeId`;

export const LIST_TAX_RULES_PATH = `${ROOT_PATH}/tax-rules`;
export const CREATE_TAX_RULE_PATH = `${ROOT_PATH}/tax-rule/new`;
export const SHOW_TAX_RULE_PATH = `${ROOT_PATH}/tax-rule/:taxRuleId`;
export const EDIT_TAX_RULE_PATH = `${ROOT_PATH}/tax-rule/edit/:taxRuleId`;



export function interchangePath(interchangeId) {
  return `${ROOT_PATH}/interchange/${interchangeId}`;
}

export function taxRulePath(taxRuleId) {
  return `${ROOT_PATH}/tax-rule/${taxRuleId}`;
}

export function editInterchangePath(interchangeId) {
  return `${ROOT_PATH}/interchange/edit/${interchangeId}`;
}

export function editTaxRulePath(taxRuleId) {
  return `${ROOT_PATH}/tax-rule/edit/${taxRuleId}`;
}

export const LIST_SETTLEMENTS_PATH = `${ROOT_PATH}/settlements`;
export const CREATE_SETTLEMENT_PATH = `${ROOT_PATH}/settlement/new`;
export const SHOW_SETTLEMENT_PATH = `${ROOT_PATH}/settlement/:settlementId`;
export const EDIT_SETTLEMENT_PATH = `${ROOT_PATH}/settlement/edit/:settlementId`;

export function settlementPath(settlementId) {
  return `${ROOT_PATH}/settlement/${settlementId}`;
}

export function editSettlementPath(settlementId) {
  return `${ROOT_PATH}/settlement/edit/${settlementId}`;
}

export const LIST_RATE_CARD_TEMPLATE_PATH = `${ROOT_PATH}/ratecardtemplates`;
export const CREATE_RATE_CARD_TEMPLATE_PATH = `${ROOT_PATH}/ratecardtemplate/new`;
export const SHOW_RATE_CARD_TEMPLATE_PATH = `${ROOT_PATH}/ratecardtemplate/:id`;


export const CREATE_COMPOSED_RULESET_PATH = `${ROOT_PATH}/composed-merchant-ruleset/new`;
export const CREATE_COMPOSED_PG_RULESET_PATH = `${ROOT_PATH}/composed-pg-ruleset/new`;
export const CREATE_COMPOSED_AGGREGATOR_RULESET_PATH = `${ROOT_PATH}/composed-aggregator-ruleset/new`;

export const CREATE_AGGREGATOR_SERVICE_TYPE = `${ROOT_PATH}/aggregator-service/new`;
export const LIST_AGGREGATOR_SERVICE_TYPE = `${ROOT_PATH}/aggregator-service`


export function rateCardTemplatePath(id) {
  return `${ROOT_PATH}/ratecardtemplate/${id}`;
}


