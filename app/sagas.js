import { call, put, all, takeLatest, fork } from "redux-saga/effects";
import { forwardToRootPath, forwardToLoginPath, forwardToListPath, forwardToRatecardSummaryPath } from "routes";
import * as ruleTypes from "components/rules/rule_types";
import * as actionTypes from "actions/action_types";
import * as actionCreators from "actions/action_creators";
import api from "apis/index";

//Storing the user data for 12hours to skip login unnecessarily
const halfDay = 43200000;

// helper method when making a single request
// wrap false in `sendingRequest(true)` and `sendingRequest(false)`
// when making multiple requests
function* sendingRequest(request, ...args) {
  yield put(actionCreators.sendingRequest(true));
  const response = yield call(request, ...args);
  yield put(actionCreators.sendingRequest(false));
  return response;
}

function* loginUser(action) {
  const { login, password } = action;

  try {
    const user = yield call(sendingRequest, api.loginUser, login, password);
    let expiryDate = Date.now() + halfDay;
    yield put(actionCreators.loginSuccess(login, password, expiryDate));
    window.localStorage.setItem("user", btoa(JSON.stringify({ login, password, expiryDate })));
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.loginFailed(e.message));
    forwardToLoginPath();
  }
}

function* logoutUser(action) {
  try {
    window.localStorage.removeItem("user");
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
    forwardToLoginPath();
  }
}

function* createRulesetMetadata(data) {
  // blocking call
  const ruleset = yield call(api.createRuleset, data);
  console.debug(`created ruleset with id ${ruleset.id}`);
  return ruleset;
}



function* createFilters(rulesetId, data) {
  const filtersReq = data.filters.map((filter) => {
    const expression = `[?($.${filter.leftOperand}${filter.operation}'${filter.rightOperand}')]`;
    return {
      name: data.name,
      rulesetId,
      expression
    };
  });

  // concurrent call
  yield filtersReq.map((filterReq) => {
    return call(api.createFilter, filterReq);
  });
  console.debug('created filters');
}

function* createRules(rulesetId, rules) {
  for (var rule of rules) {
    if (rule.type === ruleTypes.FIXED_COMMISSION_RULE) {
      yield call(createFixedCommissionRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.FIXED_INTERCHANGE_FEE_RULE) {
      yield call(createFixedInterchangeFeeRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.FIXED_RATE_COMMISSION_RULE) {
      yield call(createFixedRateCommissionRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.FIXED_RATE_INTERCHANGE_FEE_RULE) {
      yield call(createFixedRateInterchangeFeeRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.SLABBED_FIXED_COMMISSION_RULE) {
      yield call(createSlabbedFixedCommissionRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.SLABBED_FIXED_INTERCHANGE_FEE_RULE) {
      yield call(createSlabbedFixedInterchangeFeeRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.SLABBED_FIXED_RATE_COMMISSION_RULE) {
      yield call(createSlabbedFixedRateCommissionRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE) {
      yield call(createSlabbedFixedRateInterchangeFeeRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.ACCOUNT_ENTRY_RULE) {
      yield call(createAccountingEntryRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.BASIC_RATE_CARD_RULE) {
      yield call(createBasicRateCardRule, rulesetId, rule);
    } else if (rule.type === ruleTypes.COUNT_BASED_RATE_CARD_RULE) {
      yield call(createCountBasedRateCardRule, rulesetId, rule);
    }
    else if (rule.type === ruleTypes.PRE_CALCULATED_RATE_CARD_RULE) {
      yield call(createPreCalRuleset, rulesetId, rule);
    }
  }
  console.debug('created rules');
}

function* createFixedCommissionRule(rulesetId, { data }) {
  const rule = yield call(api.createFixedCommissionRule, rulesetId, data);
  return rule;
}

function* createFixedInterchangeFeeRule(rulesetId, { data }) {
  const rule = yield call(api.createFixedInterchangeFeeRule, rulesetId, data);
  return rule;
}

function* createFixedRateCommissionRule(rulesetId, { data }) {
  const rule = yield call(api.createFixedRateCommissionRule, rulesetId, data);
  return rule;
}

function* createFixedRateInterchangeFeeRule(rulesetId, { data }) {
  const rule = yield call(api.createFixedRateInterchangeFeeRule, rulesetId, data);
  return rule;
}

function* createSlabbedFixedCommissionRule(rulesetId, { data }) {
  const rule = yield call(api.createSlabbedFixedCommissionRule, rulesetId, data);
  return rule;
}

function* createSlabbedFixedInterchangeFeeRule(rulesetId, { data }) {
  const rule = yield call(api.createSlabbedFixedInterchangeFeeRule, rulesetId, data);
  return rule;
}

function* createSlabbedFixedRateCommissionRule(rulesetId, { data }) {
  const rule = yield call(api.createSlabbedFixedRateCommissionRule, rulesetId, data);
  return rule;
}

function* createSlabbedFixedRateInterchangeFeeRule(rulesetId, { data }) {
  const rule = yield call(api.createSlabbedFixedRateInterchangeFeeRule, rulesetId, data);
  return rule;
}

function* createAccountingEntryRule(rulesetId, { data }) {
  const rule = yield call(api.createAccountingEntryRule, rulesetId, data);
  return rule;
}

function* createBasicRateCardRule(rulesetId, { data }) {
  const rule = yield call(api.createBasicRateCardRule, rulesetId, data);
  return rule;
}

function* createCountBasedRateCardRule(rulesetId, { data }) {
  const rule = yield call(api.createCountBasedRateCardRule, rulesetId, data);
  return rule;
}

function* createRuleset(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const ruleset = yield call(createRulesetMetadata, action.ruleset);
    const rulesetId = ruleset.id;
    yield call(createRules, rulesetId, action.rules);
    yield put(actionCreators.sendingRequest(false));
    console.debug('created ruleset, filter and rules');
    yield put(actionCreators.createRulesetDone(action));
    forwardToListPath('rulesets');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createPreCalRuleset(rulesetId, { data }) {
  const rule = yield call(api.createPreCalRuleset, rulesetId, data);
  return rule;
}

function* editRuleset(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const ruleset = yield call(createRulesetMetadata, action.ruleset, action.id);
    const rulesetId = ruleset.id;
    yield call(createFilters, rulesetId, action.filter);
    yield call(createRules, rulesetId, action.rules);
    yield put(actionCreators.sendingRequest(false));

    console.debug('created ruleset, filter and rules');
    yield put(actionCreators.editRulesetDone(action));
    forwardToListPath('rulesets');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* multiFind(action) {
  const { searchingFor, entryType, index, query, isPrefilled } = action;
  var result = {};

  try {
    if (entryType === "Interchange") {
      result = yield call(getInterchangeBySearchTerm, action);
    } else if (entryType === "Merchant") {
      result = yield call(getMerchantBySearchTerm, action);
    } else if (entryType === "Account") {
      result = yield call(getAccountByNumber, action);
    } else {
      console.debug(`do not recognize entryType ${entryType}`);
    }
    yield put(actionCreators.multiFindDone(action.forComponent, searchingFor, entryType, result, index));
    if (isPrefilled) {
      yield put(actionCreators.multiFindLock(action.forComponent, searchingFor, entryType, 0, index));
    }
  } catch (e) {
    if (e.message === "unauthorized") {
      yield put(actionCreators.multiFindCancelled(action.forComponent, searchingFor, index));
      yield put(actionCreators.unauthorizedLogin());
    } else {
      yield put(actionCreators.multiFindFailed(action.forComponent, searchingFor, e.message, index));
    }
  }
}

function* getInterchangeByShortId(action) {
  const interchange = yield call(api.getInterchangeByShortId, action.query);
  return interchange;
}

function* getMerchantByShortId(action) {
  const merchant = yield call(api.getMerchantByShortId, action.query);
  return merchant;
}

function* getMerchantBySearchTerm(action) {
  const merchant = yield call(api.getMerchantBySearchTerm, action.query);
  if (merchant) {
    return merchant;
  } else {
    return [];
  }
}

function* getInterchangeBySearchTerm(action) {
  const interchange = yield call(api.getInterchangeBySearchTerm, action.query);
  if (interchange) {
    return interchange;
  } else {
    return [];
  }
}

function* getAccountByNumber(action) {
  const account = yield call(api.getAccountByNumber, action.query);
  return account;
}

function* searchMerchant(action) {
  try {
    const result = yield call(getMerchantByShortId, action);
    yield put(actionCreators.merchantSearchDone(action.index, action.query, result));
  } catch (e) {
    if (e.message === "unauthorized") {
      yield put(actionCreators.merchantSearchCancelled(action.index));
      yield put(actionCreators.unauthorizedLogin());
    } else {
      yield put(actionCreators.merchantSearchFailed(action.index, action.query, e.message));
    }
  }
}

function* listRulesets(action) {
  const { page, pageSize, filters, searchItems } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const rulesets = yield call(api.listRulesets, page, pageSize, filters, searchItems);
    const count = yield call(api.countList, "ruleset", filters, searchItems);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listRulesetsDone(rulesets, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* searchList(action) {
  const { listType, searchTerm, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const result = yield call(api.searchList, listType, searchTerm, filters);
    const count = yield call(api.countSearch, listType, searchTerm, filters);
    yield put(actionCreators.sendingRequest(false));
    switch (listType) {
      case 'ruleset':
        yield put(actionCreators.searchRulesetDone(result, count.count));
        break;
      case 'merchant':
        yield put(actionCreators.searchMerchantDone(result, count.count));
        break;
      case 'interchange':
        yield put(actionCreators.searchInterchangeDone(result, count.count));
        break;
      case 'account':
        yield put(actionCreators.searchAccountDone(result, count.count));
        break;
      case 'internalFundTransfer':
        yield put(actionCreators.searchInternalFundTransferDone(result, count.count));
        break;
      case 'settlement':
        yield put(actionCreators.searchSettlementDone(result, count.count));
        break;
      case 'pgRateCard':
        yield put(actionCreators.searchPgRateCardDone(result, count.count));
        break;
      case 'rules/tax':
        yield put(actionCreators.searchTaxRuleDone(result, count.count));
        break;
      case 'pgMId':
        yield put(actionCreators.searchPgMIdDone(result, count.count));
        break;
      default:
    }
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showRuleset(action) {
  const rulesetId = action.rulesetId;
  try {
    const ruleset = yield call(sendingRequest, api.showRuleset, rulesetId);
    const rateCardTemplates = yield call(sendingRequest, api.showRuleSetRateCardTemplateMapping, rulesetId);

    ruleset.rateCardTemplates = rateCardTemplates;

    // for (var rule of ruleset.preCalculatedRateCardRules) {

    //   const toPartyType = rule.toPartyType;
    //   const fromPartyType = rule.fromPartyType;


    //   if (!(typeof fromPartyType === "undefined" || fromPartyType === "USER" || rule.fromExpression)) {
    //     const fromParty = yield call(sendingRequest, getNameByIdAPI(fromPartyType), rule.fromParty);
    //     rule.fromPartyName = fromParty.name;
    //     rule.fromPartyShortName = getShortId(fromPartyType, fromParty);
    //   }

    //   if (!(typeof toPartyType === "undefined" || toPartyType === "USER" || rule.toExpression)) {
    //     const toParty = yield call(sendingRequest, getNameByIdAPI(toPartyType), rule.toParty);
    //     rule.toPartyName = toParty.name;
    //     rule.toPartyShortName = getShortId(toPartyType, toParty);
    //   }


    //   if (toPartyType === "USER")
    //     rule.toPartyName = rule.toParty;

    //   if (toPartyType === "USER")
    //     rule.fromPartyName = rule.fromParty;
    // };

    for (var rule of ruleset.accountEntryRules) {

      const toPartyType = rule.toPartyType;
      const fromPartyType = rule.fromPartyType;

      if (!(typeof fromPartyType === "undefined" || fromPartyType === "USER" || rule.fromExpression)) {
        const fromParty = yield call(sendingRequest, getNameByIdAPI(fromPartyType), rule.fromParty);
        rule.fromPartyName = fromParty.name;
        rule.fromPartyShortName = getShortId(fromPartyType, fromParty);
      }

      if (!(typeof toPartyType === "undefined" || toPartyType === "USER" || rule.toExpression)) {
        const toParty = yield call(sendingRequest, getNameByIdAPI(toPartyType), rule.toParty);
        rule.toPartyName = toParty.name;
        rule.toPartyShortName = getShortId(toPartyType, toParty);
      }

      // if (partyType === "USER" )
      //   rule.payerName = rule.payer;

      if (toPartyType === "USER")
        rule.toPartyName = rule.toParty;

      if (toPartyType === "USER")
        rule.fromPartyName = rule.fromParty;
    };
    for (var rateCardTemplate of ruleset.rateCardTemplates) {
      rateCardTemplate = rateCardTemplate.rateCardTemplate;
      for (var rule of rateCardTemplate.rateCardRules) {
        const toPartyType = rule.toPartyType;
        const fromPartyType = rule.fromPartyType;

        if (!(typeof fromPartyType === "undefined" || fromPartyType === "USER" || rule.fromExpression)) {
          const fromParty = yield call(sendingRequest, getNameByIdAPI(fromPartyType), rule.fromParty);
          rule.fromParty = fromParty.name;
          rule.fromPartyShortName = getShortId(fromPartyType, fromParty);
        }

        if (!(typeof toPartyType === "undefined" || toPartyType === "USER" || rule.toExpression)) {
          const toParty = yield call(sendingRequest, getNameByIdAPI(toPartyType), rule.toParty);
          rule.toParty = toParty.name;
          rule.toPartyShortName = getShortId(toPartyType, toParty);
        }

        if (toPartyType === "USER")
          rule.toParty = rule.toParty;

        if (toPartyType === "USER")
          rule.fromParty = rule.fromParty;
      };
    };
    yield put(actionCreators.showRulesetDone(ruleset));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createMerchant(action) {
  try {
    const merchant = yield call(sendingRequest, api.createMerchant, action.merchant);
    yield put(actionCreators.createMerchantDone(merchant));
    forwardToListPath('merchants');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* editMerchant(action) {
  try {
    const merchant = yield call(sendingRequest, api.editMerchant, action.merchant, action.id);
    yield put(actionCreators.editMerchantDone(merchant));
    forwardToListPath('merchants');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listMerchants(action) {
  const { page, pageSize, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const merchants = yield call(api.listMerchants, page, pageSize, filters);
    const count = yield call(api.countList, "merchant", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listMerchantsDone(merchants, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showMerchant(action) {
  const merchantId = action.merchantId;

  try {
    const merchant = yield call(sendingRequest, api.showMerchant, action.merchantId);
    yield put(actionCreators.showMerchantDone(merchant));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* verifyAddress(action) {
  const merchantId = action.merchant.id;

  try {
    const merchant = yield call(sendingRequest, api.verifyAddress, merchantId);
    yield put(actionCreators.verifyAddressSuccess(merchant));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listInterchanges(action) {
  const { page, pageSize, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const interchanges = yield call(api.listInterchanges, page, pageSize, filters);
    const count = yield call(api.countList, "interchange", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listInterchangesDone(interchanges, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

// List TAX RULES

function* listTaxRules(action) {
  const { page, pageSize, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const taxRules = yield call(api.listTaxRules, page, pageSize, filters);
    const count = yield call(api.countList, "rules/tax", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listTaxRulesDone(taxRules, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e))
  }
}

function* listTaxRulesSaga() {
  yield all([takeLatest(actionTypes.LIST_TAX_RULES, listTaxRules)]);
}

function* listTaxAccounts(action) {
  try {
    const taxAccounts = yield call(sendingRequest, api.listTaxAccounts);
    yield put(actionCreators.listTaxAccountsDone(taxAccounts));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listTaxes(action) {
  try {
    const taxes = yield call(sendingRequest, api.listTaxes);
    yield put(actionCreators.listTaxesDone(taxes));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listCesses(action) {
  try {
    const cesses = yield call(sendingRequest, api.listCesses);
    yield put(actionCreators.listCessesDone(cesses));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createAccount(action) {
  try {
    const account = yield call(sendingRequest, api.createAccount, action.account);
    yield put(actionCreators.createAccountDone(account));
    forwardToListPath('accounts');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createAccountSaga() {
  yield all([takeLatest(actionTypes.CREATE_ACCOUNT_ATTEMPT, createAccount)]);
}

function* createInternalFundTransfer(action) {
  try {
    const internalFundTransfer = yield call(sendingRequest, api.createInternalFundTransfer, action.internalFundTransfer);
    yield put(actionCreators.createInternalFundTransferDone(internalFundTransfer));
    forwardToListPath('internalFundTransfers');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createInternalFundTransferSaga() {
  yield all([takeLatest(actionTypes.CREATE_INTERNAL_FUND_TRANSFER_ATTEMPT, createInternalFundTransfer)]);
}

function* editAccount(action) {
  try {
    const account = yield call(sendingRequest, api.editAccount, action.account, action.id);
    yield put(actionCreators.editAccountDone(account));
    forwardToListPath('accounts');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* editAccountSaga() {
  yield all([takeLatest(actionTypes.EDIT_ACCOUNT_ATTEMPT, editAccount)]);
}

function* loginSaga() {
  yield all([takeLatest(actionTypes.LOGIN_ATTEMPT, loginUser)]);
}

function* logoutSaga() {
  yield all([takeLatest(actionTypes.SET_LOGOUT, logoutUser)]);
}

function* createRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_RULESET, createRuleset)]);
}

// function* createPreCalRulesetSaga() {
//   yield all([takeLatest(actionTypes.CREATE_PRE_CAL_RULESET, createPreCalRuleset)]);
// }

function* editRulesetSaga() {
  yield all([takeLatest(actionTypes.EDIT_RULESET, editRuleset)]);
}

function* multiFindSaga() {
  yield all([takeLatest(actionTypes.MULTI_FIND, multiFind)]);
}

function* searchMerchantSaga() {
  yield all([takeLatest(actionTypes.MERCHANT_SEARCH, searchMerchant)]);
}

function* listRulesetsSaga() {
  yield all([takeLatest(actionTypes.LIST_RULESETS, listRulesets)]);
}

function* searchListSaga() {
  yield all([takeLatest(actionTypes.SEARCH_LIST, searchList)]);
}

function* showRulesetSaga() {
  yield all([takeLatest(actionTypes.SHOW_RULESET, showRuleset)]);
}

function* createMerchantSaga() {
  yield all([takeLatest(actionTypes.CREATE_MERCHANT_ATTEMPT, createMerchant)]);
}

function* editMerchantSaga() {
  yield all([takeLatest(actionTypes.EDIT_MERCHANT_ATTEMPT, editMerchant)]);
}

function* listMerchantsSaga() {
  yield all([takeLatest(actionTypes.LIST_MERCHANTS, listMerchants)]);
}

function* showMerchantSaga() {
  yield all([takeLatest(actionTypes.SHOW_MERCHANT, showMerchant)]);
}

function* verifyAddressSaga() {
  yield all([takeLatest(actionTypes.ADDRESS_VERIFY_ATTEMPT, verifyAddress)]);
}

function* listInterchangesSaga() {
  yield all([takeLatest(actionTypes.LIST_INTERCHANGES, listInterchanges)]);
}


function* listTaxAccountsSaga() {
  yield all([takeLatest(actionTypes.LIST_TAX_ACCOUNTS, listTaxAccounts)]);
}

function* listCessesSaga() {
  yield all([takeLatest(actionTypes.LIST_CESSES, listCesses)]);
}

function* listTaxesSaga() {
  yield all([takeLatest(actionTypes.LIST_TAXES, listTaxes)]);
}

function* createInterchange(action) {
  try {
    const interchange = yield call(sendingRequest, api.createInterchange, action.interchange);
    yield put(actionCreators.createInterchangeDone(interchange));
    forwardToListPath('interchanges');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createInterchangeSaga() {
  yield all([takeLatest(actionTypes.CREATE_INTERCHANGE_ATTEMPT, createInterchange)]);
}

function* editInterchange(action) {
  try {
    const interchange = yield call(sendingRequest, api.editInterchange, action.interchange, action.id);
    yield put(actionCreators.editInterchangeDone(interchange));
    forwardToListPath('interchanges');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* editInterchangeSaga() {
  yield all([takeLatest(actionTypes.EDIT_INTERCHANGE_ATTEMPT, editInterchange)]);
}

// Create Tax Rule
function* createTaxRule(action) {
  try {
    const taxRule = yield call(sendingRequest, api.createTaxRule, action.taxRule);
    yield put(actionCreators.createTaxRulesetsDone(taxRule));
    forwardToListPath('tax-rules');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e))
  }
}

function* createTaxRuleSaga() {
  yield all([takeLatest(actionTypes.CREATE_TAX_RULESETS, createTaxRule)])
}

function* editTaxRule(action) {
  try {
    const taxRule = yield call(sendingRequest, api.editTaxRule, action.taxRule, action.id);
    yield put(actionCreators.editTaxRuleDone(taxRule));
    forwardToListPath('tax-rules');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e))
  }
}

function* editTaxRuleSaga() {
  yield all([takeLatest(actionTypes.EDIT_TAX_RULE, editTaxRule)]);
}



function* listAccounts(action) {
  const { page, pageSize, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const accounts = yield call(api.listAccounts, page, pageSize, filters);
    const count = yield call(api.countList, "account", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listAccountsDone(accounts, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listAccountsSaga() {
  yield all([takeLatest(actionTypes.LIST_ACCOUNTS, listAccounts)]);
}

function* listInternalFundTransfers(action) {
  const { page, pageSize, filters } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const internalFundTransfers = yield call(api.listInternalFundTransfers, page, pageSize, filters);
    const count = yield call(api.countList, "internalFundTransfer", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listInternalFundTransfersDone(internalFundTransfers, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listInternalFundTransfersSaga() {
  yield all([takeLatest(actionTypes.LIST_INTERNAL_FUND_TRANSFERS, listInternalFundTransfers)]);
}

function* showAccount(action) {
  try {
    const account = yield call(sendingRequest, api.showAccount, action.accountId);
    yield put(actionCreators.showAccountDone(account));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showAccountSaga() {
  yield all([takeLatest(actionTypes.SHOW_ACCOUNT, showAccount)]);
}

function* showInternalFundTransfer(action) {
  try {
    const internalFundTransfer = yield call(sendingRequest, api.showInternalFundTransfer, action.internalFundTransferId);
    yield put(actionCreators.showInternalFundTransferDone(internalFundTransfer));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showInternalFundTransferSaga() {
  yield all([takeLatest(actionTypes.SHOW_INTERNAL_FUND_TRANSFER, showInternalFundTransfer)]);
}

function* listSettlements(action) {
  const { page, pageSize, filters } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const settlements = yield call(api.listSettlements, page, pageSize, filters);
    const count = yield call(api.countList, "rules/settlement", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listSettlementsDone(settlements, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listSettlementsSaga() {
  yield all([takeLatest(actionTypes.LIST_SETTLEMENTS, listSettlements)]);
}

function getShortId(entryType, payload) {
  switch (entryType) {
    case "INTERCHANGE":
      return payload.interchangeId;
    case "MERCHANT":
      return payload.merchantId;
    case "ACCOUNT":
      return payload.accountNo;
    default:
      return null
  }
}

function* showTaxRule(action) {
  try {
    var taxRule = yield call(sendingRequest, api.showTaxRule, action.id);

    let taxRuleParty = "MERCHANT"

    const fromParty = yield call(sendingRequest, getNameByIdAPI(taxRuleParty), taxRule.toPartyId);
    taxRule.toPartyId = getShortId(taxRuleParty, fromParty);

    yield put(actionCreators.showTaxRuleDone(taxRule));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showSettlement(action) {
  try {
    var settlementRule = yield call(sendingRequest, api.showSettlement, action.settlementId);





    if (settlementRule.fromPartyType === "USER") {
      settlementRule.fromPartyName = settlementRule.fromParty;
      settlementRule.fromPartyShortName = settlementRule.fromParty;
    } else {
      const fromParty = yield call(sendingRequest, getNameByIdAPI(settlementRule.fromPartyType), settlementRule.fromParty);
      settlementRule.fromPartyName = fromParty.name;
      settlementRule.fromPartyShortName = getShortId(settlementRule.fromPartyType, fromParty);
    }
    if (settlementRule.toPartyType === "USER") {
      settlementRule.toPartyName = settlementRule.toParty;
      settlementRule.toPartyShortName = settlementRule.toParty;
    } else {
      if (settlementRule.toParty && settlementRule.toPartyType) {
        const toParty = yield call(sendingRequest, getNameByIdAPI(settlementRule.toPartyType), settlementRule.toParty);
        settlementRule.toPartyName = toParty.name;
        settlementRule.toPartyShortName = getShortId(settlementRule.toPartyType, toParty);

      }
    }



  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }

  const lookup = {
    settlementTag: settlementRule.settlementTag,
    fromParty: settlementRule.fromParty,
    fromPartyType: settlementRule.fromPartyType,
    toParty: settlementRule.toParty,
    toPartyType: settlementRule.toPartyType
  };


  var invoice = null, disbursement = null; getOnDemandDetails = null; showScheduleType = null;

  try {
    if (settlementRule.id) {
      var showScheduleType = yield call(sendingRequest, api.showScheduleType, settlementRule.id)
    }

  } catch (e) {
    yield put(actionCreators.showSettlementDone(settlementRule, {}, {}, {}, []));
  }

  try {
    invoice = yield call(sendingRequest, api.lookupInvoice, lookup);

  } catch (e) {
    yield put(actionCreators.showSettlementDone(settlementRule, {}, {}, {}, []));
  }

  try {
    disbursement = yield call(sendingRequest, api.lookupDisbursement, lookup);
  } catch (e) {
    yield put(actionCreators.showSettlementDone(settlementRule, {}, {}, {}, []));
  }

  try {
    if (settlementRule.toPartyType === "MERCHANT") {
      var getOnDemandDetails = yield call(sendingRequest, api.getOnDemandById, settlementRule.toPartyShortName)
    }
  } catch (e) {
    yield put(actionCreators.showSettlementDone(settlementRule, {}, {}, {}, []));
  }

  yield put(actionCreators.showSettlementDone(settlementRule, invoice, disbursement, getOnDemandDetails, showScheduleType));
}

function getNameByIdAPI(entryType) {
  switch (entryType) {
    case "INTERCHANGE":
      return api.getInterchangeById;
    case "MERCHANT":
      return api.getMerchantById;
    case "ACCOUNT":
      return api.getAccountById;
  }
}

function* showSettlementSaga() {
  yield all([takeLatest(actionTypes.SHOW_SETTLEMENT, showSettlement)]);
}

function* showInterchange(action) {
  try {
    const interchange = yield call(sendingRequest, api.showInterchange, action.interchangeId);
    yield put(actionCreators.showInterchangeDone(interchange));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showInterchangeSaga() {
  yield all([takeLatest(actionTypes.SHOW_INTERCHANGE, showInterchange)]);
}



function* showTaxRuleSaga() {
  yield all([takeLatest(actionTypes.SHOW_TAX_RULE, showTaxRule)])
}

function approveApiName(recordType) {
  switch (recordType) {
    case 'ratecard':
      return 'approveRatecard';
    case 'ruleset':
      return "approveRuleset";
    case 'rule':
      return "approveRule";
    case 'merchant':
      return "approveMerchant";
    case 'account':
      return "approveAccount";
    case 'internalFundTransfer':
      return "approveInternalFundTransfer";
    case 'interchange':
      return "approveInterchange";
    case 'settlement':
      return "approveSettlementRule";
    case 'pgMId':
      return "approvePgMId";
    case 'taxRule':
      return "approveTaxRule"
    case 'rules/tax':
      return "approveTaxRule";
    default:
      return new Error(`did not recognize record type ${recordType}`);
  }
}

function* approveRecord(action) {
  const { recordType, record: request } = action;
  const { index, recordId, ruleType } = action.extra;



  try {
    var apiName = approveApiName(recordType);
    const record = yield call(api[apiName], request.id, { ruleType });

    if (recordType === 'rule') {
      if (record.partyType === "USER" || record.payerExpression) {
        record.payerName = record.payer;
        record.payerShortName = record.payer;
      } else {
        const payer = yield call(sendingRequest, getNameByIdAPI(record.partyType), record.payer);
        record.payerName = payer.name;
        record.payerShortName = getShortId(record.partyType, payer);
      }
      if (record.toPartyType === "USER" || record.toExpression) {
        record.toPartyName = record.toParty;
        record.toPartyShortName = record.toParty;
      } else {
        if (record.toParty && record.toPartyType) {
          const toParty = yield call(sendingRequest, getNameByIdAPI(record.toPartyType), record.toParty);
          record.toPartyName = toParty.name;
          record.toPartyShortName = getShortId(record.toPartyType, toParty);
        }
      }
    }

    yield put(actionCreators.approveSuccess(recordType, record, { index, recordId, ruleType }));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* approveSaga() {
  yield all([takeLatest(actionTypes.APPROVE_ATTEMPT, approveRecord)]);
}

function activateApiName(recordType) {
  switch (recordType) {
    case 'ratecard':
      return 'activateRatecard';
    case 'ruleset':
      return "activateRuleset";
    case 'rule':
      return "activateRule";
    case 'filter':
      return "activateFilter";
    case 'merchant':
      return "activateMerchant";
    case 'account':
      return "activateAccount";
    case 'interchange':
      return "activateInterchange";
    case 'settlement':
      return "activateSettlementRule";
    case 'pgMId':
      return "activatePgMId";
    case 'rules/tax':
      return "activateTaxRule";
    case 'aggregator':
      return "activateAggregatorService";
    default:
      return new Error(`did not recognize record type ${recordType}`);
  }
}

function* activateRecord(action) {
  const { recordType, record: request } = action;
  const { index, merchantId, ruleType } = action.extra;
  try {
    var apiName = activateApiName(recordType);
    const record = yield call(api[apiName], request.id, { ruleType });

    if (recordType === 'rule') {
      if (record.partyType === "USER" || record.payerExpression) {
        record.payerName = record.payer;
        record.payerShortName = record.payer;
      } else {
        const payer = yield call(sendingRequest, getNameByIdAPI(record.partyType), record.payer);
        record.payerName = payer.name;
        record.payerShortName = getShortId(record.partyType, payer);
      }
      if (record.toPartyType === "USER" || record.toExpression) {
        record.toPartyName = record.toParty;
        record.toPartyShortName = record.toParty;
      } else {
        if (record.toParty && record.toPartyType) {
          const toParty = yield call(sendingRequest, getNameByIdAPI(record.toPartyType), record.toParty);
          record.toPartyName = toParty.name;
          record.toPartyShortName = getShortId(record.toPartyType, toParty);
        }
      }
    }
    yield put(actionCreators.activateSuccess(recordType, record, { index, merchantId, ruleType }));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* activateSaga() {
  yield all([takeLatest(actionTypes.ACTIVATE_ATTEMPT, activateRecord)]);
}

function deactivateApiName(recordType) {
  switch (recordType) {
    case 'ratecard':
      return 'deactivateRatecard';
    case 'ruleset':
      return "deactivateRuleset";
    case 'rule':
      return "deactivateRule";
    case 'filter':
      return "deactivateFilter";
    case 'merchant':
      return "deactivateMerchant";
    case 'account':
      return "deactivateAccount";
    case 'interchange':
      return "deactivateInterchange";
    case 'settlement':
      return "deactivateSettlementRule";
    case 'pgMId':
      return "deactivatePgMId";
    case 'rules/tax':
      return "deactivateTaxRule";
    case 'aggregator':
      return "deactivateAggregatorService";
    default:
      return new Error(`did not recognize record type ${recordType}`);
  }
}

function* deactivateRecord(action) {
  const { recordType, record: request } = action;
  const { index, merchantId, ruleType } = action.extra;

  try {
    var apiName = deactivateApiName(recordType);
    const record = yield call(api[apiName], request.id, { ruleType });

    if (recordType === 'rule') {
      if (record.partyType === "USER" || record.payerExpression) {
        record.payerName = record.payer;
        record.payerShortName = record.payer;
      } else {
        const payer = yield call(sendingRequest, getNameByIdAPI(record.partyType), record.payer);
        record.payerName = payer.name;
        record.payerShortName = getShortId(record.partyType, payer);
      }
      if (record.toPartyType === "USER" || record.toExpression) {
        record.toPartyName = record.toParty;
        record.toPartyShortName = record.toParty;
      } else {
        if (record.toParty && record.toPartyType) {
          const toParty = yield call(sendingRequest, getNameByIdAPI(record.toPartyType), record.toParty);
          record.toPartyName = toParty.name;
          record.toPartyShortName = getShortId(record.toPartyType, toParty);
        }
      }
    }

    yield put(actionCreators.deactivateSuccess(recordType, record, { index, merchantId, ruleType }));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* deactivateSaga() {
  yield all([takeLatest(actionTypes.DEACTIVATE_ATTEMPT, deactivateRecord)]);
}

function* listReportTypes() {
  try {
    const reportTypes = yield call(sendingRequest, api.listReportTypes);
    yield put(actionCreators.listReportTypesDone(reportTypes));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listReportTypesSaga() {
  yield all([takeLatest(actionTypes.LIST_REPORT_TYPES, listReportTypes)]);
}

function* createReport(action) {
  try {
    yield call(sendingRequest, api.generateReport, action.report);
    yield put(actionCreators.createReportDone());
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createReportSaga() {
  yield all([takeLatest(actionTypes.CREATE_REPORT_ATTEMPT, createReport)]);
}

function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
}

function* createSettlement(action) {
  try {
    let settlementRule = yield call(sendingRequest, api.createSettlementRule, action.settlementRule);
    const invoice = yield call(sendingRequest, api.createInvoiceRule, action.invoice);
    const disbursement = yield call(sendingRequest, api.createDisbursementRule, action.disbursement);

    if (isEmpty(action.onDemand)) {
      // var data = yield call(sendingRequest, api.createOnDemand, action.onDemand)
      yield put(actionCreators.createSettlementRuleDone(settlementRule, invoice, disbursement));
    } else {
      if (settlementRule.id) {
        var onDemand = yield call(sendingRequest, api.createOnDemand, action.onDemand, action.onDemand["settlementRuleId"] = settlementRule.id)
        yield put(actionCreators.createSettlementRuleDone(settlementRule, invoice, disbursement, onDemand))
      }
    }





    forwardToListPath('settlements');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createSettlementSaga() {
  yield all([takeLatest(actionTypes.CREATE_SETTLEMENT, createSettlement)]);
}

function* editSettlement(action) {


  try {
    const settlementRule = yield call(sendingRequest, api.editSettlementRule, action.settlementRule, action.id);
    const invoice = yield call(sendingRequest, api.editInvoiceRule, action.invoice, action.invoiceId);
    const disbursement = yield call(sendingRequest, api.editDisbursementRule, action.disbursement, action.disbursementId);

    if (action.onDemand.settlementRuleId === "") {
      var onDemand = yield call(sendingRequest, api.createOnDemand, action.onDemand, action.onDemand["settlementRuleId"] = settlementRule.id)
      yield put(actionCreators.editSettlementRuleDone(settlementRule, invoice, disbursement, onDemand))
    } else if (isEmpty(action.onDemand)) {
      yield put(actionCreators.editSettlementRuleDone(settlementRule, invoice, disbursement, {}));
    } else if (action.id) {
      var onDemand = yield call(sendingRequest, api.editOnDemand, action.onDemand, action.onDemand.merchantId)
      // var onDemand = yield call(sendingRequest, api.createOnDemand, action.onDemand)
      yield put(actionCreators.editSettlementRuleDone(settlementRule, invoice, disbursement, onDemand));
    }



    // yield put(actionCreators.editSettlementRuleDone(settlementRule, invoice, disbursement, onDemand));
    forwardToListPath('settlements');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* editSettlementSaga() {
  yield all([takeLatest(actionTypes.EDIT_SETTLEMENT, editSettlement)]);
}

function* createBillpayRuleset(action) {
  try {
    yield call(sendingRequest, api.createBillpayRuleset, action.billpay);
    yield put(actionCreators.createBillpayRulesetDone());
    forwardToListPath('rulesets');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createBillpayRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_BILLPAY_ATTEMPT, createBillpayRuleset)]);
}

function* createMerchantRuleset(action) {
  try {
    yield call(sendingRequest, api.createMerchantRuleset, action.merchantRuleset);
    yield put(actionCreators.createMerchantRulesetDone());
    forwardToListPath('rulesets');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createMerchantRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_MERCHANT_RULESET_ATTEMPT, createMerchantRuleset)]);
}

function* createPg(action) {
  try {
    yield call(sendingRequest, api.createPg, action.pg);
    yield put(actionCreators.createPGDone());
    forwardToListPath('rulesets');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createPgSaga() {
  yield all([takeLatest(actionTypes.CREATE_PG, createPg)]);
}

function* showTransactionStatus(action) {
  try {
    const transactionStatus = yield call(sendingRequest, api.showTransactionStatus, action.transactionOrExtId);
    if (transactionStatus.transactionDetails.sidelined)
      throw ({ 'message': transactionStatus.transactionDetails.error })
    yield put(actionCreators.showTransactionStatusDone(transactionStatus));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showTransactionStatusSaga() {
  yield all([takeLatest(actionTypes.SHOW_TRANSACTION_STATUS, showTransactionStatus)]);
}

function* changeTransactionStatus(action) {
  try {
    const transactionStatus = yield call(sendingRequest, api.changeTransactionStatus, action.id, action.status);
    yield put(actionCreators.changeTransactionStatusDone(transactionStatus));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* changeTransactionStatusSaga() {
  yield all([takeLatest(actionTypes.CHANGE_TRANSACTION_STATUS, changeTransactionStatus)]);
}

function* eventTypes() {
  try {
    const eventTypes = yield call(sendingRequest, api.eventTypes);
    yield put(actionCreators.eventTypesDone(eventTypes));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* eventTypesSaga() {
  yield all([takeLatest(actionTypes.EVENT_TYPES, eventTypes)]);
}

function* merchantSettlementStatus(action) {
  try {
    const { settlementType, interchangeId, merchantId } = action;
    yield put(actionCreators.sendingRequest(true));
    const merchantSettlements = (settlementType === "DISBURSEMENT") ?
      yield call(api.listMerchantDisbursements, interchangeId, merchantId, 0, 10) :
      yield call(api.listMerchantInvoices, interchangeId, merchantId, 0, 10);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listMerchantSettlementsDone(settlementType, merchantSettlements));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* merchantSettlementStatusSaga() {
  yield all([takeLatest(actionTypes.MERCHANT_SETTLEMENT_STATUS, merchantSettlementStatus)]);
}

function* utrLookup(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const utrLookup = yield call(sendingRequest, api.utrLookup, action.utr);
    yield put(actionCreators.utrLookupDone(utrLookup));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* utrLookupSaga() {
  yield all([takeLatest(actionTypes.LOOKUP_UTR, utrLookup)]);
}

function* replayDisbursement(action) {
  const partyType = action.partyType;
  try {
    yield put(actionCreators.sendingRequest(true));
    if (partyType === 'merchant')
      yield call(sendingRequest, api.replayMerchantDisbursement, action.urn);
    else
      yield call(sendingRequest, api.replayCustomerDisbursement, action.urn);
    yield put(actionCreators.replayDisbursementDone(action.urn));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* replayDisbursementSaga() {
  yield all([takeLatest(actionTypes.REPLAY_DISBURSEMENT, replayDisbursement)]);
}

function* showDisbursementByUrn(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const disbursement = yield call(sendingRequest, api.showDisbursementByUrn, action.urn);
    yield put(actionCreators.showDisbursementByUrnDone(disbursement));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showDisbursementSaga() {
  yield all([takeLatest(actionTypes.SHOW_DISBURSEMENT, showDisbursementByUrn)]);
}

function* listServiceTypes(action) {
  try {
    const serviceTypes = yield call(sendingRequest, api.serviceTypes);
    yield put(actionCreators.serviceTypesDone(serviceTypes));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* serviceTypesSaga() {
  yield all([takeLatest(actionTypes.SERVICE_TYPES, listServiceTypes)]);
}

function* approveRateCard(action) {
  const { recordType, record: request } = action;
  const { merchantId } = action.extra;
  try {
    var apiName = approveApiName(recordType);
    yield call(api[apiName], merchantId, request.id);
    const ratecards = yield call(api.listRatecards, merchantId);
    yield put(actionCreators.approveRateCardSuccess(ratecards.rateCards, request.name));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* approveRateCardSaga() {
  yield all([takeLatest(actionTypes.APPROVE_RATECARD_ATTEMPT, approveRateCard)]);
}

function* activateRateCard(action) {
  const { recordType, record: request } = action;
  const { index, merchantId, ruleType } = action.extra;
  try {
    var apiName = activateApiName(recordType);
    yield call(api[apiName], merchantId, request.id);
    const ratecards = yield call(api.listRatecards, merchantId);
    yield put(actionCreators.activateRateCardSuccess(ratecards.rateCards, request.name));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* activateRateCardSaga() {
  yield all([takeLatest(actionTypes.ACTIVATE_RATECARD_ATTEMPT, activateRateCard)]);
}

function* deactivateRateCard(action) {
  const { recordType, record: request } = action;
  const { index, merchantId, ruleType } = action.extra;
  try {
    var apiName = deactivateApiName(recordType);
    yield put(actionCreators.sendingRequest(true));
    yield call(api[apiName], merchantId, request.id);
    const ratecards = yield call(api.listRatecards, merchantId);
    yield put(actionCreators.deactivateRateCardSuccess(ratecards.rateCards, request.name));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* deactivateRateCardSaga() {
  yield all([takeLatest(actionTypes.DEACTIVATE_RATECARD_ATTEMPT, deactivateRateCard)]);
}

function* listRatecards(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const ratecards = yield call(sendingRequest, api.listRatecards, action.merchant);
    yield put(actionCreators.showRatecardsDone(ratecards.rateCards));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listRatecardsSaga() {
  yield all([takeLatest(actionTypes.SHOW_RATECARDS, listRatecards)]);
}

function* editRatecard(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    switch (action.data.ruleType) {
      case 'FIXED_COMMISSION_RULE':
        yield call(sendingRequest, api.editFixedCommissionRule, action.data.ruleId, action.data.payload);
        break;
      case 'FIXED_RATE_COMMISSION_RULE':
        yield call(sendingRequest, api.editFixedRateCommissionRule, action.data.ruleId, action.data.payload);
        break;
      case 'FIXED_INTERCHANGE_FEE_RULE':
        yield call(sendingRequest, api.editFixedInterchangeFeeRule, action.data.ruleId, action.data.payload);
        break;
      case 'FIXED_RATE_INTERCHANGE_FEE_RULE':
        yield call(sendingRequest, api.editFixedRateInterchangeFeeRule, action.data.ruleId, action.data.payload);
        break;
      case 'SLABBED_FIXED_COMMISSION_RULE':
        yield call(sendingRequest, api.editSlabbedFixedCommissionRule, action.data.ruleId, action.data.payload);
        break;
      case 'SLABBED_FIXED_RATE_COMMISSION_RULE':
        yield call(sendingRequest, api.editSlabbedFixedRateCommissionRule, action.data.ruleId, action.data.payload);
        break;
      case 'SLABBED_FIXED_INTERCHANGE_FEE_RULE':
        yield call(sendingRequest, api.editSlabbedFixedInterchangeFeeRule, action.data.ruleId, action.data.payload);
        break;
      case 'SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE':
        yield call(sendingRequest, api.editSlabbedFixedRateInterchangeFeeRule, action.data.ruleId, action.data.payload);
        break;
    }
    yield put(actionCreators.editRatecardDone());
    yield put(actionCreators.sendingRequest(false));
    forwardToRatecardSummaryPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* editRatecardSaga() {
  yield all([takeLatest(actionTypes.EDIT_RATECARD, editRatecard)]);
}

function* pendingSettlementAmount(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const pendingSettlementAmount = yield call(sendingRequest, api.pendingSettlementAmount, action.merchant);
    yield put(actionCreators.pendingSettlementAmountDone(pendingSettlementAmount));
    yield put(actionCreators.sendingRequest(false));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* pendingSettlementAmountSaga() {
  yield all([takeLatest(actionTypes.PENDING_SETTLEMENT_AMOUNT, pendingSettlementAmount)]);
}

function* invoiceRecovery(action) {
  try {
    yield put(actionCreators.sendingRequest(true));

    if (action.reconcile) {
      yield call(sendingRequest, api.reconcileInvoice, action.merchant, action.invoiceNos)
    } else {
      yield call(sendingRequest, api.invalidateInvoice, action.merchant, action.invoiceNos)
    }
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.invoiceRecoveryDone());
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* invoiceRecoverySaga() {
  yield all([takeLatest(actionTypes.INVOICE_RECOVERY, invoiceRecovery)]);
}

function* closeToa(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    yield call(sendingRequest, api.closeToa, action.data);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.closeToaDone());
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* closeToaSaga() {
  yield all([takeLatest(actionTypes.TOA_CLOSE, closeToa)]);
}

function* createPgRateCard(action) {
  try {
    const pgRateCard = yield call(sendingRequest, api.createPgRateCard, action.pgRateCard);
    yield put(actionCreators.createPgRateCardDone(pgRateCard));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createPgRateCardSaga() {
  yield all([takeLatest(actionTypes.CREATE_PG_RATE_CARD, createPgRateCard)]);
}

function* listPgRateCards(action) {
  const { page, pageSize } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const pgRateCards = yield call(api.listPgRateCards, page, pageSize);
    const count = yield call(api.countList, "pgRateCard");
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listPgRateCardsDone(pgRateCards, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listPgRateCardsSaga() {
  yield all([takeLatest(actionTypes.LIST_PG_RATE_CARDS, listPgRateCards)]);
}

function* listPgRateCardMIds(action) {
  const { pgRateCardId, page, pageSize, filters } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const pgMIds = yield call(api.listPgRateCardMIds, pgRateCardId, page, pageSize, filters);
    const count = yield call(api.countListRCMIds, "pgRateCard/mIds", pgRateCardId, filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listPgRateCardMIdsDone(pgMIds, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listPgRateCardMIdsSaga() {
  yield all([takeLatest(actionTypes.LIST_PG_RATE_CARD_MIDS, listPgRateCardMIds)]);
}

function* createPgMId(action) {
  try {
    const pgMId = yield call(sendingRequest, api.createPgMId, action.pgMId);
    yield put(actionCreators.createPgMIdDone(pgMId));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createPgMIdSaga() {
  yield all([takeLatest(actionTypes.CREATE_PG_MID, createPgMId)]);
}

function* listPgMIds(action) {
  const { page, pageSize, filters } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const pgMIds = yield call(api.listPgMIds, page, pageSize, filters);
    const count = yield call(api.countList, "pgMId", filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listPgMIdsDone(pgMIds, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listPgMIdsSaga() {
  yield all([takeLatest(actionTypes.LIST_PG_MIDS, listPgMIds)]);
}

function* showPgMId(action) {
  try {
    const pgMId = yield call(sendingRequest, api.showPgMId, action.pgMId);
    yield put(actionCreators.showPgMIdDone(pgMId));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* showPgMIdSaga() {
  yield all([takeLatest(actionTypes.SHOW_PG_MID, showPgMId)]);
}

function* createRateCardTemplateMetadata(data) {
  const rateCardTemplate = yield call(api.createRateCardTemplate, data);
  console.debug(`created ruleset with id ${rateCardTemplate.id}`);
  return rateCardTemplate;
}

function* createRateCardTemplate(action) {
  try {
    yield put(actionCreators.sendingRequest(true));
    const rateCardTemplate = yield call(createRateCardTemplateMetadata, action.rateCardDetails);
    const rateCardTemplateId = rateCardTemplate.id;
    yield call(createRules, rateCardTemplateId, action.rules);
    yield put(actionCreators.sendingRequest(false));

    console.debug('created ruleset, filter and rules');
    yield put(actionCreators.createRateCardTemplateDone(action));
    forwardToListPath('ratecardtemplates');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createRateCardTemplateSaga() {
  yield all([takeLatest(actionTypes.CREATE_RATECARD_TEMPLATE, createRateCardTemplate)]);
}

function* listRateCardTemplate(action) {
  const { page, pageSize, filters, searchItems } = action;

  try {
    yield put(actionCreators.sendingRequest(true));
    const rulesets = yield call(api.listRateCardTemplate, page, pageSize, filters, searchItems);
    const count = yield call(api.countList, "rateCardTemplate", filters, searchItems);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listRateCardTemplateDone(rulesets, count.count));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* listRateCardTemplateSaga() {
  yield all([takeLatest(actionTypes.LIST_RATE_CARD_TEMPLATE, listRateCardTemplate)]);
}

function* showRateCardTemplate(action) {
  const id = action.id;

  try {
    const data = yield call(sendingRequest, api.showRateCardTemplate, id);

    for (var rule of data.rateCardRules) {
      const toPartyType = rule.toPartyType;
      const fromPartyType = rule.fromPartyType;

      if (!(typeof fromPartyType === "undefined" || fromPartyType === "USER" || rule.fromExpression)) {
        const fromParty = yield call(sendingRequest, getNameByIdAPI(fromPartyType), rule.fromParty);
        rule.fromParty = fromParty.name;
        rule.fromPartyShortName = getShortId(fromPartyType, fromParty);
      }

      if (!(typeof toPartyType === "undefined" || toPartyType === "USER" || rule.toExpression)) {
        const toParty = yield call(sendingRequest, getNameByIdAPI(toPartyType), rule.toParty);
        rule.toParty = toParty.name;
        rule.toPartyShortName = getShortId(toPartyType, toParty);
      }

      if (toPartyType === "USER")
        rule.toParty = rule.toParty;

      if (toPartyType === "USER")
        rule.fromParty = rule.fromParty;
    };

    yield put(actionCreators.showRateCardTemplateDone(data));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}



function* showRateCardTemplateSaga() {
  yield all([takeLatest(actionTypes.SHOW_RATE_CARD_TEMPLATE, showRateCardTemplate)]);
}


function* createComposedMerchantRuleset(action) {
  try {
    yield call(sendingRequest, api.createComposedMerchantRuleset, action.ruleset);
    yield put(actionCreators.createComposedMerchantRulesetDone());
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createComposedMerchantRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_COMPOSED_MERCHANT_ATTEMPT, createComposedMerchantRuleset)]);
}

function* createComposedPGRuleset(action) {
  try {
    yield call(sendingRequest, api.createComposedPGRuleset, action.ruleset);
    yield put(actionCreators.createComposedPGRulesetDone());
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createComposedPGRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_COMPOSED_PG_ATTEMPT, createComposedPGRuleset)]);
}

function* createComposedAggregatorRuleset(action) {
  try {
    yield call(sendingRequest, api.createComposedAggregatorRuleset, action.ruleset);
    yield put(actionCreators.createComposedAggregatorRulesetDone());
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createComposedAggregatorRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_COMPOSED_AGGREGATOR_ATTEMPT, createComposedAggregatorRuleset)]);
}

function* getAggregatorServiceType() {
  try {
    const data = yield call(api.getAggregatorServiceType);
    yield put(actionCreators.getAggregatorServiceTypeDone(data));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* getAggregatorServiceTypeSaga() {
  yield all([takeLatest(actionTypes.GET_AGGREGATOR_SERVICE_TYPE, getAggregatorServiceType)]);
}

function* getSacCode() {
  try {
    const data = yield call(api.getSacCode);
    yield put(actionCreators.getSacCodeDone(data));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e))
  }
}

function* getSacCodeSaga() {
  yield all([takeLatest(actionTypes.GET_SAC_CODE, getSacCode)])
}

function* attemptActivateRulesetRatecardTemplateMapping(action) {
  const { mappingId, rulesetId, activate } = action;
  try {
    const response = yield call(api.attemptActivateRulesetRatecardTemplateMapping, rulesetId, mappingId, activate);
    if (response) {
      yield put(actionCreators.showRuleset(response.ruleSetId));
    }
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* attemptRulesetRatecardTemplateMapping(action) {
  const { rulesetId, rateCardTemplateId } = action;
  try {
    const response = yield call(api.attemptRulesetRatecardTemplateMapping, rulesetId, rateCardTemplateId);
    if (response) {
      yield put(actionCreators.showRuleset(rulesetId));
    }
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* rulesetRatecardTemplateMappingSaga() {
  yield all([
    takeLatest(actionTypes.RULESET_RATE_CARD_TEMPLATE_MAPPING_ATTEMPT, attemptRulesetRatecardTemplateMapping),
    takeLatest(actionTypes.ACTIVATE_RULESET_RATE_CARD_TEMPLATE_MAPPING_ATTEMPT, attemptActivateRulesetRatecardTemplateMapping)
  ]);
}

function* createAggregateService(action) {
  try {
    const merchant = yield call(sendingRequest, api.createAggregateService, action.serviceType);
    yield put(actionCreators.aggregatorServiceDone(merchant));
    forwardToListPath('aggregator-service');
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}
function* createAggregateServiceSaga() {
  yield all([
    takeLatest(actionTypes.CREATE_AGGREGATOR_SERVICE_TYPE, createAggregateService),

  ]);
}

function* listAggegrateTypes(action) {
  const { page, pageSize, filters } = action;
  try {
    yield put(actionCreators.sendingRequest(true));
    const aggregatorServices = yield call(api.listAggegrateTypes, page, pageSize, filters);
    yield put(actionCreators.sendingRequest(false));
    yield put(actionCreators.listAggegrateTypesDone(aggregatorServices));
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}


function* listAggregateSaga() {
  yield all([takeLatest(actionTypes.LIST_AGGREGATE_TYPES, listAggegrateTypes)]);
}


function* createComposedCampaignRuleset(action) {
  try {
    yield call(sendingRequest, api.createComposedCampaignRuleset, action.ruleset);
    yield put(actionCreators.createComposedCampaignRulesetDone());
    forwardToRootPath();
  } catch (e) {
    yield put(actionCreators.somethingWentWrong(e.message, e));
  }
}

function* createComposedCampaignRulesetSaga() {
  yield all([takeLatest(actionTypes.CREATE_COMPOSED_CAMPAIGN_ATTEMPT, createComposedCampaignRuleset)]);
}


export default function* rootSaga() {
  yield all([
    loginSaga(),
    logoutSaga(),
    createRulesetSaga(),
    createSettlementSaga(),
    multiFindSaga(),
    searchMerchantSaga(),
    listRulesetsSaga(),
    searchListSaga(),
    showRulesetSaga(),
    createPgSaga(),
    createMerchantSaga(),
    listMerchantsSaga(),
    showMerchantSaga(),
    verifyAddressSaga(),
    listInterchangesSaga(),
    listTaxAccountsSaga(),
    listTaxesSaga(),
    listCessesSaga(),
    createBillpayRulesetSaga(),
    createMerchantRulesetSaga(),
    createInterchangeSaga(),
    createAccountSaga(),
    createInternalFundTransferSaga(),
    listInternalFundTransfersSaga(),
    listAccountsSaga(),
    showAccountSaga(),
    showInternalFundTransferSaga(),
    listSettlementsSaga(),
    showSettlementSaga(),
    showInterchangeSaga(),
    approveSaga(),
    activateSaga(),
    deactivateSaga(),
    listReportTypesSaga(),
    createReportSaga(),
    editAccountSaga(),
    editMerchantSaga(),
    editInterchangeSaga(),
    editRulesetSaga(),
    editSettlementSaga(),
    showTransactionStatusSaga(),
    changeTransactionStatusSaga(),
    eventTypesSaga(),
    merchantSettlementStatusSaga(),
    utrLookupSaga(),
    replayDisbursementSaga(),
    showDisbursementSaga(),
    serviceTypesSaga(),
    listRatecardsSaga(),
    editRatecardSaga(),
    approveRateCardSaga(),
    activateRateCardSaga(),
    deactivateRateCardSaga(),
    pendingSettlementAmountSaga(),
    invoiceRecoverySaga(),
    closeToaSaga(),
    createPgRateCardSaga(),
    listPgRateCardsSaga(),
    listPgRateCardMIdsSaga(),
    createPgMIdSaga(),
    listPgMIdsSaga(),
    showPgMIdSaga(),
    createRateCardTemplateSaga(),
    listRateCardTemplateSaga(),
    showRateCardTemplateSaga(),
    createComposedMerchantRulesetSaga(),
    createComposedPGRulesetSaga(),
    createComposedAggregatorRulesetSaga(),
    getAggregatorServiceTypeSaga(),
    rulesetRatecardTemplateMappingSaga(),


    createTaxRuleSaga(),
    editTaxRuleSaga(),
    listTaxRulesSaga(),
    showTaxRuleSaga(),


    getSacCodeSaga(),

    createAggregateServiceSaga(),
    listAggregateSaga(),

    createComposedCampaignRulesetSaga()
  ]);
}
