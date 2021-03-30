import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import { LIST_RATE_CARD_TEMPLATE_PATH } from "routes";
import { isoToDateString } from "utils/helpers";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
// import Toolbar from "@material-ui/core/Toolbar";
import Icon from "@material-ui/core/Icon";

class ShowRateCardTemplate extends React.Component {
  constructor() {
    super();
    this.state = {
      openRateCardRule: true
    };
  }

  onHandleRateCardRule = () => {
    this.setState({ openRateCardRule: !this.state.openRateCardRule });
  };

  componentDidMount() {
    //To check whether it is loaded in show ruleset page
    const { fromRuleSet } = this.props;
    if (!fromRuleSet) {
      const { params } = this.props.match;
      params && params.id && this.props.showRateCardTemplate(params.id);
    }
  }

  renderRateCardTemplateHeader = () => {
    return (
      <div className="clearfix">
        {!this.props.fromModal && (
          <div className="btn-toolbar pull-right">
            <BackLink to={LIST_RATE_CARD_TEMPLATE_PATH} />
          </div>
        )}
        <h1 className="page-header">Rate Card Template Details:</h1>
      </div>
    );
  };

  renderRateCardTemplatePanel = rateCardTemplate => {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-sm-6 col-md-4">
            <label className="control-label text-muted">Short ID:</label>
            <span className="details">{rateCardTemplate.shortId || "--"}</span>
          </div>
          <div className="col-sm-6 col-md-3">
            <label className="control-label text-muted">PG ID:</label>
            <span className="details">{rateCardTemplate.pgId || "--"}</span>
          </div>
          <div className="col-sm-6 col-md-3">
            <label className="control-label text-muted">Merchant:</label>
            <span className="details">{rateCardTemplate.merchant || "--"}</span>
          </div>
          <div className="col-sm-6 col-md-2">
            <label className="control-label text-muted">Provider Name:</label>
            <span className="details">
              {rateCardTemplate.providerName || "--"}
            </span>
          </div>
        </div>
      </div>
    );
  };

  renderRateCardTemplateRulePanel = (rateCardRule = {}) => {

    return (
      <div
        key={"renderRateCardTemplateRulePanel-" + rateCardRule.id}
        className=""
        style={{ backgroundColor: "#eeeeee" }}
      >
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
              style={{
                color: "#fff",
                marginLeft: "30px",
                marginTop: "30px"
              }}
            >
              {rateCardRule.name || "Rate Card Rule"}
            </small>
            <Button
              style={{ float: "right", marginTop: -5, marginRight: 20 }}
              size="small"
              onClick={this.onHandleRateCardRule}
            >
              <Icon style={{ color: "white" }}>keyboard_arrow_down</Icon>
            </Button>
          </Typography>
        </AppBar>

        {this.state.openRateCardRule && (
          <div className="panel-body" style={{ boxShadow: "1px 1px 1px 0px" }}>
            <fieldset>
              <div className="collapse in" id="collapseExample1">
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-6">
                      <label className="control-label text-muted">Type:</label>
                      <span className="details">
                        {rateCardRule.type || "--"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">Name:</label>
                      <span className="details">
                        {rateCardRule.name || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Entry For:
                      </label>
                      <span className="details">
                        {rateCardRule.entryFor || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Transaction Type:
                      </label>
                      <span className="details">
                        {rateCardRule.transactionType || "--"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        From Party:
                      </label>
                      <span className="details">
                        {rateCardRule.fromParty || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        From Party Type:
                      </label>
                      <span className="details">
                        {rateCardRule.fromPartyType || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        From Expression :
                      </label>

                      <span className="details">
                        <Boolean flag={rateCardRule.fromExpression} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        To Party:
                      </label>
                      <span className="details">
                        {rateCardRule.toParty || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        To Party Type:
                      </label>
                      <span className="details">
                        {rateCardRule.toPartyType || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        To Expression :
                      </label>

                      <span className="details">
                        <Boolean flag={rateCardRule.toExpression} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Entry Type:
                      </label>
                      <span className="details">
                        {rateCardRule.entryType || "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        System Reversible:
                      </label>
                      <span className="details">
                        <Boolean
                          flag={rateCardRule.systemReversible || false}
                        />
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Filter Expression :
                      </label>
                      <span className="details">
                        {rateCardRule.filterExpression || "--"}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Per Transaction:
                      </label>
                      <span className="details">
                        <Boolean flag={rateCardRule.perTransaction || false} />
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Commission:
                      </label>
                      <span className="details">
                        <Boolean flag={rateCardRule.commission || false} />
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Taxable:
                      </label>
                      <span className="details">
                        <Boolean flag={rateCardRule.taxable || false} />
                      </span>
                    </div>
                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Time Based Waiver:
                      </label>
                      <span className="details">
                        <Boolean flag={rateCardRule.timeBasedWaiver || false} />
                      </span>
                    </div>

                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Waiver Start Date:
                      </label>
                      <span className="details">
                        {rateCardRule.waiverStartDate ? isoToDateString(rateCardRule.waiverStartDate) : "--"}
                      </span>
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Waiver End Date:
                      </label>
                      <span className="details">
                        {rateCardRule.waiverEndDate ? isoToDateString(rateCardRule.waiverEndDate) : "--"}
                      </span>
                    </div>



                  </div>
                </div>
                <p className="lead clearfix" />
                <div className="form-group">
                  <div className="row">
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Count Based Waiver:
                      </label>
                      <span className="details">
                        <Boolean
                          flag={rateCardRule.countBasedWaiver || false}
                        />
                      </span>

                      <span className="details" />
                    </div>
                    <div className="col-sm-6 col-md-4">
                      <label className="control-label text-muted">
                        Waiver Limit Count:
                      </label>
                      <span className="details">
                        {rateCardRule.waiverLimitCount || "0"}
                      </span>
                    </div>
                    {rateCardRule.hasOwnProperty("taxExemptionThreshold") && (
                      <div className="col-sm-6 col-md-4">
                        <label className="control-label text-muted">
                          Tax Exemption Threshold:
                        </label>
                        <span className="details">
                          {rateCardRule.taxExemptionThreshold || "0"}
                        </span>
                      </div>
                    )}
                  </div>
                  <p className="lead clearfix" />

                  <p className="lead clearfix" />
                  {(rateCardRule.hasOwnProperty("calculationFrequency") ||
                    rateCardRule.hasOwnProperty("calculationWindowUnit") ||
                    rateCardRule.hasOwnProperty("postFact")) && (
                      <div className="form-group">
                        <div className="row">
                          <div className="col-sm-6 col-md-4">
                            <label className="control-label text-muted">
                              Calculation Frequency:
                          </label>
                            <span className="details">
                              {rateCardRule.calculationFrequency || "0"}
                            </span>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <label className="control-label text-muted">
                              Calculation Window Unit:
                          </label>
                            <span className="details">
                              {rateCardRule.calculationWindowUnit || "--"}
                            </span>
                          </div>
                          <div className="col-sm-6 col-md-4">
                            <label className="control-label text-muted">
                              Post Fact:
                          </label>
                            <span className="details">
                              <Boolean flag={rateCardRule.postFact || false} />
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  <p className="lead clearfix" />
                  {rateCardRule.hasOwnProperty("basicFee") &&
                    this.renderBasicRuleSlabbedFees(rateCardRule.basicFee)}
                  {rateCardRule.hasOwnProperty("countBasedFees") &&
                    rateCardRule.countBasedFees.length > 0 &&
                    rateCardRule.countBasedFees.map((item, index) =>
                      this.renderCountBasedRuleSlabbedFees(item, index)
                    )}
                </div>
              </div>
            </fieldset>
          </div>
        )
        }
      </div>
    );
  };

  renderBasicRuleSlabbedFees = (basicFee = {}) => {
    return (
      <div>
        <div className="form-group">
          <div className="row">
            <Typography variant="title" gutterBottom>
              Basic Fees:
            </Typography>

            <div className="col-sm-6 col-md-3">
              <label className="control-label text-muted">Slabbed Fee:</label>
              <br />

              <span
                className="view-details"
                style={{ marginTop: "-10px", fontSize: "21px" }}
              >
                <Boolean flag={basicFee.slabbedFee || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-3">
              <label className="control-label text-muted">Rate:</label>
              <span className="details">
                <Boolean flag={basicFee.rate || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-3">
              <label className="control-label text-muted">Value:</label>
              <span className="details">{basicFee.value || "0"}</span>
            </div>
          </div>
        </div>
        {basicFee.slabbedFees.length > 0 && <h4>Slabbed Fees:</h4>}
        {basicFee.slabbedFees.length > 0 &&
          basicFee.slabbedFees.map((item, index) =>
            this.renderSlabbedFee(item, index)
          )}
      </div>
    );
  };

  renderCountBasedRuleSlabbedFees = (countBasedFee = {}, index) => {
    return (
      <div key={`countslabbedfee-${index}`}>
        <div className="form-group">
          <div className="row">
            <h3 className="control-label text-muted">Count Based Fees:</h3>

            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">Slabbed Fee:</label>
              <span className="details">
                <Boolean flag={countBasedFee.slabbedFee || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">From Count:</label>
              <span className="details">
                <Boolean flag={countBasedFee.fromCount || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">To Count:</label>
              <span className="details">
                <Boolean flag={countBasedFee.toCount || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-1">
              <label className="control-label text-muted">Rate:</label>
              <span className="details">
                <Boolean flag={countBasedFee.rate || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-1">
              <label className="control-label text-muted">Value:</label>
              <span className="details">{countBasedFee.value || "0"} </span>

              {/* <Typography
                variant="subheading"
                className="details overflowwrap"
                gutterBottom
              >
                {countBasedFee.value || "0"}{" "}
              </Typography> */}
            </div>
          </div>
        </div>
        {countBasedFee.slabbedFees.length > 0 && <h4>Slabbed Fees:</h4>}
        {countBasedFee.slabbedFees.length > 0 &&
          countBasedFee.slabbedFees.map(item => this.renderSlabbedFee(item))}
      </div>
    );
  };

  renderSlabbedFee = (fee, index) => {
    return (
      <div key={`slabbedfee-${index}`}>
        <div className="form-group borderForm">
          <div className="row">
            {/* <div className="col-sm-6 col-md-4">
              <label className="control-label text-muted">ID:</label>
              <span className="details overflowwrap">{fee.id || "--"} </span>
            </div> */}
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">From Amount:</label>
              <span className="details">{fee.fromAmount || "0"}</span>
            </div>
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">To Amount:</label>
              <span className="details">{fee.toAmount || "0"}</span>
            </div>
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">Rate:</label>

              <span className="details">
                <Boolean flag={fee.rate || false} />
              </span>
            </div>
            <div className="col-sm-6 col-md-2">
              <label className="control-label text-muted">Value:</label>
              <span className="details">{fee.value || "0"} </span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderRateCardTemplateRulesPanel = rateCardTemplate => {
    let { rateCardRules } = rateCardTemplate;
    return rateCardRules.map(item =>
      this.renderRateCardTemplateRulePanel(item)
    );
  };

  renderRateCardTemplate = rateCardTemplate => {
    return (
      <div>
        {!this.props.fromRuleSet && this.renderRateCardTemplateHeader()}
        <p className="lead clearfix" />
        {this.renderRateCardTemplatePanel(rateCardTemplate)}
        <p className="lead clearfix" />
        {this.renderRateCardTemplateRulesPanel(rateCardTemplate)}
      </div>
    );
  };

  renderData = () => {
    if (
      this.props.rateCardTemplate &&
      Object.keys(this.props.rateCardTemplate).length
    ) {
      return this.renderRateCardTemplate(this.props.rateCardTemplate);
    }
    if (
      this.props.fromRuleSet &&
      this.props.rateCardTemplateData &&
      Object.keys(this.props.rateCardTemplateData).length
    ) {
      return this.renderRateCardTemplate(this.props.rateCardTemplateData);
    } else {
      return <PleaseWait message="Loading" />;
    }
  };

  render() {
    return <div className="page-container">{this.renderData()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowRateCardTemplate);
