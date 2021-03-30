import React from "react";
import Card from "components/card";
import * as routes from "routes";

const LandingPage = () => {
  return (
    <div>
      <div className="row row-grid">
        <Card to={routes.LIST_RULESETS_PATH}>List Rulesets</Card>
        <Card to={routes.LIST_RATE_CARD_TEMPLATE_PATH}>List Rate Card Templates</Card>
        <Card to={routes.LIST_SETTLEMENTS_PATH}>List Settlement Rules</Card>
        <Card to={routes.LIST_MERCHANTS_PATH}>List Merchants</Card>
        <Card to={routes.LIST_ACCOUNTS_PATH}>List Accounts</Card>
        <Card to={routes.LIST_INTERCHANGES_PATH}>List Interchanges</Card>
        <Card to={routes.CREATE_RULESET_PATH}>Create Ruleset</Card>
        <Card to={routes.CREATE_RATE_CARD_TEMPLATE_PATH}>Create Rate Card Template</Card>
        <Card to={routes.CREATE_SETTLEMENT_PATH}>Create Settlement Rule</Card>
        <Card to={routes.CREATE_MERCHANT_PATH}>Create Merchant</Card>
        <Card to={routes.CREATE_ACCOUNT_PATH}>Create Account</Card>
        <Card to={routes.CREATE_INTERCHANGE_PATH}>Create Interchange</Card>
        <Card to={routes.CREATE_COMPOSED_RULESET_PATH}>Create Composed  Ruleset</Card>
        <Card to={routes.CREATE_COMPOSED_PG_RULESET_PATH}>Create Composed PG Ruleset</Card>
        <Card to={routes.CREATE_COMPOSED_AGGREGATOR_RULESET_PATH}>Create Composed Aggregator Ruleset</Card>
        <Card to={routes.ADD_TRANSACTION_PATH}>Create Transaction Type</Card>
        <Card to={routes.CREATE_TAX_RULE_PATH}>Create Tax Rule</Card>
        <Card to={routes.LIST_TAX_RULES_PATH}>List Tax Rules</Card>
        <Card to={routes.CREATE_AGGREGATOR_SERVICE_TYPE}>Create Aggregator Service Type</Card>
        <Card to={routes.LIST_AGGREGATOR_SERVICE_TYPE}>List Aggregator Service Type</Card>
      </div>
    </div>
  )
}

export default LandingPage;
