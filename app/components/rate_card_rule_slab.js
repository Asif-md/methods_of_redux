import React from "react";

class RateCardRuleSlab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isChecked: false
    };
  }

  toggleChange = () => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };
  getData = () => {
    const { from, to, value, rate } = this.refs;

    return {
      fromAmount: Number(from.value),
      toAmount: Number(to.value),
      value: Number(value.value),
      rate: rate.checked
    };
  };

  onRemoveSlab = event => {
    event.preventDefault();
    this.props.removeSlab(this.props.index);
  };

  render() {
    return (
      <div>
        <div className="row" style={{ marginTop:'12px'}}>
          <div className="col-md-1">
            <label>
              <input id="rate" ref="rate" type="checkbox" />
            </label>
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              defaultValue={0}
              required={false}
              onChange={this.props.onRuleChange}
              ref="from"
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              defaultValue={0}
              required={false}
              onChange={this.props.onRuleChange}
              ref="to"
            />
          </div>
          <div className="col-md-3">
            <input
              className="form-control"
              type="number"
              min="0"
              step="any"
              defaultValue={0}
              required={false}
              onChange={this.props.onRuleChange}
              ref="value"
            />
          </div>

          <div className="btn-toolbar col-md-2">
            <button
              className="btn btn-danger btn-xs"
              onClick={this.onRemoveSlab}
            >
              <span className="glyphicon glyphicon-minus"></span>
            </button>
            <button
              className="btn btn-primary btn-xs"
              onClick={this.props.onAddSlab}
            >
              <span className="glyphicon glyphicon-plus"></span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default RateCardRuleSlab;
