import React from "react";
import CommonRuleBox from "components/common_rule_box";
import EntryTypeFormGroup from "components/entry_type_form_group";
import PaymentGatewayFormGroup from "components/payment_gateway_form_group";
import {multipleSelectedOptions} from "utils/helpers";

class FixedInterchangeFeeRule extends React.Component{

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
      fee: fee.value,
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

          <div className="form-group">
            <label className="control-label">Fee:</label>
            <input
              className="form-control" type="number" min="0" step="any"
              required={true}
              onChange={this.props.onRuleChange}
              ref="fee"/>
          </div>

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

export default FixedInterchangeFeeRule;
