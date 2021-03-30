import React from "react";
import CommonRuleBox from "components/common_rule_box";
import EntryTypeFormGroup from "components/entry_type_form_group";
import PaymentGatewayFormGroup from "components/payment_gateway_form_group";
import {multipleSelectedOptions} from "utils/helpers";

class SlabbedFixedInterchangeFeeRule extends React.Component{
  getData = () => {
    const {
      commonRule,
      entryType,
      paymentGateway,
      fee,
      taxIds,
      cessIds,
      taxAccount
    } = this.refs;

    const taxable = this.refs.isTaxable.checked;
    var taxAccountData = (taxable && taxAccount) ? taxAccount.getData() : {};
    var taxData = {
      taxable,
      taxes: (taxable && taxIds) ? multipleSelectedOptions(taxIds.selectedOptions) : [],
      cesses: (taxable && cessIds) ? multipleSelectedOptions(cessIds.selectedOptions) : [],
      ...taxAccountData
    };

    return {
      fee: this.props.getSlabs(),
      ...taxData,
      ...paymentGateway.getData(),
      ...entryType.getData(),
      ...commonRule.getData()
    };
  }

  onTaxableToggle = (event) => {
    this.props.onTaxableToggle(event);
    this.props.onRuleChange();
  }

  render() {
    return (
      <div className="row">
        <CommonRuleBox
          ref="commonRule"
          {...this.props} />
        <div className="col-md-6">
          <EntryTypeFormGroup
            ref="entryType"
            onChange={this.props.onRuleChange}/>
          <PaymentGatewayFormGroup
            ref="paymentGateway"
            interchanges={this.props.interchanges.data}
            onChange={this.props.onRuleChange} />

          <p className="lead remove-margin">Slabs</p>
          <hr/>
          <div className="row">
            <div className="col-md-3">
              <label className="control-label">From ( paisa ) :</label>
            </div>
            <div className="col-md-3">
              <label className="control-label">To ( paisa ) :</label>
            </div>
            <div className="col-md-2">
              <label className="control-label">Fee ( % value ) :</label>
            </div>
            <div className="col-md-2">
            </div>
          </div>
          {this.props.renderSlabs()}

          <div className="checkbox">
            <label>
              <input
                type="checkbox"
                checked={this.props.taxable}
                onClick={this.onTaxableToggle}
                ref="isTaxable"/>
              Taxable
            </label>
          </div>

          {this.props.renderTaxableFieldset()}
        </div>
      </div>
    );
  }
}

export default SlabbedFixedInterchangeFeeRule;
