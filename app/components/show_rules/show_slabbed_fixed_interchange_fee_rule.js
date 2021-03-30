import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import PropTypes from 'prop-types';
import Boolean from "components/boolean";
import {isoToDateString} from "utils/helpers";

class ShowSlabbedFixedInterchangeFeeRule extends React.Component{
  
  renderEntryTypeName = (type, expression) => {
    const { rule } = this.props;
    switch (type) {
      case "payer":
        if (expression)
          return (<div className="details">{rule.payer}</div>);
        else
          return (<div className="details">{rule.payerName} - {rule.payerShortName}</div>);
      case "toParty":
        if (expression)
          return (<div className="details">{rule.toParty}</div>);
        else
          return (<div className="details">{rule.toPartyName} - {rule.toPartyShortName}</div>);
    }
  }

  renderTaxFields = () => {
    const { rule } = this.props;

    if (rule.taxable) {
      return (
        <div>
          <div className="form-group">
            <label className="control-label text-muted">Tax exemption threshold:</label>
            <div className="details">{rule.exemptionThreshold}</div>
          </div>
          <div className="form-group">
            <label className="control-label text-muted">Taxes:</label>
            <div className="details">
              <table className="table table-bordered table-condensed table-hover">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rule.taxes.map((tax) => {
                      return (
                        <tr key={`tax-${tax.id}`}>
                          <th scope="row">{tax.type}</th>
                          <td>{tax.name}</td>
                          <td>{tax.value}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label text-muted">Cesses:</label>
            <div className="details">
              <table className="table table-bordered table-condensed table-hover">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>Name</th>
                    <th>Effective From</th>
                    <th>Effective To</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    rule.cesses.map((cess) => {
                      return (
                        <tr key={`cess-${cess.id}`}>
                          <th scope="row">{cess.type}</th>
                          <td>{cess.name}</td>
                          <td>{isoToDateString(cess.effectiveFrom)}</td>
                          <td>{isoToDateString(cess.effectiveTo)}</td>
                          <td>{cess.value}</td>
                        </tr>
                      );
                    })
                  }
                </tbody>
              </table>
            </div>
          </div>

          {this.renderTaxAccount()}
        </div>
      );
    } else {
      return null;
    }
  }

  renderTaxAccount = () => {
    const { rule } = this.props;

    if (rule.taxAccount) {
      return (
        <div className="form-group">
          <label className="control-label text-muted">Tax Account:</label>
          <div className="well">
            <div className="form-group">
              <label className="control-label text-muted">Name:</label>
              <div className="details">{rule.taxAccount.name}</div>
            </div>
            <div className="form-group">
              <label className="control-label text-muted">Account No:</label>
              <div className="details">{rule.taxAccount.accountNo}</div>
            </div>
            <div className="form-group">
              <label className="control-label text-muted">Account Type:</label>
              <div className="details">{rule.taxAccount.accountType}</div>
            </div>
          </div>
        </div>
      )
    }
  }

  render() {
    const { rule } = this.props;

    return (
      <div className="collapse in" id="collapseExample3">
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Rule Type:</label>
          <div className="details">{rule.type}</div>
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Entry For:</label>
          <div className="details">{rule.entryFor}</div>
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Transaction Type:</label>
          <div className="details">{rule.transactionType}</div>
        </div>
        <div className="form-group">
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
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Priority:</label>
          <div className="details">{rule.priority}</div>
        </div>
        <div className="well">
          <div className="form-group">
            <label className="control-label text-muted">Payer Type:</label>
            <div className="details">{rule.partyType}&nbsp;</div>
          </div>
          <div className="form-group">
            <label className="control-label text-muted">Payer:</label>
            {this.renderEntryTypeName("payer", (rule.payerExpression))}
          </div>
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Entry Type:</label>
          <div className="details">{rule.entryType}</div>
        </div>
        <div className="form-group">
          <label className="control-label text-muted">Payment Gateway:</label>
          <div className="well">
            <div className="form-group">
              <label className="control-label text-muted">Name:</label>
              <div className="details">{rule.interchange.name}</div>
            </div>
            <div className="form-group">
              <label className="control-label text-muted">ID:</label>
              <div className="details">{rule.interchange.interchangeId}</div>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label className="control-label text-muted">Slabs:</label>
          <div className="details">
            <table className="table table-bordered table-condensed table-hover">
              <thead>
                <tr>
                  <th>From</th>
                  <th>To</th>
                  <th>Fee</th>
                </tr>
              </thead>
              <tbody>
                {
                  rule.fees.map((slab) => {
                    return (
                      <tr key={`slab-${slab.id}`}>
                        <th>{slab.from}</th>
                        <td>{slab.to}</td>
                        <td>{slab.value}</td>
                      </tr>
                    );
                  })
                }
              </tbody>
            </table>
          </div>
        </div>

        <div className="form-group">
          <Boolean
            flag={rule.taxable}
            trueText="Taxable"
            falseText="Non-Taxable"
            trueStatus="label-success details"
            falseStatus="label-danger details" />
        </div>

        {this.renderTaxFields()}

      </div>
    );
  }
}

ShowSlabbedFixedInterchangeFeeRule.propTypes = {
  rule: PropTypes.object.isRequired
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSlabbedFixedInterchangeFeeRule);
