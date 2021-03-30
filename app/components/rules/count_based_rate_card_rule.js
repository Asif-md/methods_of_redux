import React from "react";
import CommonRateCardRuleForm from "components/common_rate_card_rule_form";
import RateCardRuleSlabs from "components/rate_card_rule_slabs";

const calculationWindowUnitTypes = ["HOURS", "DAYS", "MONTHS", "MINUTES"];

class CountBasedRateCardRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postFact: false,
      rate: false
    };
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.id]: !this.state[event.target.id] });
  };

  getData = () => {
    const {
      commonRateCardRule,
      calculationFrequency,
      calculationWindowUnit
    } = this.refs;
    const countBasedSlabs =
      this.refs.rateCardSlab &&
      typeof this.refs.rateCardSlab.getSlabs === "function"
        ? this.refs.rateCardSlab.getSlabs() || []
        : [];

    return {
      countBasedSlabs,
      postFact: this.state.postFact,
      ...commonRateCardRule.getData(),
      calculationFrequency: calculationFrequency.value,
      calculationWindowUnit: calculationWindowUnit.value
    };
  };

  render() {
    return (
      <div className="row">
        <CommonRateCardRuleForm ref="commonRateCardRule" {...this.props}>
          <div className="row">
            <div className="col-md-12">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    onChange={this.onChangeCheckbox}
                    id="postFact"
                  />
                  Post Fact
                </label>
              </div>
              <div className="form-group">
                <label>
                  Calculation Frequency:
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    step="any"
                    required={false}
                    defaultValue={0}
                    onChange={this.props.onRuleChange}
                    ref="calculationFrequency"
                  />
                </label>
              </div>
              <div className="form-group">
                <label className="control-label">
                  Calculation Window Unit:
                </label>
                <select
                  className="form-control"
                  required={false}
                  onChange={this.props.onRuleChange}
                  ref="calculationWindowUnit"
                >
                  <option value="" disabled>
                    Select Type
                  </option>
                  {calculationWindowUnitTypes.map(type => {
                    return <option key={`sub-option-${type}`}>{type}</option>;
                  })}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p className="lead remove-margin">Slabs</p>
                <hr />
                <RateCardRuleSlabs
                  type="countBasedRateCard"
                  ref="rateCardSlab"
                />
              </div>
            </div>
          </div>
        </CommonRateCardRuleForm>
      </div>
    );
  }
}

CountBasedRateCardRule.defaultProps = {
  hasExpression: false
};

export default CountBasedRateCardRule;
