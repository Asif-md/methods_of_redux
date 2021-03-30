import * as actions from "actions/action_types";

export function sendingRequest(sending) {
  return {
    type: actions.SENDING_REQUEST,
    sending
  };
}

export function attemptLogin(login, password) {
  return {
    type: actions.LOGIN_ATTEMPT,
    login,
    password
  };
}

export function loginSuccess(login, password, expiryDate) {
  return {
    type: actions.LOGIN_SUCCEEDED,
    login,
    password,
    expiryDate
  };
}

export function loginFailed(message) {
  return {
    type: actions.LOGIN_FAILED,
    message
  };
}

export function setLogout() {
  return {
    type: actions.SET_LOGOUT
  };
}

export function createRuleset({ ruleset, rules }) {
  return {
    type: actions.CREATE_RULESET,
    ruleset,
    rules
  };
}

export function createRulesetDone() {
  return {
    type: actions.CREATE_RULESET_DONE
  };
}

export function createRateCardTemplate({ rateCardDetails, rules }) {
  return {
    type: actions.CREATE_RATECARD_TEMPLATE,
    rateCardDetails,
    rules
  };
}

export function createRateCardTemplateDone() {
  return {
    type: actions.CREATE_RATECARD_TEMPLATE_DONE
  };
}

export function editRuleset({ ruleset, filter, rules }) {
  return {
    type: actions.EDIT_RULESET,
    ruleset,
    filter,
    rules
  };
}

export function editRulesetDone() {
  return {
    type: actions.EDIT_RULESET_DONE
  };
}

export function addFilter() {
  return {
    type: actions.ADD_FILTER
  };
}

export function removeFilter(index) {
  return {
    type: actions.REMOVE_FILTER,
    index
  };
}

export function changeFilter(index, filter) {
  return {
    type: actions.CHANGE_FILTER,
    index,
    filter
  };
}

export function changeFilterName(name) {
  return {
    type: actions.CHANGE_FILTER_NAME,
    name
  };
}

export function addRule(index, rule = {}) {
  return {
    type: actions.ADD_RULE,
    index,
    rule
  };
}

export function removeRule(index) {
  return {
    type: actions.REMOVE_RULE,
    index
  };
}

export function changeRule(index, rule) {
  return {
    type: actions.CHANGE_RULE,
    index,
    rule
  };
}

export function editLock(forComponent, searchingFor, result) {
  return {
    type: actions.EDIT_LOCK,
    forComponent,
    searchingFor,
    result
  };
}

// MultiFind Begin

export function multiFindInput(
  forComponent,
  searchingFor,
  entryType,
  input,
  expressionEntryType,
  { index } = {},
  isPrefilled = false
) {
  return {
    type: actions.MULTI_FIND_INPUT,
    forComponent,
    searchingFor,
    entryType,
    input,
    expressionEntryType,
    index,
    isPrefilled
  };
}

export function multiFindSearch(
  forComponent,
  searchingFor,
  entryType,
  query,
  { index } = {},
  isPrefilled = false
) {
  return {
    type: actions.MULTI_FIND,
    forComponent,
    searchingFor,
    entryType,
    query,
    index,
    isPrefilled
  };
}

export function multiFindDone(
  forComponent,
  searchingFor,
  entryType,
  result,
  index
) {
  return {
    type: actions.MULTI_FIND_DONE,
    forComponent,
    searchingFor,
    entryType,
    result,
    index
  };
}

export function multiFindFailed(
  forComponent,
  searchingFor,
  errorMessage,
  index
) {
  return {
    type: actions.MULTI_FIND_FAILED,
    forComponent,
    searchingFor,
    errorMessage,
    index
  };
}

export function multiFindClear(forComponent, searchingFor, index) {
  return {
    type: actions.MULTI_FIND_CLEAR,
    forComponent,
    searchingFor,
    index
  };
}

export function multiFindCancelled(forComponent, searchingFor, index) {
  return {
    type: actions.MULTI_FIND_CANCELLED,
    forComponent,
    searchingFor,
    index
  };
}

export function multiFindLock(
  forComponent,
  searchingFor,
  entryType,
  searchIndex,
  index
) {
  return {
    type: actions.LOCK_MULTI_FIND,
    forComponent,
    searchingFor,
    searchIndex,
    index
  };
}

// MultiFind End

export function searchMerchant(ruleIndex, query) {
  return {
    type: actions.MERCHANT_SEARCH,
    index: ruleIndex,
    query
  };
}

export function merchantSearchDone(ruleIndex, query, result) {
  return {
    type: actions.MERCHANT_SEARCH_DONE,
    index: ruleIndex,
    query,
    result
  };
}

export function merchantSearchFailed(ruleIndex, query, errorMessage) {
  return {
    type: actions.MERCHANT_SEARCH_FAILED,
    index: ruleIndex,
    query,
    errorMessage
  };
}

export function merchantSearchCancelled(ruleIndex) {
  return {
    type: actions.MERCHANT_SEARCH_CANCELLED,
    index: ruleIndex
  };
}

export function lockMerchantSearch(ruleIndex) {
  return {
    type: actions.LOCK_MERCHANT_SEARCH,
    index: ruleIndex
  };
}

export function searchList(listType, searchTerm, filters) {
  return {
    type: actions.SEARCH_LIST,
    listType,
    searchTerm,
    filters
  };
}

export function searchRulesetDone(result, count) {
  return {
    type: actions.SEARCH_RULESET_DONE,
    result,
    count
  };
}

export function searchMerchantDone(result, count) {
  return {
    type: actions.SEARCH_MERCHANT_DONE,
    result,
    count
  };
}

export function searchInterchangeDone(result, count) {
  return {
    type: actions.SEARCH_INTERCHANGE_DONE,
    result,
    count
  };
}

export function searchTaxRuleDone(result, count) {
  return {
    type: actions.SEARCH_TAX_RULE_DONE,
    result,
    count
  };
}

export function searchAccountDone(result, count) {
  return {
    type: actions.SEARCH_ACCOUNT_DONE,
    result,
    count
  };
}

export function searchInternalFundTransferDone(result, count) {
  return {
    type: actions.SEARCH_INTERNAL_FUND_TRANSFER_DONE,
    result,
    count
  };
}

export function searchSettlementDone(result, count) {
  return {
    type: actions.SEARCH_SETTLEMENT_DONE,
    result,
    count
  };
}

export function listRulesets(page, pageSize, filters, searchItems) {
  return {
    type: actions.LIST_RULESETS,
    page,
    pageSize,
    filters,
    searchItems
  };
}

export function listRulesetsDone(rulesets, count) {
  return {
    type: actions.LIST_RULESETS_DONE,
    rulesets,
    count
  };
}

export function showRuleset(rulesetId) {
  return {
    type: actions.SHOW_RULESET,
    rulesetId
  };
}

export function showRulesetDone(ruleset) {
  return {
    type: actions.SHOW_RULESET_DONE,
    ruleset
  };
}

export function attemptCreateMerchant(merchant) {
  return {
    type: actions.CREATE_MERCHANT_ATTEMPT,
    merchant
  };
}

export function createMerchantDone(merchant) {
  return {
    type: actions.CREATE_MERCHANT_DONE,
    merchant
  };
}

export function attemptEditMerchant(merchant, id) {
  return {
    type: actions.EDIT_MERCHANT_ATTEMPT,
    merchant,
    id
  };
}

export function editMerchantDone(merchant) {
  return {
    type: actions.EDIT_MERCHANT_DONE,
    merchant
  };
}

export function listMerchants(page, pageSize, filters) {
  return {
    type: actions.LIST_MERCHANTS,
    page,
    pageSize,
    filters
  };
}

export function listMerchantsDone(merchants, count) {
  return {
    type: actions.LIST_MERCHANTS_DONE,
    merchants,
    count
  };
}

export function showMerchant(merchantId) {
  return {
    type: actions.SHOW_MERCHANT,
    merchantId
  };
}

export function showMerchantDone(merchant) {
  return {
    type: actions.SHOW_MERCHANT_DONE,
    merchant
  };
}

export function attemptVerifyAddress(merchant) {
  return {
    type: actions.ADDRESS_VERIFY_ATTEMPT,
    merchant
  };
}

export function verifyAddressSuccess(merchant) {
  return {
    type: actions.ADDRESS_VERIFY_DONE,
    merchant
  };
}

export function clearTransactionalMessages(merchants) {
  return {
    type: actions.CLEAR_TRANSACTIONAL_MESSAGES
  };
}

export function attemptCreateInterchange(interchange) {
  return {
    type: actions.CREATE_INTERCHANGE_ATTEMPT,
    interchange
  };
}

export function createInterchangeDone(interchange) {
  return {
    type: actions.CREATE_INTERCHANGE_DONE,
    interchange
  };
}




export function attemptEditInterchange(interchange, id) {
  return {
    type: actions.EDIT_INTERCHANGE_ATTEMPT,
    interchange,
    id
  };
}

export function editInterchangeDone(interchange) {
  return {
    type: actions.EDIT_INTERCHANGE_DONE,
    interchange
  };
}

export function listInterchanges(page, pageSize, filters) {
  return {
    type: actions.LIST_INTERCHANGES,
    page,
    pageSize,
    filters
  };
}

export function listInterchangesDone(interchanges, count) {
  return {
    type: actions.LIST_INTERCHANGES_DONE,
    interchanges,
    count
  };
}

//  Create tax rule sets
export function createTaxRulesets(taxRule) {
  return {
    type: actions.CREATE_TAX_RULESETS,
    taxRule
  };
}

export function createTaxRulesetsDone(taxRulesets) {
  return {
    type: actions.CREATE_TAX_RULESETS_DONE,
    taxRulesets
  };
}

export function editTaxRule(taxRule, id) {
  return {
    type: actions.EDIT_TAX_RULE,
    taxRule,
    id
  };
}

export function editTaxRuleDone(taxRule) {
  return {
    type: actions.EDIT_TAX_RULE_DONE,
    taxRule
  };
}

export function listTaxRules(page, pageSize, filters) {
  return {
    type: actions.LIST_TAX_RULES,
    page,
    pageSize,
    filters
  };
}

export function listTaxRulesDone(taxRules, count) {
  return {
    type: actions.LIST_TAX_RULES_DONE,
    taxRules,
    count
  };
}



export function listTaxAccounts() {
  return {
    type: actions.LIST_TAX_ACCOUNTS
  };
}

export function listTaxAccountsDone(taxAccounts) {
  return {
    type: actions.LIST_TAX_ACCOUNTS_DONE,
    taxAccounts
  };
}

export function listTaxes() {
  return {
    type: actions.LIST_TAXES
  };
}

export function listTaxesDone(taxes) {
  return {
    type: actions.LIST_TAXES_DONE,
    taxes
  };
}

export function listCesses() {
  return {
    type: actions.LIST_CESSES
  };
}

export function listCessesDone(cesses) {
  return {
    type: actions.LIST_CESSES_DONE,
    cesses
  };
}

export function unauthorizedLogin() {
  return {
    type: actions.UNAUTHORIZED_LOGIN
  };
}

export function attemptCreateAccount(account) {
  return {
    type: actions.CREATE_ACCOUNT_ATTEMPT,
    account
  };
}

export function attemptCreateInternalFundTransfer(internalFundTransfer) {
  return {
    type: actions.CREATE_INTERNAL_FUND_TRANSFER_ATTEMPT,
    internalFundTransfer
  };
}

export function createAccountDone(account) {
  return {
    type: actions.CREATE_ACCOUNT_DONE,
    account
  };
}

export function createInternalFundTransferDone(internalFundTransfer) {
  return {
    type: actions.CREATE_INTERNAL_FUND_TRANSFER_DONE,
    internalFundTransfer
  };
}

export function attemptEditAccount(account, id) {
  return {
    type: actions.EDIT_ACCOUNT_ATTEMPT,
    account,
    id
  };
}

export function editAccountDone(account) {
  return {
    type: actions.EDIT_ACCOUNT_DONE,
    account
  };
}

export function listAccounts(page, pageSize, filters) {
  return {
    type: actions.LIST_ACCOUNTS,
    page,
    pageSize,
    filters
  };
}

export function listAccountsDone(accounts, count) {
  return {
    type: actions.LIST_ACCOUNTS_DONE,
    accounts,
    count
  };
}

export function listInternalFundTransfers(page, pageSize, filters) {
  return {
    type: actions.LIST_INTERNAL_FUND_TRANSFERS,
    page,
    pageSize,
    filters
  };
}

export function listInternalFundTransfersDone(internalFundTransfers, count) {
  return {
    type: actions.LIST_INTERNAL_FUND_TRANSFERS_DONE,
    internalFundTransfers,
    count
  };
}

export function listSettlements(page, pageSize, filters) {
  return {
    type: actions.LIST_SETTLEMENTS,
    page,
    pageSize,
    filters
  };
}

export function listSettlementsDone(settlements, count) {
  return {
    type: actions.LIST_SETTLEMENTS_DONE,
    settlements,
    count
  };
}

export function showAccount(accountId) {
  return {
    type: actions.SHOW_ACCOUNT,
    accountId
  };
}

export function showAccountDone(account) {
  return {
    type: actions.SHOW_ACCOUNT_DONE,
    account
  };
}

export function showInternalFundTransfer(internalFundTransferId) {
  return {
    type: actions.SHOW_INTERNAL_FUND_TRANSFER,
    internalFundTransferId
  };
}

export function showInternalFundTransferDone(internalFundTransfer) {
  return {
    type: actions.SHOW_INTERNAL_FUND_TRANSFER_DONE,
    internalFundTransfer
  };
}

export function showSettlement(settlementId) {
  return {
    type: actions.SHOW_SETTLEMENT,
    settlementId
  };
}

export function showSettlementDone(settlementRule, invoice, disbursement, onDemand, showScheduleType) {
  return {
    type: actions.SHOW_SETTLEMENT_DONE,
    settlementRule,
    invoice,
    disbursement,
    onDemand,
    showScheduleType
  };
}

export function showInterchange(interchangeId) {
  return {
    type: actions.SHOW_INTERCHANGE,
    interchangeId
  };
}

export function showInterchangeDone(interchange) {
  return {
    type: actions.SHOW_INTERCHANGE_DONE,
    interchange
  };
}

export function showTaxRule(id) {
  return {
    type: actions.SHOW_TAX_RULE,
    id
  };
}

export function showTaxRuleDone(taxRule) {
  return {
    type: actions.SHOW_TAX_RULE_DONE,
    taxRule
  };
}

export function listReportTypes() {
  return {
    type: actions.LIST_REPORT_TYPES
  };
}

export function listReportTypesDone(reportTypes) {
  return {
    type: actions.LIST_REPORT_TYPES_DONE,
    reportTypes
  };
}

export function createReport(report) {
  return {
    type: actions.CREATE_REPORT_ATTEMPT,
    report
  };
}

export function createReportDone() {
  return {
    type: actions.CREATE_REPORT_DONE
  };
}

export function createSettlementRule(settlement) {
  return {
    type: actions.CREATE_SETTLEMENT,
    settlementRule: settlement.settlementRule,
    invoice: settlement.invoice,
    disbursement: settlement.disbursement,
    onDemand: settlement.onDemand
  };
}

export function createSettlementRuleDone(
  settlementRule,
  invoice,
  disbursement,
  onDemand
) {
  return {
    type: actions.CREATE_SETTLEMENT_DONE,
    settlementRule,
    invoice,
    disbursement,
    onDemand
  };
}

export function editSettlementRule(settlement, id) {
  return {
    type: actions.EDIT_SETTLEMENT,
    settlementRule: settlement.settlementRule,
    invoice: settlement.invoice,
    invoiceId: settlement.invoiceId,
    disbursement: settlement.disbursement,
    disbursementId: settlement.disbursementId,
    onDemand: settlement.onDemand,
    // onDemandId: settlement.onDemandId,
    id
  };
}

export function editSettlementRuleDone(settlementRule, invoice, disbursement, onDemand) {
  return {
    type: actions.EDIT_SETTLEMENT_DONE,
    settlementRule,
    invoice,
    disbursement,
    onDemand
  };
}

export function createBillpayRuleset(billpay) {
  return {
    type: actions.CREATE_BILLPAY_ATTEMPT,
    billpay
  };
}

export function createBillpayRulesetDone() {
  return {
    type: actions.CREATE_BILLPAY_DONE
  };
}

export function createMerchantRuleset(merchantRuleset) {
  return {
    type: actions.CREATE_MERCHANT_RULESET_ATTEMPT,
    merchantRuleset
  };
}

export function createMerchantRulesetDone() {
  return {
    type: actions.CREATE_MERCHANT_RULESET_DONE
  };
}

// generic

export function somethingWentWrong(message, error) {
  return {
    type: actions.SOMETHING_WENT_WRONG,
    message,
    error
  };
}

// generic approve

export function attemptApprove(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.APPROVE_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function approveSuccess(recordType, record, { index, ruleType } = {}) {
  return {
    type: actions.APPROVE_DONE,
    recordType,
    record,
    extra: { index, ruleType }
  };
}

export function attemptRateCardApprove(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.APPROVE_RATECARD_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function approveRateCardSuccess(rateCards, requestName) {
  return {
    type: actions.APPROVE_RATECARD_DONE,
    rateCards,
    requestName
  };
}

// generic activate

export function attemptActivate(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.ACTIVATE_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function activateSuccess(recordType, record, { index, ruleType } = {}) {
  return {
    type: actions.ACTIVATE_DONE,
    recordType,
    record,
    extra: { index, ruleType }
  };
}

export function attemptRateCardActivate(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.ACTIVATE_RATECARD_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function activateRateCardSuccess(rateCards, requestName) {
  return {
    type: actions.ACTIVATE_RATECARD_DONE,
    rateCards,
    requestName
  };
}

// generic deactivate

export function attemptDeactivate(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.DEACTIVATE_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function deactivateSuccess(
  recordType,
  record,
  { index, ruleType } = {}
) {
  return {
    type: actions.DEACTIVATE_DONE,
    recordType,
    record,
    extra: { index, ruleType }
  };
}

export function attemptRateCardDeactivate(
  recordType,
  record,
  { ruleType, index, merchantId } = {}
) {
  return {
    type: actions.DEACTIVATE_RATECARD_ATTEMPT,
    recordType,
    record,
    extra: { ruleType, index, merchantId }
  };
}

export function deactivateRateCardSuccess(rateCards, requestName) {
  return {
    type: actions.DEACTIVATE_RATECARD_DONE,
    rateCards,
    requestName
  };
}

// generic invalid form

export function invalidForm(message) {
  return {
    type: actions.INVALID_FORM,
    message
  };
}

export function showTransactionStatus(transactionOrExtId) {
  return {
    type: actions.SHOW_TRANSACTION_STATUS,
    transactionOrExtId
  };
}

export function showTransactionStatusDone(transactionStatus) {
  return {
    type: actions.SHOW_TRANSACTION_STATUS_DONE,
    transactionStatus
  };
}

export function clearState() {
  return {
    type: actions.CLEAR_STATE
  };
}

export function changeTransactionStatus(payload) {
  return {
    type: actions.CHANGE_TRANSACTION_STATUS,
    id: payload.transactionId,
    status: payload.status
  };
}

export function changeTransactionStatusDone(transactionStatus) {
  return {
    type: actions.CHANGE_TRANSACTION_STATUS_DONE,
    transactionStatus
  };
}

export function eventTypes() {
  return {
    type: actions.EVENT_TYPES
  };
}

export function eventTypesDone(eventTypes) {
  return {
    type: actions.EVENT_TYPES_DONE,
    eventTypes
  };
}

export function merchantSettlementStatus(
  interchangeId,
  merchantId,
  settlementType
) {
  return {
    type: actions.MERCHANT_SETTLEMENT_STATUS,
    interchangeId,
    merchantId,
    settlementType
  };
}

export function listMerchantSettlementsDone(
  settlementType,
  merchantSettlements
) {
  return {
    type: actions.LIST_MERCHANT_SETTLEMENTS_DONE,
    settlementType,
    merchantSettlements
  };
}

export function utrLookup(utr) {
  return {
    type: actions.LOOKUP_UTR,
    utr
  };
}

export function utrLookupDone(utrLookupResult) {
  return {
    type: actions.LOOKUP_UTR_DONE,
    utrLookupResult
  };
}

export function replayDisbursement(partyType, urn) {
  return {
    type: actions.REPLAY_DISBURSEMENT,
    partyType,
    urn
  };
}

export function replayDisbursementDone(urn) {
  return {
    type: actions.REPLAY_DISBURSEMENT_DONE,
    urn
  };
}

export function showDisbursementByUrn(urn) {
  return {
    type: actions.SHOW_DISBURSEMENT,
    urn
  };
}

export function showDisbursementByUrnDone(disbursement) {
  return {
    type: actions.SHOW_DISBURSEMENT_DONE,
    disbursement
  };
}

export function createPG(pg) {
  return {
    type: actions.CREATE_PG,
    pg
  };
}

export function createPGDone() {
  return {
    type: actions.CREATE_PG_DONE
  };
}

export function serviceTypes() {
  return {
    type: actions.SERVICE_TYPES
  };
}

export function serviceTypesDone(serviceTypes) {
  return {
    type: actions.SERVICE_TYPES_DONE,
    serviceTypes
  };
}

export function showRatecards(merchant) {
  return {
    type: actions.SHOW_RATECARDS,
    merchant
  };
}

export function showRatecardsDone(ratecards) {
  return {
    type: actions.SHOW_RATECARDS_DONE,
    ratecards
  };
}

export function pendingSettlementAmount(merchant) {
  return {
    type: actions.PENDING_SETTLEMENT_AMOUNT,
    merchant
  };
}

export function pendingSettlementAmountDone(pendingSettlementAmount) {
  return {
    type: actions.PENDING_SETTLEMENT_AMOUNT_DONE,
    pendingSettlementAmount
  };
}

export function invoiceRecovery(merchant, invoiceNos, reconcile) {
  return {
    type: actions.INVOICE_RECOVERY,
    merchant,
    invoiceNos,
    reconcile
  };
}

export function invoiceRecoveryDone() {
  return {
    type: actions.INVOICE_RECOVERY_DONE
  };
}

export function editRatecard(data) {
  return {
    type: actions.EDIT_RATECARD,
    data
  };
}

export function editRatecardDone() {
  return {
    type: actions.EDIT_RATECARD_DONE
  };
}

export function closeToa(data) {
  return {
    type: actions.TOA_CLOSE,
    data
  };
}

export function closeToaDone() {
  return {
    type: actions.TOA_CLOSE_DONE
  };
}

export function createPgRateCard(pgRateCard) {
  return {
    type: actions.CREATE_PG_RATE_CARD,
    pgRateCard
  };
}

export function createPgRateCardDone(pgRateCard) {
  return {
    type: actions.CREATE_PG_RATE_CARD_DONE,
    pgRateCard
  };
}

export function listPgRateCards(page, pageSize) {
  return {
    type: actions.LIST_PG_RATE_CARDS,
    page,
    pageSize
  };
}

export function listPgRateCardsDone(pgRateCards, count) {
  return {
    type: actions.LIST_PG_RATE_CARDS_DONE,
    pgRateCards,
    count
  };
}

export function searchPgRateCardDone(result, count) {
  return {
    type: actions.SEARCH_PG_RATE_CARDS_DONE,
    result,
    count
  };
}

export function listPgRateCardMIds(page, pageSize, filters, pgRateCardId) {
  return {
    type: actions.LIST_PG_RATE_CARD_MIDS,
    page,
    pageSize,
    filters,
    pgRateCardId
  };
}

export function listPgRateCardMIdsDone(pgMIds, count) {
  return {
    type: actions.LIST_PG_RATE_CARD_MIDS_DONE,
    pgMIds,
    count
  };
}

export function listPgMIds(page, pageSize, filters) {
  return {
    type: actions.LIST_PG_MIDS,
    page,
    pageSize,
    filters
  };
}

export function listPgMIdsDone(pgMIds, count) {
  return {
    type: actions.LIST_PG_MIDS_DONE,
    pgMIds,
    count
  };
}

export function searchPgMIdDone(result, count) {
  return {
    type: actions.SEARCH_PG_MID_DONE,
    result,
    count
  };
}

export function createPgMId(pgMId) {
  return {
    type: actions.CREATE_PG_MID,
    pgMId
  };
}

export function createPgMIdDone(pgMId) {
  return {
    type: actions.CREATE_PG_MID_DONE,
    pgMId
  };
}

export function showPgMId(pgMId) {
  return {
    type: actions.SHOW_PG_MID,
    pgMId
  };
}

export function showPgMIdDone(pgMId) {
  return {
    type: actions.SHOW_PG_MID_DONE,
    pgMId
  };
}

export function listRateCardTemplate(page, pageSize, filters, searchItems) {
  return {
    type: actions.LIST_RATE_CARD_TEMPLATE,
    page,
    pageSize,
    filters,
    searchItems
  };
}

export function listRateCardTemplateDone(rulesets, count) {
  return {
    type: actions.LIST_RATE_CARD_TEMPLATE_DONE,
    rulesets,
    count
  };
}

export function showRateCardTemplate(id) {
  return {
    type: actions.SHOW_RATE_CARD_TEMPLATE,
    id
  };
}

export function showRateCardTemplateDone(rateCardTemplate) {
  return {
    type: actions.SHOW_RATE_CARD_TEMPLATE_DONE,
    rateCardTemplate
  };
}

export function createComposedMerchantRuleset(ruleset) {
  return {
    type: actions.CREATE_COMPOSED_MERCHANT_ATTEMPT,
    ruleset
  };
}

export function createComposedMerchantRulesetDone() {
  return {
    type: actions.CREATE_COMPOSED_MERCHANT_DONE
  };
}

export function createComposedPGRuleset(ruleset) {
  return {
    type: actions.CREATE_COMPOSED_PG_ATTEMPT,
    ruleset
  };
}

export function createComposedPGRulesetDone() {
  return {
    type: actions.CREATE_COMPOSED_PG_DONE
  };
}

export function createComposedAggregatorRuleset(ruleset) {
  return {
    type: actions.CREATE_COMPOSED_AGGREGATOR_ATTEMPT,
    ruleset
  };
}

export function createComposedAggregatorRulesetDone() {
  return {
    type: actions.CREATE_COMPOSED_AGGREGATOR_DONE
  };
}

export function getAggregatorServiceType() {
  return {
    type: actions.GET_AGGREGATOR_SERVICE_TYPE
  };
}

export function getAggregatorServiceTypeDone(list) {
  return {
    type: actions.GET_AGGREGATOR_SERVICE_TYPE_DONE,
    list
  };
}

export function getSacCode() {
  return {
    type: actions.GET_SAC_CODE
  };
}

export function getSacCodeDone(list) {
  return {
    type: actions.GET_SAC_CODE_DONE,
    list
  };
}

export function attemptActivateRulesetRatecardTemplateMapping(
  rulesetId,
  mappingId,
  activate
) {
  return {
    type: actions.ACTIVATE_RULESET_RATE_CARD_TEMPLATE_MAPPING_ATTEMPT,
    rulesetId,
    mappingId,
    activate
  };
}

export function attemptRulesetRatecardTemplateMapping(
  rulesetId,
  rateCardTemplateId
) {
  return {
    type: actions.RULESET_RATE_CARD_TEMPLATE_MAPPING_ATTEMPT,
    rulesetId,
    rateCardTemplateId
  };
}

export function aggregatorService(serviceType) {
  return {
    type: actions.CREATE_AGGREGATOR_SERVICE_TYPE,
    serviceType
  };
}

export function aggregatorServiceDone(serviceType) {
  return {
    type: actions.CREATE_AGGREGATOR_SERVICE_TYPE_DONE,
    serviceType
  };
}


export function listAggegrateTypes(page, pageSize, filters) {
  return {
    type: actions.LIST_AGGREGATE_TYPES,
    page,
    pageSize,
    filters
  };
}

export function listAggegrateTypesDone(aggregatetypes) {
  return {
    type: actions.LIST_AGGREGATE_TYPES_DONE,
    aggregatetypes
  };
}



export function locationChange() {
  return {
    type: actions.LOCATION_CHANGE
  };
}

export function createComposedCampaignRuleset(ruleset) {
  return {
    type: actions.CREATE_COMPOSED_CAMPAIGN_ATTEMPT,
    ruleset
  };
}

export function createComposedCampaignRulesetDone() {
  return {
    type: actions.CREATE_COMPOSED_CAMPAIGN_DONE
  };
}


