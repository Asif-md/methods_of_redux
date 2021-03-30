import { bindActionCreators } from "redux";
import * as actionCreators from "actions/action_creators";

export function mapStateToProps(state) {
  return {
    user: state.user,
    message: state.message,
    newRuleset: state.newRuleset,
    rulesets: state.rulesets,
    ruleset: state.ruleset,
    merchants: state.merchants,
    merchant: state.merchant,
    interchanges: state.interchanges,
    interchange: state.interchange,
    taxRules: state.taxRules,
    taxRule: state.taxRule,
    taxAccounts: state.taxAccounts,
    taxes: state.taxes,
    cesses: state.cesses,
    accounts: state.accounts,
    account: state.account,
    internalFundTransfers: state.internalFundTransfers,
    internalFundTransfer: state.internalFundTransfer,
    settlements: state.settlements,
    settlementRule: state.settlementRule,
    invoice: state.invoice,
    disbursement: state.disbursement,
    onDemand: state.onDemand,
    showScheduleType: state.showScheduleType,
    report: state.report,
    error: state.error,
    transaction: state.transaction,
    merchantSettlements: state.merchantSettlements,
    utrLookupResult: state.utrLookupResult,
    ratecards: state.ratecards,
    pendingSettlementAmountResult: state.pendingSettlementAmountResult,
    pgRateCards: state.pgRateCards,
    pgMIds: state.pgMIds,
    pgMId: state.pgMId,
    rateCardTemplates: state.rateCardTemplates,
    rateCardTemplate: state.rateCardTemplate,
    aggregatorServiceTypes: state.aggregatorServiceTypes,
    getSacCodeTypes: state.SacCodeTypes,
    aggregatorService:state.aggregatorService,
    aggregatorServices:state.aggregatorServices,

  };
}

export function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}
