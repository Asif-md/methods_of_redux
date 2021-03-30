import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import { Router, Switch, Route, Redirect } from "react-router-dom";
import store from "./store";
import history from "./history";
import Header from "components/header";
import RouteComponent from "./routeComponents";
import * as routes from "routes";
import "css/main.scss";

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      store.getState().user.loggedIn &&
        store.getState().user.expiryDate &&
        store.getState().user.expiryDate > Date.now() ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: routes.LOGIN_PATH }} />
        )
    }
  />
);

const router = (
  <Provider store={store}>
    <Router history={history} location={location}>
      <div>
        <Header />
        <div className="container">
          <Switch history={history} location={location}>
            <Route path={routes.LOGIN_PATH} component={RouteComponent.Login} />
            <Route
              path={routes.LOGOUT_PATH}
              component={RouteComponent.Logout}
            />

            <PrivateRoute
              path={routes.ROOT_PATH}
              exact
              component={RouteComponent.LandingPage}
            />
            <PrivateRoute
              path={routes.LIST_MERCHANTS_PATH}
              exact
              component={RouteComponent.ListMerchants}
            />
            <PrivateRoute
              path={routes.CREATE_MERCHANT_PATH}
              exact
              component={RouteComponent.CreateMerchant}
            />
            <PrivateRoute
              path={routes.SHOW_MERCHANT_PATH}
              exact
              component={RouteComponent.ShowMerchant}
            />
            <PrivateRoute
              path={routes.EDIT_MERCHANT_PATH}
              exact
              component={RouteComponent.EditMerchant}
            />

            <PrivateRoute
              path={routes.LIST_RULESETS_PATH}
              exact
              component={RouteComponent.ListRulesets}
            />
            <PrivateRoute
              path={routes.CREATE_RULESET_PATH}
              exact
              component={RouteComponent.CreateRuleset}
            />
            <PrivateRoute
              path={routes.SHOW_RULESET_PATH}
              exact
              component={RouteComponent.ShowRuleset}
            />
            <PrivateRoute
              path={routes.EDIT_RULESET_PATH}
              exact
              component={RouteComponent.EditRuleset}
            />

            <PrivateRoute
              path={routes.LIST_ACCOUNTS_PATH}
              exact
              component={RouteComponent.ListAccounts}
            />
            <PrivateRoute
              path={routes.CREATE_ACCOUNT_PATH}
              exact
              component={RouteComponent.CreateAccount}
            />
            <PrivateRoute
              path={routes.SHOW_ACCOUNT_PATH}
              exact
              component={RouteComponent.ShowAccount}
            />
            <PrivateRoute
              path={routes.EDIT_ACCOUNT_PATH}
              exact
              component={RouteComponent.EditAccount}
            />

            <PrivateRoute
              path={routes.LIST_INTERCHANGES_PATH}
              exact
              component={RouteComponent.ListInterchanges}
            />
            <PrivateRoute
              path={routes.CREATE_INTERCHANGE_PATH}
              exact
              component={RouteComponent.CreateInterchange}
            />
            <PrivateRoute
              path={routes.SHOW_INTERCHANGE_PATH}
              exact
              component={RouteComponent.ShowInterchange}
            />
            <PrivateRoute
              path={routes.EDIT_INTERCHANGE_PATH}
              exact
              component={RouteComponent.EditInterchange}
            />

            <PrivateRoute
              path={routes.LIST_SETTLEMENTS_PATH}
              exact
              component={RouteComponent.ListSettlements}
            />
            <PrivateRoute
              path={routes.CREATE_SETTLEMENT_PATH}
              exact
              component={RouteComponent.CreateSettlement}
            />
            <PrivateRoute
              path={routes.SHOW_SETTLEMENT_PATH}
              exact
              component={RouteComponent.ShowSettlement}
            />
            <PrivateRoute
              path={routes.EDIT_SETTLEMENT_PATH}
              exact
              component={RouteComponent.EditSettlement}
            />

            <PrivateRoute
              path={routes.CREATE_RATE_CARD_TEMPLATE_PATH}
              exact
              component={RouteComponent.CreateRateCardTemplate}
            />
            <PrivateRoute
              path={routes.LIST_RATE_CARD_TEMPLATE_PATH}
              exact
              component={RouteComponent.ListRateCardTemplate}
            />
            <PrivateRoute
              path={routes.SHOW_RATE_CARD_TEMPLATE_PATH}
              exact
              component={RouteComponent.ShowRateCardTemplate}
            />

            <PrivateRoute
              path={routes.CREATE_COMPOSED_RULESET_PATH}
              exact
              component={RouteComponent.CreateComposedRuleset}
            />
            <PrivateRoute
              path={routes.CREATE_COMPOSED_PG_RULESET_PATH}
              exact
              component={RouteComponent.CreateComposedPGRuleset}
            />
            <PrivateRoute
              path={routes.CREATE_COMPOSED_AGGREGATOR_RULESET_PATH}
              exact
              component={RouteComponent.CreateComposedAggregatorRuleset}
            />

            <PrivateRoute
              path={routes.ADD_TRANSACTION_PATH}
              exact
              component={RouteComponent.AddTransactionType}
            />

            <PrivateRoute
              path={routes.TRANSACTION_TYPE_DETAILS}
              exact
              component={RouteComponent.BankStatementDetails}
            />

            <PrivateRoute
              path={routes.CREATE_TAX_RULE_PATH}
              exact
              component={RouteComponent.CreateTaxRule}
            />

            <PrivateRoute
              path={routes.LIST_TAX_RULES_PATH}
              exact
              component={RouteComponent.ListTaxRules}
            />

            <PrivateRoute
              path={routes.SHOW_TAX_RULE_PATH}
              exact
              component={RouteComponent.ShowTaxRule}
            />

            <PrivateRoute
              path={routes.EDIT_TAX_RULE_PATH}
              exact
              component={RouteComponent.EditTaxRule}
            />

            <PrivateRoute
              path={routes.CREATE_AGGREGATOR_SERVICE_TYPE}
              exact
              component={RouteComponent.CreateAggregatorType}
            />

            <PrivateRoute
              path={routes.LIST_AGGREGATOR_SERVICE_TYPE}
              exact
              component={RouteComponent.ListAggregatorType}
            />

            <Route component={RouteComponent.NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  </Provider>
);

render(router, document.getElementById("app"));
