import React, { Component } from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import { Link } from "react-router-dom";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import { LIST_RULESETS_PATH, EDIT_RULE_RATE } from "routes";
import { isoToDateString } from "utils/helpers";
import getRuleComponentForShow from "components/show_rules/index";
import RouteComponents from "../routeComponents";
import RateTemplateModal from "components/rate_card_template_modal";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";

class ShowRuleset extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      rulesetId: "",
      open: false,
      openRateCardTemplate: false,
      openRulePanel: true
    };
  }

  onSelection = id => {
    this.setState({ openModal: false }, () => {
      if (id && confirm("Confirm to map selected ratecard template id!")) {
        this.props.attemptRulesetRatecardTemplateMapping(
          this.state.rulesetId,
          id
        );
      }
    });

    document.location.reload(true);
  };

  onHandleToggle = () => {
    this.setState({ open: !this.state.open });
  };

  onHandleToggleRateCardTemplate = () => {
    this.setState({ openRateCardTemplate: !this.state.openRateCardTemplate });
  };

  onHandleToggleRule = () => {
    this.setState({ openRulePanel: !this.state.openRulePanel });
  };

  pageRefresh = () => {
    let refresh = localStorage.getItem("refresh");

    if (refresh === null) {
      window.location.reload();
      localStorage.setItem("refresh", "1");
    }
  };

  componentDidMount() {
    const { params } = this.props.match;
    params && params.rulesetId && this.props.showRuleset(params.rulesetId);
    this.setState({ rulesetId: params.rulesetId });
    RouteComponents.ShowRateCardTemplate.preload();

    this.pageRefresh();
  }

  componentWillUnmount() {
    localStorage.removeItem("refresh");
  }

  onApprove = (ruleset, event) => {
    event.preventDefault();
    const { attemptApprove } = this.props;
    attemptApprove("ruleset", ruleset);
  };

  onActivateRuleset = (ruleset, event) => {
    event.preventDefault();
    const { attemptActivate } = this.props;
    attemptActivate("ruleset", ruleset);
  };

  onDeactivateRuleset = (ruleset, event) => {
    event.preventDefault();
    const { attemptDeactivate } = this.props;
    attemptDeactivate("ruleset", ruleset);
  };

  onActivateRuleSetRateCardTemplateMapping = (rateCardTemplate, event) => {
    event.preventDefault();
    const { attemptActivateRulesetRatecardTemplateMapping } = this.props;
    attemptActivateRulesetRatecardTemplateMapping(
      rateCardTemplate.ruleSetId,
      rateCardTemplate.id,
      true
    );
  };

  onDeactivateRuleSetRateCardTemplateMapping = (rateCardTemplate, event) => {
    event.preventDefault();
    const { attemptActivateRulesetRatecardTemplateMapping } = this.props;
    attemptActivateRulesetRatecardTemplateMapping(
      rateCardTemplate.ruleSetId,
      rateCardTemplate.id,
      false
    );
  };

  renderRulesetHeader = ruleset => {
    const onApprove = this.onApprove.bind(null, ruleset);
    const onActivate = this.onActivateRuleset.bind(null, ruleset);
    const onDeactivate = this.onDeactivateRuleset.bind(null, ruleset);

    return (
      <div className="clearfix">
        <div className="btn-toolbar pull-right">
          <BackLink to={LIST_RULESETS_PATH} />

          <a className="btn btn-sm btn-success" href="#" onClick={onApprove}>
            Approve
          </a>
          <a className="btn btn-sm btn-primary" href="#" onClick={onActivate}>
            Activate
          </a>
          <a className="btn btn-sm btn-danger" href="#" onClick={onDeactivate}>
            De-activate
          </a>
        </div>
        <Typography variant="title" gutterBottom>
          Ruleset Details: <br />
          <small>{ruleset.name}</small>
        </Typography>
      </div>
    );
  };

  renderRulesetPanel = ruleset => {
    return (
      <div className=" " style={{ backgroundColor: "#eeeeee" }}>
        <div style={{ flexGrow: 1 }}>
          <AppBar position="static" color="primary">
            <Toolbar>
              <Typography
                style={{ flexGrow: 1 }}
                variant="body1"
                color="inherit"
              >
                {ruleset.name}
              </Typography>
              <Boolean
                flag={ruleset.approved}
                trueText="Approved"
                falseText="Un-Approved"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              />

              <Boolean
                flag={ruleset.active}
                trueText="Activated"
                falseText="De-activated"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              />
            </Toolbar>
          </AppBar>
        </div>
        {/* <AppBar
          position="static"
          color="primary"
          style={{ height: "50px", textAnchor: "inherit" }}
        >
          <Typography
            style={{ marginTop: "10px" }}
            variant="title"
            color="inherit"
          >
            <small
              style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}
            >
              {ruleset.name}
            </small>
          </Typography>
        </AppBar> */}

        <div className="panel-body">
          <fieldset>
            <div className="collapse in">
              {/* <div className="form-group pull-right">
                <Boolean
                  flag={ruleset.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />

                <Boolean
                  flag={ruleset.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              </div> */}
              <div className="form-group">
                <label className="control-label text-muted">Event Name:</label>
                <Typography variant="subheading" gutterBottom>
                  {ruleset.forEvent
                    ? ruleset.forEvent.split(",").join(", ")
                    : "er1"}
                </Typography>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      Filter Expression:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {ruleset.filterExpression || "--"}
                    </Typography>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      PG Id Filter:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {ruleset.pgIdFilter || "--"}
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      Merchant Filter:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {ruleset.merchantFilter || "--"}
                    </Typography>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      Provider Name Filter:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {ruleset.providerNameFilter || "--"}
                    </Typography>
                  </div>
                </div>
              </div>
              {/* <div className="form-group">
                <label className="control-label text-muted">Priority:</label>
                <span className="details">{ruleset.priority}</span>
              </div> */}
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      Effective From:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {isoToDateString(ruleset.effectiveFrom)}
                    </Typography>
                  </div>
                  <div className="col-sm-6 col-md-6">
                    <label className="control-label text-muted">
                      Effective To:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {isoToDateString(ruleset.effectiveTo)}
                    </Typography>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  };

  renderRulePanel = (rule, index) => {
    const ShowRule = getRuleComponentForShow(rule.type);
    return (
      <div key={`rule-${rule.id}`}>
        <div className=" " style={{ backgroundColor: "#eeeeee" }}>
          <AppBar
            position="static"
            color="primary"
            style={{ height: "50px", textAnchor: "inherit" }}
          >
            <Typography
              style={{ marginTop: "10px" }}
              variant="title"
              color="inherit"
            >
              <small
                style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}
              >
                Rule - {rule.name}
              </small>
              <Button
                style={{ float: "right", marginTop: -5, marginRight: 20 }}
                size="small"
                onClick={this.onHandleToggleRule}
              >
                <Icon style={{ color: "white" }}>keyboard_arrow_down</Icon>
              </Button>
            </Typography>
          </AppBar>
          {this.state.openRulePanel && (
            <div className="panel-body" key={rule.id}>
              <fieldset>
                <ShowRule rule={rule} />
              </fieldset>
            </div>
          )}
        </div>
        <br />
      </div>
    );
  };

  renderRateCardTemplatePanels = ruleset => {
    return (
      <div>
        {ruleset.rateCardTemplates
          ? ruleset.rateCardTemplates.map(this.renderRateCardTemplatePanel)
          : ""}
      </div>
    );
  };

  renderRateCardTemplatePanel = ruleSetRateCardTemplateData => {
    const onActivate = this.onActivateRuleSetRateCardTemplateMapping.bind(
      null,
      ruleSetRateCardTemplateData
    );
    const onDeactivate = this.onDeactivateRuleSetRateCardTemplateMapping.bind(
      null,
      ruleSetRateCardTemplateData
    );

    return (
      <div key={`rateCard-${ruleSetRateCardTemplateData.id}`}>
        <div className="" style={{ backgroundColor: "#eeeeee" }}>
          <div style={{ flexGrow: 1 }}>
            <AppBar position="static" color="primary">
              <Toolbar>
                <Typography
                  style={{ flexGrow: 1 }}
                  variant="h6"
                  color="inherit"
                >
                  Rate Card Template Details
                </Typography>
                <Button
                  variant="contained"
                  onClick={onActivate}
                  size="small"
                  style={{ margin: "theme.spacing.unit" }}
                >
                  Activate
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={onDeactivate}
                  size="small"
                  style={{ margin: "theme.spacing.unit", marginLeft: "5px" }}
                >
                  De-activate
                </Button>

                {/* <Button
                  size="small"
                  onClick={this.onHandleToggleRateCardTemplate}
                >
                  <Icon style={{ color: "white" }}>keyboard_arrow_down</Icon>
                </Button> */}
              </Toolbar>
            </AppBar>
          </div>

          <div className="panel-body">
            <fieldset>
              {/* <legend
                data-toggle="collapse"
                data-target="#collapseExample3"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                <div className="btn-toolbar pull-right">
                  <a
                    className="btn btn-sm btn-primary"
                    href="#"
                    onClick={onActivate}
                  >
                    Activate
                  </a>
                  <a
                    className="btn btn-sm btn-danger"
                    href="#"
                    onClick={onDeactivate}
                  >
                    De-activate
                  </a>
                </div>
              </legend> */}
              <div className="form-group">
                <Boolean
                  flag={ruleSetRateCardTemplateData.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              </div>

              <RouteComponents.ShowRateCardTemplate
                fromRuleSet={true}
                rateCardTemplateData={
                  ruleSetRateCardTemplateData.rateCardTemplate
                }
              />
            </fieldset>
          </div>
        </div>
        <br />
      </div>
    );
  };

  renderRulePanels = ruleset => {
    return (
      <div>
        {ruleset ? ruleset.accountEntryRules.map(this.renderRulePanel) : ""}
        {/* {ruleset ? ruleset.preCalculatedRateCardRules.map(this.renderRulePanel) : ""} */}
      </div>
    );
  };

  renderRuleset = () => {
    const ruleset = this.props.ruleset;

    return (
      <div>
        {this.renderRulesetHeader(ruleset)}
        <br />
        {this.renderRulesetPanel(ruleset)}
        <br />
        {this.renderRulePanels(ruleset)}
        <br />
        {this.renderRateCardTemplatePanels(ruleset)}
        <br />
        <div className="row">
          <div className="col-md-3">
            <div className="form-group">
              <button
                type="button"
                className="btn btn-info"
                onClick={() => {
                  this.setState({
                    openModal: !this.state.openModal,
                    rateCardTemplateId: ""
                  });
                }}
              >
                Map a new Rate Card Template ID to this ruleset
              </button>
            </div>
          </div>
        </div>
        {this.state.openModal && (
          <RateTemplateModal
            rateCardTemplateId={this.state.rateCardTemplateId}
            onSelection={this.onSelection}
          />
        )}
      </div>
    );
  };

  renderData = () => {
    if (Object.keys(this.props.ruleset).length) {
      return this.renderRuleset();
    } else {
      return <PleaseWait />;
    }
  };

  render() {
    return <div className="page-container">{this.renderData()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRuleset);
