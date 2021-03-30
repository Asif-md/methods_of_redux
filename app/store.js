import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";

// import {syncHistoryWithStore} from "react-router-redux";
// import {browserHistory} from "react-router";
import rootReducer from "reducers/index";
import rootSaga from "./sagas";
import { capitalizeFirst } from "utils/helpers";

// session storage will be deleted when browser tab is closed
// example usage for session storage is:
// window.sessionStorage.setItem("user", JSON.stringify({ login: "user", password: "phonepe" }))
// JSON.parse(window.sessionStorage.getItem("user"))
// window.sessionStorage.removeItem("user")
const userInfo = window.localStorage.getItem("user");
let userInSession = null;
try {
  userInSession = userInfo ? JSON.parse(atob(userInfo)) : null;
} catch (e) { }

const defaultState = {
  user: { loggedIn: false },
  message: {},
  newRuleset: {
    rules: [
      {
        timestamp: Date.now()
      }
    ],
    filter: {
      name: "",
      filters: [
        {
          timestamp: Date.now()
        }
      ]
    }
  },
  rulesets: { data: [], count: 0, events: [], serviceTypes: [] },
  ruleset: {},
  merchants: { data: [], count: 0 },
  merchant: {},
  interchanges: { data: [], count: 0 },
  interchange: {},
  taxRules: { data: [], count: 0 },
  taxRule: {},
  accounts: { data: [], count: 0 },
  account: {},
  internalFundTransfers: { data: [], count: 0 },
  internalFundTransfer: {},
  settlements: { data: [], count: 0 },
  settlementRule: {},
  invoice: {},
  disbursement: {},
  onDemand: {},
  showScheduleType: [],
  taxAccounts: [],
  taxes: [],
  cesses: [],
  transaction: {},
  error: "",
  merchantSettlements: { settlementType: "", data: [], count: 0 },
  utrLookupResult: {},
  ratecards: {},
  pendingSettlementAmountResult: {},
  pgRateCards: { data: [], count: 0 },
  pgMIds: { data: [], count: 0 },
  pgMId: {},
  rateCardTemplates: { data: [], count: 0, events: [], serviceTypes: [] },
  aggregatorServices: { data: [] },
  
};
if (userInSession) {
  const userName = userInSession.login;
  const expiryDate = userInSession.expiryDate
    ? Number(userInSession.expiryDate)
    : 0;
  if (Date.now() > expiryDate) {
    defaultState.user = {
      loggedIn: false,
      name: "",
      expiryDate: 0
    };
  } else {
    defaultState.user = {
      loggedIn: true,
      name: userName,
      expiryDate
    };
    defaultState.message.loginSuccess = `Hi ${capitalizeFirst(userName)}`;
  }
}

const sagaMiddleware = createSagaMiddleware();

// New updated Version of Redux
const enhancers = composeWithDevTools(applyMiddleware(sagaMiddleware));

// old way of creating the Redux
// const enhancers = compose(
//   applyMiddleware(sagaMiddleware),
//   window.devToolsExtension ? window.devToolsExtension() : f => f
// );

const store = createStore(rootReducer, defaultState, enhancers);
sagaMiddleware.run(rootSaga);

// export const history = syncHistoryWithStore(browserHistory, store);

export default store;
