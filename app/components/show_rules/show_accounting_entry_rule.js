import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import PropTypes from "prop-types";
import Boolean from "components/boolean";
import { isoToDateString } from "utils/helpers";

import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

class ShowAccountingEntryRule extends React.Component {
  renderEntryTypeName = (type, expression) => {
    const { rule } = this.props;
    switch (type) {
      case "payer":
        if (expression) return <div className="details">{rule.payer}</div>;
        else
          return (
            <div className="details">
              {rule.payerName} - {rule.payerShortName}
            </div>
          );
      case "toParty":
        if (expression) return <div className="details">{rule.toParty}</div>;
        else
          return (
            <div className="details">
              {rule.toPartyName} - {rule.toPartyShortName}
            </div>
          );
      case "fromParty":
        if (expression) return <div className="details">{rule.fromParty}</div>;
        else
          return (
            <div className="details">
              {rule.fromPartyName} - {rule.fromPartyShortName}
            </div>
          );
    }
  };

  render() {
    const { rule } = this.props;

    return (
      <div className="collapse in" id="collapseExample3">
        {/* <div className="form-group">
          <label className="control-label text-muted">Active:</label>
          <br/>
          <Boolean
            flag={rule.active}
            trueText="Activated"
            falseText="De-activated"
            trueStatus="label-success details"
            falseStatus="label-danger details" />
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Approved:</label>
          <br/>
          <Boolean
            flag={rule.approved}
            trueText="Approved"
            falseText="Un-Approved"
            trueStatus="label-success details"
            falseStatus="label-danger details" />
        </div> */}
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">Rule Type:</label>
              {/* <span className="view-details">{rule.type}</span> */}
              <Typography variant="subheading" gutterBottom>
                {rule.type}
              </Typography>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">Entry For:</label>
              {/* <span className="view-details">{rule.entryFor}</span> */}
              <Typography variant="subheading" gutterBottom>
                {rule.entryFor}
              </Typography>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">
                Transaction Type:
              </label>
              {/* <span className="view-details">{rule.transactionType}</span> */}
              <Typography variant="subheading" gutterBottom>
                {rule.transactionType}
              </Typography>
            </div>
          </div>
        </div>
        <div className="row">
          {/* Filter Expression */}
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">Filter</label>
              {/* <span className="view-details">{rule.filterExpression}</span> */}
              <Typography variant="subheading" gutterBottom>
                {rule.filterExpression}
              </Typography>
            </div>
          </div>

          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">Entry Type:</label>
              {/* <span className="view-details">{rule.entryType}</span> */}
              <Typography variant="subheading" gutterBottom>
                {rule.entryType}
              </Typography>
            </div>
          </div>
          <div className="col-md-6">
            <div className="form-group">
              <label className="control-label text-muted">
                System Reversible:
              </label>
              <br />
              <Boolean
                flag={rule.systemReversible}
                trueText="True"
                falseText="False"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              />
            </div>
          </div>
        </div>

        {/* <div className="form-group">
          <div className="row">
            <div className="col-sm-6 col-md-4">
              <label className="control-label text-muted">Effective From:</label>
              <span className="details">{isoToDateString(rule.effectiveFrom)}</span>
            </div>
            <div className="col-sm-6 col-md-4">
              <label className="control-label text-muted">Effective To:</label>
              <span className="details">{isoToDateString(rule.effectiveTo)}</span>
            </div>
          </div>
        </div> */}
        {/* <div className="form-group">
          <label className="control-label text-muted">Priority:</label>
          <div className="details">{rule.priority}</div>
        </div> */}
        <div className="well">
          <div className="form-group">
            <label className="control-label text-muted">FromParty:</label>
            {/* <span className="view-details">{rule.fromPartyType}</span> */}
            <Typography variant="subheading" gutterBottom>
              {rule.fromPartyType}
            </Typography>
          </div>
          <div className="form-group">
            <label className="control-label text-muted">Payer:</label>
            {/* <span className="view-details">
              {this.renderEntryTypeName("fromParty", rule.fromExpression)}
            </span> */}
            <Typography variant="subheading" gutterBottom>
              {this.renderEntryTypeName("fromParty", rule.fromExpression)}
            </Typography>
          </div>
          <Boolean
            flag={rule.fromExpression}
            trueText="Expression"
            falseText="NonExpression"
            trueStatus="label-success details"
            falseStatus="label-danger details"
          />
        </div>
        <div className="well">
          <div className="form-group">
            <label className="control-label text-muted">ToParty:</label>
            {/* <span className="view-details">{rule.toPartyType}</span> */}
            <Typography variant="subheading" gutterBottom>
              {rule.toPartyType}
            </Typography>
          </div>
          <div className="form-group">
            <label className="control-label text-muted">Payer:</label>
            {/* <span className="view-details">
              {this.renderEntryTypeName("toParty", rule.toExpression)}
            </span> */}
            <Typography variant="subheading" gutterBottom>
              {this.renderEntryTypeName("toParty", rule.toExpression)}
            </Typography>
          </div>
          <Boolean
            flag={rule.toExpression}
            trueText="Expression"
            falseText="NonExpression"
            trueStatus="label-success details"
            falseStatus="label-danger details"
          />
        </div>
      </div>
    );
  }
}

ShowAccountingEntryRule.propTypes = {
  rule: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAccountingEntryRule);
