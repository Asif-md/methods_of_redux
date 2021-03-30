/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import {Link} from "react-router-dom";
import Form from "components/form";
import * as routes from "routes";
import {dateStringToISO} from "utils/helpers";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";
import RuleSlabs from "components/rule_slabs";

// const serviceTypes = ['PREPAID_RECHARGE', 'PREPAID_DTH', 'POSTPAID_PP', 'POSTPAID_GS',
// 'POSTPAID_LL', 'POSTPAID_ELEC', 'POSTPAID_DC', 'POSTPAID_INS', 'POSTPAID_BB', 'POSTPAID_WR'];

const marginTopStyle = {
  marginTop : '20px'
}

class CreateBillpayRuleset extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      surchargeComponent: null,
      createPGRulesComponent: null
    }
  }

  componentDidMount() {
    this.props.serviceTypes();
  }

  onSurchargeToggle = (event) => {
    this.setState({
      surchargeComponent: event.target.checked
    })
  }

  onCreatePGToggle = (event) => {
    this.setState({
      createPGRulesComponent: event.target.checked
    })
  }

  getData = () => {
    const {
      serviceType,
      providerId,
      providerName,
      description,
      commission,
      rate,
      taxable,
      surchargeApplicable,
      surcharge,
      surchargeRate,
      effectiveFrom,
      effectiveTo,
      createWalletRules,
      createUpiRules,
      createPGRules
    } = this.refs;

    return {
      serviceType: serviceType.value,
      providerId: providerId.value,
      providerName: providerName.value,
      description: description.value,
      commission: commission.value,
      rate: rate.checked,
      taxable: taxable.checked,
      surchargeApplicable: surchargeApplicable.checked,
      surcharge: surcharge.getSlabs(),
      surchargeRate: surchargeRate.checked,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value),
      createWalletRules: createWalletRules.checked,
      createUpiRules: createUpiRules.checked,
      createPGRules: createPGRules.checked
    }
  }

  renderSurchargeFormBox = () => {
    const { surchargeComponent }= this.state;

    return (
      <div className="row form-group">
        <div className="col-md-6">
          <p className="lead remove-margin">Surcharge - Slabs</p>
          <br/>
          <div className="row">
            <div className="col-sm-3">
              <label className="control-label">From ( paisa ) :</label>
            </div>
            <div className="col-sm-3">
              <label className="control-label">To ( paisa ) :</label>
            </div>
            <div className="col-sm-3">
              <label className="control-label">Fee :</label>
            </div>
            <div className="col-sm-3">
            </div>
          </div>
          <RuleSlabs ref="surcharge"/>
        </div>
      </div>
    );
  }

  render() {

    const { createPGRulesComponent } = this.state;
    const { serviceTypes } =  this.props.rulesets;

    return(
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createBillpayRuleset}>
          <h1 className="page-header">
            Create Billpay
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Service Type:</label>
                <select
                  className="form-control"
                  required = {true}
                  ref="serviceType">
                  {
                    serviceTypes.map((serviceType) => {
                      return (<option key={`sub-option-${serviceType}`}>{serviceType}</option>);
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Provider ID:</label>
                <input className="form-control" type="text" required = {true}
                       ref="providerId"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Provider Name:</label>
                <input className="form-control" type="text" required = {true} placeholder="eg. BILDSK"
                       ref="providerName"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Description:</label>
                <input className="form-control" type="text" required = {true}
                       ref="description"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-4">
              <div className="form-group">
                <label className="control-label">Commission ( paisa or percentage value ):</label>
                <input className="form-control" type="number"  min="0" step="any"
                       ref="commission"/>
              </div>
            </div>
            <div className="col-md-2" style={marginTopStyle}>
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="rate"/>Percentage</label>
              </div>
            </div>
          </div>

          <div className="checkbox">
            <label>
              <input type="checkbox" ref="taxable"/>Taxable</label>
          </div>

          <div className="checkbox">
            <label>
              <input
                ref="surchargeApplicable"
                type="checkbox"
                onChange={this.onSurchargeToggle}/>
              Surcharge Applicable
            </label>
          </div>

          {this.renderSurchargeFormBox()}

          <div className="checkbox">
            <label>
              <input
                ref="surchargeRate"
                type="checkbox"/>
              Percentage
            </label>
          </div>

          <br/>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="control-label">Effective From:</label>
              <input
                className="form-control" type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveFrom()}
                ref="effectiveFrom"/>
            </div>

            <div className="col-md-3">
              <label className="control-label">Effective To:</label>
              <input
                className="form-control" type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveTo()}
                ref="effectiveTo"/>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createWalletRules"/>Create Wallet Rules</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createUpiRules"/>Create UPI Rules</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createPGRules" onChange={this.onCreatePGToggle}/>Create PG Rules</label>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-md btn-block btn-success"
                type="submit">Create Composite Bill Pay Ruleset</button>

              <div className="col-md-6 form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </div>
          </div>

        </Form>
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateBillpayRuleset);
