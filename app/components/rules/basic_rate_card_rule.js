import React from "react";
import CommonRateCardRuleForm from "components/common_rate_card_rule_form";

class BasicRateCardRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      slabbedFee: false,
      rate: false
    };
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.id]: !this.state[event.target.id] });
  };

  onChangeCheckboxRate = event => {
    this.setState({ rate: !this.state.rate, slabbedFee: false })
  }

  onChangeCheckboxSlabbed = event => {
    this.setState({ slabbedFee: !this.state.slabbedFee, rate: false })
  }

  getData = () => {
    const { commonRateCardRule } = this.refs;
    const { slabbedFee } = this.state;
    const slabbedFees = slabbedFee ? this.props.getSlabs() : [];
    return {
      slabbedFees,
      ...this.state,
      ...commonRateCardRule.getData(),
      value: slabbedFee ? 0 : this.refs.inputValue.value
    };
  };

  render() {



    return (
      <div className="row">
        <CommonRateCardRuleForm ref="commonRateCardRule" {...this.props}>
          <div>
            <div className="row">
              <div className="form-group checkbox col-md-12">
                <label>
                  <input
                    type="checkbox"
                    id="slabbedFee"
                    checked={this.state.slabbedFee}
                    onChange={this.onChangeCheckboxSlabbed}
                  />
                  Slabbed Fee
                </label>
              </div>
            </div>
            {!this.state.slabbedFee && (
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    id="rate"
                    checked={this.state.rate}
                    onChange={this.onChangeCheckboxRate}
                  />
                  Rate
                </label>
              </div>
            )}
            {!this.state.slabbedFee && (
              <div className="form-group row col-md-12">
                <label>
                  Value:
                  <input
                    className="form-control"
                    type="number"
                    min="0"
                    step="any"
                    required={false}
                    defaultValue={0}
                    onChange={this.props.onRuleChange}
                    ref="inputValue"
                  />
                </label>
              </div>
            )}
            {this.state.slabbedFee && (
              <div className="col-md-12">
                <p className="lead remove-margin">Slabs</p>
                <hr />
                <div className="row">
                  <div className="col-md-1">
                    <label className="control-label">Rate </label>
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">From (paisa)</label>
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">To (paisa)</label>
                  </div>
                  <div className="col-md-3">
                    <label className="control-label">Fee (In %)</label>
                  </div>

                  <div className="col-md-3" />
                </div>
                {this.props.renderSlabs()}
              </div>
            )}
          </div>
        </CommonRateCardRuleForm>
      </div>
    );
  }
}

BasicRateCardRule.defaultProps = {
  hasExpression: false
};

export default BasicRateCardRule;
