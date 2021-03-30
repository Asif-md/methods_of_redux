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

const settlementModes = ['T0','T1','T2','T3','T4','T5','T6','T7','T15','T30'];

class createMerchantRuleset extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      createWalletRulesComponent: null,
      createUpiRulesComponent: null,
      createDCRulesComponent: null,
      createCCRulesComponent: null,
      createImpsRefundRulesComponent: null,
      createSettlementRulesComponent: null
    }
  }


  onCreateWalletToggle = (event) => {
    this.setState({
      createWalletRulesComponent: event.target.checked
    })
  }

  onCreateUpiToggle = (event) => {
    this.setState({
      createUpiRulesComponent: event.target.checked
    })
  }

  onCreateDCToggle = (event) => {
    this.setState({
      createDCRulesComponent: event.target.checked
    })
  }

  onCreateCCToggle = (event) => {
    this.setState({
      createCCRulesComponent: event.target.checked
    })
  }

  onCreateImpsRefundToggle = (event) => {
    this.setState({
      createImpsRefundRulesComponent: event.target.checked
    })
  }

  onCreateSettlementToggle = (event) => {
    this.setState({
      createSettlementRulesComponent: event.target.checked
    })
  }

  getData = () => {

    const {
      merchantId,
      walletFees,
      walletProcessingFees,
      upiFees,
      upiProcessingFees,
      debitCardFees,
      debitCardProcessingFee,
      creditCardFees,
      creditCardProcessingFee,
      walletTaxExemption,
      upiTaxExemption,
      debitCardTaxExemption,
      creditCardTaxExemption,
      impsFee,
      disableOnWeekends,
      disableOnHolidays,
      effectiveFrom,
      effectiveTo,
      settlementMode,
      createWalletRule,
      createUpiRule,
      createDebitCardRule,
      createCreditCardRule,
      createImpsRefundRule,
      createRedemptionSettlementRules,
      createTopUpRefundSettlementRule
    } = this.refs;

    return {
      merchantId: merchantId.value,
      walletFees: walletFees.getSlabs(),
      walletProcessingFees: walletProcessingFees.getSlabs(),
      upiFees: upiFees.getSlabs(),
      upiProcessingFees: upiProcessingFees.getSlabs(),
      debitCardFees: debitCardFees.getSlabs(),
      debitCardProcessingFee: debitCardProcessingFee.getSlabs(),
      creditCardFees: creditCardFees.getSlabs(),
      creditCardProcessingFee: creditCardProcessingFee.getSlabs(),
      walletTaxExemption: walletTaxExemption.value,
      upiTaxExemption: upiTaxExemption.value,
      debitCardTaxExemption: debitCardTaxExemption.value,
      creditCardTaxExemption: creditCardTaxExemption.value,
      impsFee: impsFee.value,
      disableOnWeekends: disableOnWeekends.checked,
      disableOnHolidays: disableOnHolidays.checked,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value),
      settlementMode: settlementMode.value,
      createWalletRule: createWalletRule.checked,
      createUpiRule: createUpiRule.checked,
      createDebitCardRule: createDebitCardRule.checked,
      createCreditCardRule: createCreditCardRule.checked,
      createImpsRefundRule: createImpsRefundRule.checked,
      createRedemptionSettlementRules: createRedemptionSettlementRules.checked,
      createTopUpRefundSettlementRule: createTopUpRefundSettlementRule.checked
    }
  }

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createMerchantRuleset}>
          <h1 className="page-header">
            Create Merchant Ruleset
          </h1>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Merchant ID:</label>
                <input className="form-control" type="text" required = {true}
                       ref="merchantId"/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <h3> Wallet </h3>
              <hr/>

              <p className="lead remove-margin">Wallet Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="walletFees"/>
              <hr/>

              <p className="lead remove-margin">Wallet Processing Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="walletProcessingFees"/>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">Wallet tax exemption ( paisa ) :</label>
                <input className="form-control" type="number"  min="0"
                       ref="walletTaxExemption"  required = {this.state.createWalletRulesComponent}/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <h3> UPI </h3>
              <hr/>

              <p className="lead remove-margin">UPI Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="upiFees"/>
              <hr/>

              <p className="lead remove-margin">UPI Processing Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="upiProcessingFees"/>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">UPI tax exemption ( paisa ) :</label>
                <input className="form-control" type="number"  min="0"
                       ref="upiTaxExemption"  required = {this.state.createUpiRulesComponent}/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <h3> Debit Card </h3>
              <hr/>

              <p className="lead remove-margin">Debit Card Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="debitCardFees"/>
              <hr/>

              <p className="lead remove-margin">Debit Card Processing Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="debitCardProcessingFee"/>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">Debit Card tax exemption ( paisa ) :</label>
                <input className="form-control" type="number"  min="0"
                       ref="debitCardTaxExemption"  required = {this.state.createDCRulesComponent}/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <h3> Credit Card </h3>
              <hr/>

              <p className="lead remove-margin">Credit Card Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="creditCardFees"/>
              <hr/>

              <p className="lead remove-margin">Credit Card Processing Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-sm-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-sm-3">
                  <label className="control-label">Fee ( % value ) :</label>
                </div>
                <div className="col-sm-3">
                </div>
              </div>
              <RuleSlabs ref="creditCardProcessingFee"/>
              <hr/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">Credit Card tax exemption ( paisa ) :</label>
                <input className="form-control" type="number"  min="0"
                       ref="creditCardTaxExemption"  required = {this.state.createCCRulesComponent}/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-6">
              <h3> IMPS Refund Fee </h3>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Fee ( paisa ) :</label>
                <input className="form-control" type="number"  min="0" defaultValue="200"
                       ref="impsFee"  required = {this.state.createImpsRefundRulesComponent}/>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Settlement Mode:</label>
                <select
                  className="form-control"
                  required = {this.state.createSettlementRulesComponent}
                  ref="settlementMode">
                  {
                    settlementModes.map((settlementMode) => {
                      return (<option key={`sub-option-${settlementMode}`}>{settlementMode}</option>);
                    })
                  }
                </select>
              </div>
            </div>
          </div>

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

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnWeekends"/>Disable on Weekends</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnHolidays"/>Disable on Holidays</label>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createWalletRule"
                         onChange={this.onCreateWalletToggle}/>Create Wallet Rules</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createUpiRule"
                         onChange={this.onCreateUpiToggle}/>Create UPI Rules</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createDebitCardRule"
                         onChange={this.onCreateDCToggle}/>Create DC Rules</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createCreditCardRule"
                         onChange={this.onCreateCCToggle}/>Create CC Rules</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createImpsRefundRule"
                         onChange={this.onCreateImpsRefundToggle}/>Create IMPS Refund Rules</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createRedemptionSettlementRules"
                         onChange={this.onCreateSettlementToggle}/>Create Redemption Settlement Rule</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="createTopUpRefundSettlementRule"/>Create TopUp Refund Settlement Rule</label>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-md btn-block btn-success"
                type="submit">Create Composite Merchant Ruleset</button>

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

export default connect(mapStateToProps, mapDispatchToProps)(createMerchantRuleset);
