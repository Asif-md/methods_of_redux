import * as actionTypes from "actions/action_types";
import { capitalizeFirst } from "utils/helpers";

export default function message(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_ATTEMPT:
      return {
        ...state,
        info: 'Trying to login'
      };
    case actionTypes.LOGIN_SUCCEEDED:
      const userName = action.login;
      return {
        ...state,
        info: null,
        loginSuccess: `Hi ${capitalizeFirst(userName)}`
      };
    case actionTypes.LOGIN_FAILED:
      const errMsg = (action.message == "unauthorized") ?
        "Oops! Please check your login and password and try again" :
        "Oops! Something went wrong. Please try again";

      return {
        ...state,
        loginSuccess: null,
        error: errMsg
      };
    case actionTypes.SET_LOGOUT:
      return {};
    case actionTypes.CREATE_RULESET_DONE:
      return {
        ...state,
        success: "Created Ruleset and its associated filters and rules",
        error: null,
        info: null
      };
    case actionTypes.EDIT_RULESET_DONE:
      return {
        ...state,
        success: "Edited Ruleset and its associated filters and rules",
        error: null,
        info: null
      };
    case actionTypes.CREATE_MERCHANT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating merchant ${action.merchant.name}`
      };
    case actionTypes.CREATE_MERCHANT_DONE:
      return {
        ...state,
        success: `Merchant ${action.merchant.name} created`,
        error: null,
        info: null
      };
    case actionTypes.EDIT_MERCHANT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Editing merchant ${action.merchant.name}`
      };
    case actionTypes.EDIT_MERCHANT_DONE:
      return {
        ...state,
        success: `Merchant ${action.merchant.name} edited`,
        error: null,
        info: null
      };
    case actionTypes.ADDRESS_VERIFY_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Verifying address for ${action.merchant.name}`
      };
    case actionTypes.ADDRESS_VERIFY_DONE:
      return {
        ...state,
        success: `Address verified for ${action.merchant.name}`,
        error: null,
        info: null
      };
    case actionTypes.CLEAR_TRANSACTIONAL_MESSAGES:
      return {
        ...state,
        success: null,
        error: null,
        info: null
      };
    case actionTypes.CHANGE_TRANSACTION_STATUS_DONE:
      return {
        ...state,
        success: "Transaction status changed",
        error: null,
        info: null
      };
    case actionTypes.UNAUTHORIZED_LOGIN:
      return {
        ...state,
        success: null,
        error: "Oops! You are not authorized. Please check your login",
        info: null
      };
    case actionTypes.SOMETHING_WENT_WRONG:
      console.debug(`[SOMETHING_WENT_WRONG] message: ${action.message} error ${action.error}`);
      console.error(action.error.stack);
      return {
        ...state,
        success: null,
        error: `Oops! ${capitalizeFirst(action.message)}`,
        info: null
      };
    case actionTypes.INVALID_FORM:
      return {
        ...state,
        success: null,
        error: `Yuck! ${action.message}. Please correct and try again!`,
        info: null
      };
    case actionTypes.CREATE_ACCOUNT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Account ${action.account.name}`
      };
    case actionTypes.CREATE_ACCOUNT_DONE:
      return {
        ...state,
        success: `Account ${action.account.name} created`,
        error: null,
        info: null
      };
    case actionTypes.EDIT_ACCOUNT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Editing Account ${action.account.name}`
      };
    case actionTypes.EDIT_ACCOUNT_DONE:
      return {
        ...state,
        success: `Account ${action.account.name} edited`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_INTERNAL_FUND_TRANSFER_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Internal Fund Transfer`
      };
    case actionTypes.CREATE_INTERNAL_FUND_TRANSFER_DONE:
      return {
        ...state,
        success: `Internal Fund Transfer Created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_INTERCHANGE_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Interchange ${action.interchange.name}`
      };
    case actionTypes.CREATE_INTERCHANGE_DONE:
      return {
        ...state,
        success: `Interchange ${action.interchange.name} created`,
        error: null,
        info: null
      };
    case actionTypes.EDIT_INTERCHANGE_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Editing Interchange ${action.interchange.name}`
      };
    case actionTypes.EDIT_INTERCHANGE_DONE:
      return {
        ...state,
        success: `Interchange ${action.interchange.name} edited`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_SETTLEMENT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Settlement Rule ${action.settlementRule.name}`
      };
    case actionTypes.CREATE_SETTLEMENT_DONE:
      return {
        ...state,
        success: `Settlement Rule ${action.settlementRule.name} created`,
        response: action.settlementRule,
        error: null,
        info: null
      };
    case actionTypes.EDIT_SETTLEMENT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Editing Settlement Rule ${action.settlementRule.name}`
      };
    case actionTypes.EDIT_SETTLEMENT_DONE:
      return {
        ...state,
        success: `Settlement Rule ${action.settlementRule.name} edited`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_BILLPAY_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating composite bill pay ruleset`
      };
    case actionTypes.CREATE_BILLPAY_DONE:
      return {
        ...state,
        success: `Composite bill pay ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_PG_DONE:
      return {
        ...state,
        success: `Composite PG ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_MERCHANT_RULESET_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating composite merchant ruleset`
      };
    case actionTypes.CREATE_MERCHANT_RULESET_DONE:
      return {
        ...state,
        success: `Composite merchant ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.APPROVE_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: action.recordType === 'internalFundTransfer' ?
          `Trying to approve` : `Trying to approve ${action.recordType} ${action.record.name}`
      };
    case actionTypes.APPROVE_DONE:
      if (action.recordType === 'internalFundTransfer') {
        return {
          ...state,
          success: `Approved`,
          error: null,
          info: null
        };
      } else {
        return {
          ...state,
          success: action.recordType === 'ratecard' ?
            `Approved ${action.recordType} ${action.record.rateCards[action.extra.index].name}` : `Approved ${action.recordType} ${action.record.name}`,
          error: null,
          info: null
        };
      }
    case actionTypes.APPROVE_RATECARD_DONE:
      return {
        ...state,
        success: `Approved RateCard ${action.requestName}`,
        error: null,
        info: null
      };
    case actionTypes.ACTIVATE_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Trying to activate ${action.recordType} ${action.record.name}`
      };
    case actionTypes.ACTIVATE_DONE:
      return {
        ...state,
        success: action.recordType === 'ratecard' ?
          `Activated ${action.recordType} ${action.record.rateCards[action.extra.index].name}` :
          action.recordType === 'aggregator' ?
          `Activated ${action.recordType} ${action.record.id}`
          :
           `Activated ${action.recordType} ${action.record.name}`,
        error: null,
        info: null
      };
    case actionTypes.ACTIVATE_RATECARD_DONE:
      return {
        ...state,
        success: `Activated RateCard ${action.requestName}`,
        error: null,
        info: null
      };
    case actionTypes.DEACTIVATE_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Trying to deactivate ${action.recordType} ${action.record.name}`
      };
    case actionTypes.DEACTIVATE_DONE:
      return {
        ...state,
        success: action.recordType === 'ratecard' ?
          `Deactivated ${action.recordType} ${action.record.rateCards[action.extra.index].name}` : 
          action.recordType === 'aggregator' ?
          `Deactivated ${action.recordType} ${action.record.id}`
          :
          `Deactivated ${action.recordType} ${action.record.name}`,
        error: null,
        info: null
      };
    case actionTypes.DEACTIVATE_RATECARD_DONE:
      return {
        ...state,
        success: `Deactivated RateCard ${action.requestName}`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_REPORT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: "Trying to generate report"
      };
    case actionTypes.CREATE_REPORT_DONE:
      return {
        ...state,
        success: "Generated report",
        error: null,
        info: null
      };
    case actionTypes.REPLAY_DISBURSEMENT_DONE:
      return {
        ...state,
        success: `Replayed disbursement for URN: ${action.urn}`,
        error: null,
        info: null
      };
    case actionTypes.INVOICE_RECOVERY_DONE:
      return {
        ...state,
        success: `Invoice recovery event accepted`,
        error: null,
        info: null
      };
    case actionTypes.EDIT_RATECARD:
      return {
        ...state,
        success: null,
        error: null,
        info: `Editing Ratecard for rule ${action.data.ruleId}`
      };
    case actionTypes.EDIT_RATECARD_DONE:
      return {
        ...state,
        success: `Ratecard edited`,
        error: null,
        info: null
      };
    case actionTypes.TOA_CLOSE:
      return {
        ...state,
        success: null,
        error: null,
        info: `Submitting request for ${action.data.fail_id}`
      };
    case actionTypes.TOA_CLOSE_DONE:
      return {
        ...state,
        success: `Request submitted`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_PG_RATE_CARD:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating ${action.pgRateCard.rateCardId} Rate Card ID`
      };
    case actionTypes.CREATE_PG_RATE_CARD_DONE:
      return {
        ...state,
        success: `${action.pgRateCard.rateCardId} Rate Card ID created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_PG_MID:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating ${action.pgMId.mid} MID`
      };
    case actionTypes.CREATE_PG_MID_DONE:
      return {
        ...state,
        success: `${action.pgMId.mid} MID created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_COMPOSED_AGGREGATOR_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Composed Aggregator Ruleset`
      };
    case actionTypes.CREATE_COMPOSED_AGGREGATOR_DONE:
      return {
        ...state,
        success: `Composed Aggregator Ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_COMPOSED_MERCHANT_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Composed Merchant Ruleset`
      };
    case actionTypes.CREATE_COMPOSED_MERCHANT_DONE:
      return {
        ...state,
        success: `Composed Merchant Ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_COMPOSED_PG_ATTEMPT:
      return {
        ...state,
        success: null,
        error: null,
        info: `Creating Composed PG Ruleset`
      };
    case actionTypes.CREATE_COMPOSED_PG_DONE:
      return {
        ...state,
        success: `Composed PG Ruleset created`,
        error: null,
        info: null
      };
    case actionTypes.CREATE_RATECARD_TEMPLATE:
      return {
        ...state,
        info: `Creating Rate Card Template`,
        error: null,
        success: null
      };
    case actionTypes.CREATE_RATECARD_TEMPLATE_DONE:
      return {
        ...state,
        success: `Rate Card Template created`,
        error: null,
        info: null
      };
      case actionTypes.CREATE_COMPOSED_CAMPAIGN_ATTEMPT:
        return {
          ...state,
          success: null,
          error: null,
          info: `Creating Composed Campaign Ruleset`
        };
      case actionTypes.CREATE_COMPOSED_CAMPAIGN_DONE:
        return {
          ...state,
          success: `Composed Campaign Ruleset created`,
          error: null,
          info: null
        };
    default:
      return state;
  }
}
