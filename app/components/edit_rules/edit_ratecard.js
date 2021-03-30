/**
 * Created by ashwin.raghavan on 05/09/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { Link } from "react-router-dom";
import * as routes from "routes";
import Boolean from 'components/boolean';
import Form from "components/form";
import StaticSlabs from "components/static_slabs";
import {
  FIXED_COMMISSION_RULE, FIXED_INTERCHANGE_FEE_RULE, FIXED_RATE_INTERCHANGE_FEE_RULE,
  SLABBED_FIXED_COMMISSION_RULE, SLABBED_FIXED_INTERCHANGE_FEE_RULE, SLABBED_FIXED_RATE_COMMISSION_RULE,
  SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE
} from "../rules/rule_types";

class EditRatecard extends React.Component{
  constructor(){
    super(props);
    this.state = {
      rateCard: this.props.location.state
    }
  }

  getData = () => {
    const { rateCard } = this.props.location.state;
    const { fixedCharge, slabbedCharges } = this.refs;
    const { rate, slabbed, type, id } = rateCard.rule;
    let ruleType;

    if (!rate && !slabbed && type == 'COMMISSION')
      ruleType = FIXED_COMMISSION_RULE;
    else if (rate && !slabbed && type == 'COMMISSION')
      ruleType = FIXED_RATE_COMMISSION_RULE;
    else if (!rate && !slabbed && type == 'FEE')
      ruleType = FIXED_INTERCHANGE_FEE_RULE;
    else if (rate && !slabbed && type == 'FEE')
      ruleType = FIXED_RATE_INTERCHANGE_FEE_RULE;
    else if (!rate && slabbed && type == 'COMMISSION')
      ruleType = SLABBED_FIXED_COMMISSION_RULE;
    else if (rate && slabbed && type == 'COMMISSION')
      ruleType = SLABBED_FIXED_RATE_COMMISSION_RULE;
    else if (!rate && slabbed && type == 'FEE')
      ruleType = SLABBED_FIXED_INTERCHANGE_FEE_RULE;
    else
      ruleType = SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE;

    if (!slabbed) {
      return {
        ruleType: ruleType,
        ruleId: id,
        payload: {
          ruleSetId: rateCard.ruleSetId,
          charge: fixedCharge.value
        }
      }
    } else {
      return {
        ruleType: ruleType,
        ruleId: id,
        payload: {
          ruleSetId: rateCard.ruleSetId,
          slabbedValues: slabbedCharges.getSlabs()
        }
      }
    }
  }

  renderSlabs = () => {
    let { rule } = this.state.rateCard;
    let { slabs, rate } = rule
    return <StaticSlabs
        ref="slabbedCharges"
        data={{
          slabs,
          rate: rate
        }}
      />
  }

  renderSlabbedRule = () => {
    let { rule } = this.state.rateCard;
    return (
      <div className="row form-group">
        <div className="col-md-9">
          <label className="control-label text-muted">Fee/Commission Slabs:</label>
          <div className="row form-group">
            <div className="col-md-3">
              <label className="control-label">From ( paisa ):</label>
            </div>
            <div className="col-md-3">
              <label className="control-label">To ( paisa ):</label>
            </div>
            <div className="col-md-2">
              <label className="control-label">Fee:</label>
            </div>
            <div className="col-md-2">
              <label className="control-label">Percentage:</label>
            </div>
          </div>
          {this.renderSlabs()}
        </div>
      </div>
    )
  }

  renderFixedRule = ()  => {
    let { rule } = this.state.rateCard;
    return (
      <div className="row form-group">
        <div className="col-md-3">
          <label className="control-label">Fee/Commission:</label>
          <input
            className="form-control" type="number" min="0" step="any"
            required = {true}
            defaultValue={rule.value}
            ref="fixedCharge"/>
        </div>
        <div className="col-md-4">
          <label className="control-label text-muted">Percentage:</label>
          <span className="details"><Boolean flag={rule.rate}/></span>
        </div>
      </div>
    )
  }

  renderData = () => {
    let { rule } = this.state.rateCard;
    if (rule.slabbed) {
      return this.renderSlabbedRule(rule)
    } else {
      return this.renderFixedRule(rule)
    }
  }

  render() {
    let { rule } = this.state.rateCard;
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.editRatecard}>
          <h1 className="page-header"> Edit Ratecard </h1>
          <div>
            <div className="row form-group">
              <div className="col-md-4">
                <label className="control-label text-muted">From Party:</label>
                <span className="details">{rule.fromParty}</span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4">
                <label className="control-label text-muted">From Party:</label>
                <span className="details">{rule.toParty}</span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4">
                <label className="control-label text-muted">Transaction Type:</label>
                <span className="details">{rule.transactionType}</span>
              </div>
            </div>
            <div className="row form-group">
              <div className="col-md-4">
                <label className="control-label text-muted">Entry For:</label>
                <span className="details">{rule.entryFor}</span>
              </div>
            </div>
            {this.renderData()}
          </div>
          <div className="row">
            <div className="col-md-2">
              <button
                className="btn btn-md btn-block btn-primary"
                type="submit">Submit</button>

              <Link to={routes.ROOT_PATH}>cancel</Link>
            </div>
          </div>
        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRatecard);
