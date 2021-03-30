import loginUser from "apis/login_user";
import createRuleset from "apis/create_ruleset";
import createSettlementRule from "apis/create_settlement_rule";
import createInvoiceRule from "apis/create_invoice_rule";
import createDisbursementRule from "apis/create_disbursement_rule";
import createFilter from "apis/create_filter";
import createFixedCommissionRule from "apis/create_fixed_commission_rule";
import createFixedInterchangeFeeRule from "apis/create_fixed_interchange_fee_rule";
import createFixedRateCommissionRule from "apis/create_fixed_rate_commission_rule";
import createFixedRateInterchangeFeeRule from "apis/create_fixed_rate_interchange_fee_rule";
import createSlabbedFixedCommissionRule from "apis/create_slabbed_fixed_commission_rule";
import createSlabbedFixedInterchangeFeeRule from "apis/create_slabbed_fixed_interchange_fee_rule";
import createSlabbedFixedRateCommissionRule from "apis/create_slabbed_fixed_rate_commission_rule";
import createSlabbedFixedRateInterchangeFeeRule from "apis/create_slabbed_fixed_rate_interchange_fee_rule";
import createAccountingEntryRule from "apis/create_accounting_entry_rule";
import lookupInvoice from "apis/lookup_invoice";
import lookupDisbursement from "apis/lookup_disbursement";
import editAccount from "apis/edit_account";
import editMerchant from "apis/edit_merchant";
import editInterchange from "apis/edit_interchange";
import editRuleset from "apis/edit_ruleset";
import editSettlementRule from "apis/edit_settlement_rule";
import editDisbursementRule from "apis/edit_disbursement_rule";
import editInvoiceRule from "apis/edit_invoice_rule";
import eventTypes from "apis/event_types";
import searchList from "apis/search_list";
import countList from "apis/count_list";
import countSearch from "apis/count_search";
import createPg from "apis/create_pg";
import createMerchant from "apis/create_merchant";
import createBillpayRuleset from "apis/create_billpay_ruleset";
import createMerchantRuleset from "apis/create_merchant_ruleset";
import listMerchants from "apis/list_merchants";
import listRulesets from "apis/list_rulesets";
import listInterchanges from "apis/list_interchanges";
import listTaxAccounts from "apis/list_tax_accounts";
import listTaxes from "apis/list_taxes";
import listCesses from "apis/list_cesses";
import listSettlements from "apis/list_settlements";
import listMerchantDisbursements from "apis/list_merchant_disbursements";
import listMerchantInvoices from "apis/list_merchant_invoices";
import getInterchangeByShortId from "apis/get_interchange_by_short_id";
import getInterchangeById from "apis/get_interchange_by_id";
import getMerchantByShortId from "apis/get_merchant_by_short_id";
import getMerchantById from "apis/get_merchant_by_id";
import getAccountByNumber from "apis/get_account_by_number";
import getAccountById from "apis/get_account_by_id";
import getInternalFundTransferById from "apis/get_internal_fund_transfer_by_id";
import showMerchant from "apis/show_merchant";
import showRuleset from "apis/show_ruleset";
import verifyAddress from "apis/verify_address";
import createAccount from "apis/create_account";
import listAccounts from "apis/list_accounts";
import showAccount from "apis/show_account";
import createInternalFundTransfer from "apis/create_internal_fund_transfer";
import listInternalFundTransfers from "apis/list_internal_fund_transfers";
import showInternalFundTransfer from "apis/show_internal_fund_transfer";
import createInterchange from "apis/create_interchange";
import showInterchange from "apis/show_interchange";
import showSettlement from "apis/show_settlement";
import showTransactionStatus from "apis/show_transaction_status";
import changeTransactionStatus from "apis/change_transaction_status";
import approveRuleset from "apis/approve_ruleset";
import approveRatecard from "apis/approve_ratecard";
import approveRule from "apis/approve_rule";
import approveMerchant from "apis/approve_merchant";
import approveAccount from "apis/approve_account";
import approveInternalFundTransfer from "apis/approve_internal_fund_transfer"
import approveInterchange from "apis/approve_interchange";
import approveSettlementRule from "apis/approve_settlement_rule";
import activateRuleset from "apis/activate_ruleset";
import activateRatecard from "apis/activate_ratecard";
import activateRule from "apis/activate_rule";
import activateFilter from "apis/activate_filter";
import activateMerchant from "apis/activate_merchant";
import activateAccount from "apis/activate_account";
import activateInterchange from "apis/activate_interchange";
import activateSettlementRule from "apis/activate_settlement_rule";
import deactivateRuleset from "apis/deactivate_ruleset";
import deactivateRatecard from "apis/deactivate_ratecard";
import deactivateRule from "apis/deactivate_rule";
import deactivateFilter from "apis/deactivate_filter";
import deactivateMerchant from "apis/deactivate_merchant";
import deactivateAccount from "apis/deactivate_account";
import deactivateInterchange from "apis/deactivate_interchange";
import deactivateSettlementRule from "apis/deactivate_settlement_rule";
import listReportTypes from "apis/list_report_types";
import generateReport from "apis/generate_report";
import utrLookup from "apis/utr_lookup";
import showDisbursementByUrn from "apis/show_disbursement_urn";
import replayMerchantDisbursement from "apis/replay_merchant_disbursement";
import replayCustomerDisbursement from "apis/replay_customer_disbursement";
import serviceTypes from "apis/service_types";
import listRatecards from "apis/list_ratecards";
import pendingSettlementAmount from "apis/pending_settlement_amount";
import invalidateInvoice from "apis/invalidate_invoice";
import reconcileInvoice from "apis/reconcile_invoice";
import editFixedCommissionRule from "apis/edit_fixed_commission_rule";
import editFixedInterchangeFeeRule from "apis/edit_fixed_interchange_fee_rule";
import editFixedRateCommissionRule from "apis/edit_fixed_rate_commission_rule";
import editFixedRateInterchangeFeeRule from "apis/edit_fixed_rate_interchange_fee_rule";
import editSlabbedFixedCommissionRule from "apis/edit_slabbed_fixed_commission_rule";
import editSlabbedFixedInterchangeFeeRule from "apis/edit_slabbed_fixed_interchange_fee_rule";
import editSlabbedFixedRateCommissionRule from "apis/edit_slabbed_fixed_rate_commission_rule";
import editSlabbedFixedRateInterchangeFeeRule from "apis/edit_slabbed_fixed_rate_interchange_fee_rule";
import closeToa from "apis/close_toa";
import createPgRateCard from "apis/create_pg_rate_card";
import listPgRateCards from "apis/list_pg_rate_cards";
import listPgRateCardMIds from "apis/list_pg_rate_card_mids";
import countListRCMIds from "apis/count_list_rc_mids";
import createPgMId from "apis/create_pg_mid";
import listPgMIds from "apis/list_pg_mids";
import showPgMId from "apis/show_pg_mid";
import approvePgMId from "apis/approve_pg_mid";
import activatePgMId from "apis/activate_pg_mid";
import deactivatePgMId from "apis/deactivate_pg_mid";
import createRateCardTemplate from "apis/create_rate_card_template";
import createBasicRateCardRule from "apis/create_basic_rate_card_rule";
import createCountBasedRateCardRule from "apis/create_count_based_rate_card_rule";
import listRateCardTemplate from "apis/list_rate_card_template";
import showRateCardTemplate from "apis/show_rate_card_template";
import createComposedMerchantRuleset from "apis/create_composed_merchant_ruleset";
import createComposedPGRuleset from "apis/create_composed_pg_ruleset";
import createComposedAggregatorRuleset from "apis/create_composed_aggregator_ruleset";
import getAggregatorServiceType from "apis/get_aggregator_service_type";
import showRuleSetRateCardTemplateMapping from "apis/showRuleSetRateCardTemplateMapping";
import attemptRulesetRatecardTemplateMapping from "apis/attemptRulesetRatecardTemplateMapping";
import attemptActivateRulesetRatecardTemplateMapping from "apis/attemptActivateRulesetRatecardTemplateMapping";
import getMerchantBySearchTerm from "apis/get_merchant_by_searchTerm";
import getInterchangeBySearchTerm from "apis/get_interchange_by_searchTerm"
import createOnDemand from "apis/create_on_demand"
import editOnDemand from "apis/edit_on_demand_rule"

import createTaxRule from "apis/create_tax_rule";
import editTaxRule from "apis/edit_tax_rule";
import getTaxRuleById from "apis/get_taxRule_by_id";
import listTaxRules from "apis/list_taxRules";
import showTaxRule from "apis/show_tax_rule";

import activateTaxRule from "apis/activate_tax_rule"
import approveTaxRule from "apis/approve_tax_rule"
import deactivateTaxRule from "apis/deactivate_tax_rule"

import getSacCode from "apis/get_sac_code";
import getOnDemandById from "apis/get_on_demand_by_id";

import showScheduleType from "apis/show_schedule_type";

import createAggregateService from "apis/create_aggregate_service_type";
import listAggegrateTypes from "apis/list_aggregate_type";
import activateAggregatorService from "apis/activate_aggregator_service";
import deactivateAggregatorService from "apis/deactivate_aggregator_service";

import createComposedCampaignRuleset from "apis/create_composed_campaign_ruleset";
import createPreCalRuleset from "apis/create_pre_calculated_rule";
// returns a promise, so that it can be used with `react-saga`
const api = {
  loginUser,
  createRuleset,
  createFilter,
  createSettlementRule,
  createInvoiceRule,
  createDisbursementRule,
  createFixedCommissionRule,
  createFixedInterchangeFeeRule,
  createFixedRateCommissionRule,
  createFixedRateInterchangeFeeRule,
  createSlabbedFixedCommissionRule,
  createSlabbedFixedInterchangeFeeRule,
  createSlabbedFixedRateCommissionRule,
  createSlabbedFixedRateInterchangeFeeRule,
  createAccountingEntryRule,
  createMerchant,
  createBillpayRuleset,
  createMerchantRuleset,
  createPg,

  lookupInvoice,
  lookupDisbursement,
  utrLookup,

  editAccount,
  editMerchant,
  editInterchange,
  editRuleset,
  editSettlementRule,
  editInvoiceRule,
  editDisbursementRule,

  listMerchants,
  listRulesets,
  listInterchanges,
  listTaxAccounts,
  listTaxes,
  listCesses,
  listSettlements,
  showSettlement,
  getInterchangeByShortId,
  getInterchangeById,
  getMerchantByShortId,
  getMerchantById,
  getAccountByNumber,
  getAccountById,
  getInternalFundTransferById,
  showMerchant,
  showRuleset,
  verifyAddress,
  createAccount,
  listAccounts,
  showAccount,
  createInternalFundTransfer,
  listInternalFundTransfers,
  showInternalFundTransfer,
  createInterchange,
  showInterchange,
  showTransactionStatus,
  changeTransactionStatus,
  searchList,
  countList,
  countSearch,
  eventTypes,
  listMerchantDisbursements,
  listMerchantInvoices,
  serviceTypes,

  approveRuleset,
  approveRatecard,
  approveRule,
  approveMerchant,
  approveAccount,
  approveInternalFundTransfer,
  approveInterchange,
  approveSettlementRule,
  approveTaxRule,

  activateRuleset,
  activateRatecard,
  activateRule,
  activateFilter,
  activateMerchant,
  activateAccount,
  activateInterchange,
  activateSettlementRule,
  activateTaxRule,

  deactivateRuleset,
  deactivateRatecard,
  deactivateRule,
  deactivateFilter,
  deactivateMerchant,
  deactivateAccount,
  deactivateInterchange,
  deactivateSettlementRule,
  deactivateTaxRule,

  listReportTypes,
  generateReport,

  showDisbursementByUrn,
  replayMerchantDisbursement,
  replayCustomerDisbursement,

  listRatecards,

  pendingSettlementAmount,
  invalidateInvoice,
  reconcileInvoice,

  editFixedCommissionRule,
  editFixedInterchangeFeeRule,
  editFixedRateCommissionRule,
  editFixedRateInterchangeFeeRule,
  editSlabbedFixedCommissionRule,
  editSlabbedFixedInterchangeFeeRule,
  editSlabbedFixedRateCommissionRule,
  editSlabbedFixedRateInterchangeFeeRule,

  closeToa,

  createPgRateCard,
  listPgRateCards,
  listPgRateCardMIds,
  countListRCMIds,
  createPgMId,
  listPgMIds,
  showPgMId,
  approvePgMId,
  activatePgMId,
  deactivatePgMId,

  createRateCardTemplate,
  createBasicRateCardRule,
  createCountBasedRateCardRule,
  listRateCardTemplate,
  showRateCardTemplate,

  createComposedPGRuleset,
  createComposedMerchantRuleset,
  createComposedAggregatorRuleset,

  getAggregatorServiceType,

  showRuleSetRateCardTemplateMapping,
  attemptRulesetRatecardTemplateMapping,
  attemptActivateRulesetRatecardTemplateMapping,

  getMerchantBySearchTerm,
  getInterchangeBySearchTerm,

  createOnDemand,
  editOnDemand,
  createTaxRule,
  editTaxRule,
  getTaxRuleById,
  listTaxRules,
  showTaxRule,

  getSacCode,
  getOnDemandById,

  showScheduleType,

  createAggregateService,
  listAggegrateTypes,
  activateAggregatorService,
  deactivateAggregatorService,

  createPreCalRuleset,
  createComposedCampaignRuleset,
};

export default api;
