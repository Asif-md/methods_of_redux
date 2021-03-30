import React from "react";
import Loadable from "react-loadable";
import CircularProgress from "@material-ui/core/CircularProgress";

const Loading = props => {
  if (props.error) {
    return <div>Error!</div>;
  } else {
    return (
      <div className="" style={{ margin: "auto" }}>
        <CircularProgress disableShrink />
      </div>
    );
  }
};

const LandingPage = Loadable({
  loader: () => import("components/landing_page"),
  loading() {
    return <Loading />;
  }
});

const AddTransactionType = Loadable({
  loader: () => import("components/add_transaction_type"),
  loading() {
    return <Loading />
  }
})

const BankStatementDetails = Loadable({
  loader: () => import("components/bankstatement_details"),
  loading() {
    return <Loading />
  }
})

const NotFound = Loadable({
  loader: () => import("components/not_found"),
  loading() {
    return <Loading />;
  }
});

const Login = Loadable({
  loader: () => import("components/login"),
  loading() {
    return <Loading />;
  }
});

const Logout = Loadable({
  loader: () => import("components/logout"),
  loading() {
    return <Loading />;
  }
});

const ListRulesets = Loadable({
  loader: () => import("components/list_rulesets"),
  loading() {
    return <Loading />;
  }
});

const CreateRuleset = Loadable({
  loader: () => import("components/create_ruleset"),
  loading() {
    return <Loading />;
  }
});

const ShowRuleset = Loadable({
  loader: () => import("components/show_ruleset"),
  loading() {
    return <Loading />;
  }
});

const EditRuleset = Loadable({
  loader: () => import("components/edit_ruleset"),
  loading() {
    return <Loading />;
  }
});

const CreateRateCardTemplate = Loadable({
  loader: () => import("components/create_rate_card_template"),
  loading() {
    return <Loading />;
  }
});

const ListRateCardTemplate = Loadable({
  loader: () => import("components/list_rate_card_template"),
  loading() {
    return <Loading />;
  }
});

const ShowRateCardTemplate = Loadable({
  loader: () => import("components/show_rate_card_template"),
  loading() {
    return <Loading />;
  }
});

const CreateComposedRuleset = Loadable({
  loader: () => import("components/create_composed_ruleset"),
  loading() {
    return <Loading />;
  }
});

const CreateComposedPGRuleset = Loadable({
  loader: () => import("components/create_composed_pg_ruleset"),
  loading() {
    return <Loading />;
  }
});

const CreateComposedAggregatorRuleset = Loadable({
  loader: () => import("components/create_composed_aggregator_ruleset"),
  loading() {
    return <Loading />;
  }
});

const ListMerchants = Loadable({
  loader: () => import("components/list_merchants"),
  loading() {
    return <Loading />;
  }
});

const CreateMerchant = Loadable({
  loader: () => import("components/create_merchant"),
  loading() {
    return <Loading />;
  }
});

const ShowMerchant = Loadable({
  loader: () => import("components/show_merchant"),
  loading() {
    return <Loading />;
  }
});

const EditMerchant = Loadable({
  loader: () => import("components/edit_merchant"),
  loading() {
    return <Loading />;
  }
});

const ListAccounts = Loadable({
  loader: () => import("components/list_accounts"),
  loading() {
    return <Loading />;
  }
});

const CreateAccount = Loadable({
  loader: () => import("components/create_account"),
  loading() {
    return <Loading />;
  }
});

const ShowAccount = Loadable({
  loader: () => import("components/show_account"),
  loading() {
    return <Loading />;
  }
});

const EditAccount = Loadable({
  loader: () => import("components/edit_account"),
  loading() {
    return <Loading />;
  }
});

const ListInterchanges = Loadable({
  loader: () => import("components/list_interchanges"),
  loading() {
    return <Loading />;
  }
});

const CreateInterchange = Loadable({
  loader: () => import("components/create_interchange"),
  loading() {
    return <Loading />;
  }
});

const ShowInterchange = Loadable({
  loader: () => import("components/show_interchange"),
  loading() {
    return <Loading />;
  }
});

const EditInterchange = Loadable({
  loader: () => import("components/edit_interchange"),
  loading() {
    return <Loading />;
  }
});

const CreateTaxRule = Loadable({
  loader: () => import("components/create_tax_rule"),
  loading() {
    return <Loading />;
  }
})

const ListTaxRules = Loadable({
  loader: () => import("components/list_tax_rules"),
  loading() {
    return <Loading />
  }
})

const CreateAggregatorType = Loadable({
  loader: () => import("components/create_aggregator_service_type"),
  loading() {
    return <Loading />;
  }
})

const ListAggregatorType = Loadable({
  loader: () => import("components/list_aggregator_service_type"),
  loading() {
    return <Loading />
  }
})

const ShowTaxRule = Loadable({
  loader: () => import("components/show_tax_rule"),
  loading() {
    return <Loading />
  }
})

const EditTaxRule = Loadable({
  loader: () => import("components/edit_tax_rule"),
  loading() {
    return <Loading />
  }
})

const ListSettlements = Loadable({
  loader: () => import("components/list_settlements"),
  loading() {
    return <Loading />;
  }
});

const CreateSettlement = Loadable({
  loader: () => import("components/create_settlement"),
  loading() {
    return <Loading />;
  }
});

const ShowSettlement = Loadable({
  loader: () => import("components/show_settlement"),
  loading() {
    return <Loading />;
  }
});

const EditSettlement = Loadable({
  loader: () => import("components/edit_settlement"),
  loading() {
    return <Loading />;
  }
});


export default {
  Login,
  Logout,
  NotFound,
  LandingPage,

  ShowRuleset,
  EditRuleset,
  ListRulesets,
  CreateRuleset,

  ShowAccount,
  EditAccount,
  ListAccounts,
  CreateAccount,

  EditMerchant,
  ShowMerchant,
  ListMerchants,
  CreateMerchant,

  EditSettlement,
  ShowSettlement,
  ListSettlements,
  CreateSettlement,

  EditInterchange,
  ShowInterchange,
  ListInterchanges,
  CreateInterchange,

  ListRateCardTemplate,
  ShowRateCardTemplate,
  CreateRateCardTemplate,

  CreateComposedPGRuleset,
 
  CreateComposedRuleset,
  CreateComposedAggregatorRuleset,

  AddTransactionType,
  BankStatementDetails,

  CreateTaxRule,
  ListTaxRules,
  ShowTaxRule,
  EditTaxRule,

  CreateAggregatorType,
  ListAggregatorType

};
