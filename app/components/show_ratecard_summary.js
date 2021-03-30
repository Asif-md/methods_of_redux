/**
 * Created by ashwin.raghavan on 13/02/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import * as routes from "routes";
import {Link} from "react-router-dom";
import Boolean from "components/boolean"

class RateCards extends React.Component{

  onApproveRatecard = (ratecard, merchantId, index, event) => {
    event.preventDefault();

    const { attemptApprove: attemptApproveAction } = this.props;
    attemptApproveAction(
      'ratecard',
      ratecard,
      {
        merchantId,
        index
      }
    );
  }

  onActivateRatecard = (ratecard, merchantId, index, event) => {
    event.preventDefault();

    const { attemptActivate } = this.props;
    attemptActivate(
      'ratecard',
      ratecard,
      {
        merchantId,
        index
      }
    );
  }

  onDeactivateRatecard = (ratecard, merchantId, index, event) => {
    event.preventDefault();

    const { attemptDeactivate } = this.props;
    attemptDeactivate(
      'ratecard',
      ratecard,
      {
        merchantId,
        index
      }
    );
  }

  renderSlabs = (rate) => {
    return (
      <div className="form-group">
        <div className="details">
          <table className="table table-bordered table-condensed">
            <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Value</th>
            </tr>
            </thead>
            <tbody>
            {
              rate.slabs.map((slab) => {
                return (
                  <tr key={`slab-${slab.id}`}>
                    <th>{slab.from}</th>
                    <td>{slab.to}</td>
                    <td>{slab.value} {rate.rate ? '%' : ''}</td>
                  </tr>
                );
              })
            }
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  renderSlabbedRate = (ruleSetId, rule, index) => {
    return (
      <div className="form-group">
        <label className="control-label text-muted">Entry For:</label>
        <span className="form-group details">{rule.entryFor}</span>
        <Link to={{
          pathname: routes.editRatecardPath(ruleSetId),
          state:{
            rateCard: {
              ruleSetId: ruleSetId,
              rule
            }
          }
        }}> Edit Ratecard </Link>
        <div className="form-group details">
          <table className="table table-bordered table-condensed table-hover">
            <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
            </tr>
            </thead>
            <tbody>
            <tr key={`slab-${index}`}>
              <td>{rule.fromParty}</td>
              <td>{rule.toParty}</td>
              <td>{rule.type}</td>
            </tr>
            </tbody>
            {this.renderSlabs(rule)}
          </table>
        </div>
        <label className="control-label text-muted">Tax exemption threshold:</label>
        <span className="form-group details">{rule.taxExemptionThreshold}</span>
      </div>
    )
  }

  renderFixedRate = (ruleSetId, rule, index) => {
    return (
      <div className="form-group">
        <label className="control-label text-muted">Entry For:</label>
        <span className="form-group details">{rule.entryFor}</span>
        <Link to={{
          pathname: routes.editRatecardPath(ruleSetId),
          state:{
            rateCard: {
              ruleSetId: ruleSetId,
              rule
            }
          }
        }}> Edit Ratecard </Link>
        <div className="form-group details">
          <table className="table table-bordered table-condensed table-hover">
            <thead>
            <tr>
              <th>From</th>
              <th>To</th>
              <th>Type</th>
              <th>Fee</th>
            </tr>
            </thead>
            <tbody>
            <tr key={`slab-${index}`}>
              <td>{rule.fromParty}</td>
              <td>{rule.toParty}</td>
              <td>{rule.type}</td>
              <td>{rule.value} {rule.rate ? '%' : ''}</td>
            </tr>
            </tbody>
          </table>
        </div>
        <label className="control-label text-muted">Tax exemption threshold:</label>
        <span className="form-group details">{rule.taxExemptionThreshold}</span>
      </div>
    )
  }

  renderRate = (ruleSetId, rate, index) => {
    if (rate.slabbed) {
      return this.renderSlabbedRate(ruleSetId, rate, index);
    } else {
      return this.renderFixedRate(ruleSetId, rate, index);
    }
  }

  renderRates = (ruleSetId, rates) => {
    if (Object.keys(rates).length)
      return rates.map(this.renderRate.bind(null, ruleSetId));
  }

  renderRatecard = (ratecard, index) => {
    const { merchantId } = this.props;

    const onApproveRatecard = this.onApproveRatecard.bind(null, ratecard, merchantId, index);
    const onActivateRatecard = this.onActivateRatecard.bind(null, ratecard, merchantId, index);
    const onDeactivateRatecard = this.onDeactivateRatecard.bind(null, ratecard, merchantId, index);

    return (
      <div key={`rule-${ratecard.id}`}>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
                <div className="btn-toolbar pull-right">
                  <a className="btn btn-sm btn-success" href="#" onClick={onApproveRatecard}>
                    Approve
                  </a>
                  <a className="btn btn-sm btn-primary" href="#" onClick={onActivateRatecard}>
                    Activate
                  </a>
                  <a className="btn btn-sm btn-danger" href="#" onClick={onDeactivateRatecard}>
                    De-activate
                  </a>
                </div>
                <small>{ratecard.name}</small>
              </legend>

              <div className="form-group">
                <label className="control-label text-muted">Active:</label>
                <br/>
                <Boolean
                  flag={ratecard.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
              </div>

              <div className="form-group">
                <label className="control-label text-muted">Approved:</label>
                <br/>
                <Boolean
                  flag={ratecard.approved}
                  trueText="Approved"
                  falseText="Un-approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
              </div>

              <div className="form-group">
                <label className="control-label text-muted">Instrument:</label>
                <div className="details">{ratecard.instrument}</div>
              </div>

              {this.renderRates(ratecard.id, ratecard.rates)}

            </fieldset>
          </div>
        </div>
        <br/>
      </div>
    );
  }

  renderData = () =>{
    const { ratecards, merchantId, attemptApprove } = this.props;

    if (Object.keys(ratecards).length) {
      return ratecards.map(this.renderRatecard);
    }
  }

  render() {
    return (
      <div className="page-container">
        {this.renderData()}
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(RateCards);
