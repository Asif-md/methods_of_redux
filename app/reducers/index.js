import { combineReducers } from "redux";
// import {routerReducer} from "react-router-redux";
import user from "reducers/user";
import message from "reducers/message";
import newRuleset from "reducers/new_ruleset/index";
import rulesets from "reducers/rulesets";
import ruleset from "reducers/ruleset";
import merchants from "reducers/merchants";
import merchant from "reducers/merchant";
import interchanges from "reducers/interchanges";
import interchange from "reducers/interchange";
import taxAccounts from "reducers/tax_accounts";
import taxes from "reducers/taxes";
import cesses from "reducers/cesses";
import accounts from "reducers/accounts";
import account from "reducers/account";
import internalFundTransfers from "reducers/internalFundTransfers"
import internalFundTransfer from "reducers/internalFundTransfer"
import settlements from "reducers/settlements";
import settlementRule from "reducers/settlement";
import invoice from "reducers/invoice";
import disbursement from "reducers/disbursement";
import report from "reducers/report/index";
import error from "reducers/error";
import transaction from "reducers/transaction";
import merchantSettlements from "reducers/merchantSettlements";
import utrLookupResult from "reducers/utrLookupResult";
import ratecards from "reducers/ratecards";
import pendingSettlementAmountResult from "reducers/pendingSettlementAmountResult";
import pgRateCards from "reducers/pgRateCards";
import pgMIds from "reducers/pgMIds";
import pgMId from "reducers/pgMId";
import rateCardTemplates from "reducers/rateCardTemplates"
import rateCardTemplate from "reducers/rateCardTemplate";
import aggregatorServiceTypes from "reducers/aggregatorServiceTypes";
import onDemand from "reducers/onDemand";
import taxRules from "reducers/taxRules";
import taxRule from "reducers/taxRule";
import SacCodeTypes from "reducers/sac_code_types";
import showScheduleType from "reducers/scheduleType";
import aggregatorServices from "reducers/aggregatorServices";
const rootReducer = combineReducers({
  user,
  message,
  newRuleset,
  rulesets,
  ruleset,
  merchants,
  merchant,
  interchanges,
  interchange,
  taxAccounts,
  taxes,
  cesses,
  accounts,
  account,
  internalFundTransfers,
  internalFundTransfer,

  settlements,
  settlementRule,
  invoice,
  disbursement,
  onDemand,
  report,
  error,
  transaction,
  merchantSettlements,
  utrLookupResult,
  ratecards,
  pendingSettlementAmountResult,
  pgRateCards,
  pgMIds,
  pgMId,
  rateCardTemplates,
  rateCardTemplate,
  aggregatorServiceTypes,
  SacCodeTypes,
  taxRules,
  taxRule,
  showScheduleType,
  aggregatorServices 
  // routing: routerReducer
});

export default rootReducer;
