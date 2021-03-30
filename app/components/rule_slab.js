import React from "react";

class RuleSlab extends React.Component {
  getData = () => {
    const rateFlag = this.props.rate;

    const { from, to, value, rate } = this.refs;

    if (rateFlag) {
      return {
        from: from.value,
        to: to.value,
        value: value.value,
        rate: rate.checked
      };
    } else {
      return {
        from: from.value,
        to: to.value,
        value: value.value
      };
    }
  };

  onRemoveSlab = event => {
    event.preventDefault();
    this.props.removeSlab(this.props.index);
  };

  renderRate = () => {
    if (this.props.rate) {
      return (
        <div className="col-sm-1 checkbox">
          <label>
            <input ref="rate" type="checkbox" /> %
          </label>
        </div>
      );
    }
  };

  render() {
    const { rate } = this.props;

    let rateButton = <div className="col-md-1"></div>;
    if (rate) {
      rateButton = (
        <div className="col-md-1 checkbox">
          <label>
            <input ref="rate" type="checkbox" /> %
          </label>
        </div>
      );
    }

    return (
      <div className="row">
        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            min="0"
            required={true}
            onChange={this.props.onRuleChange}
            ref="from"
          />
        </div>
        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            min="0"
            required={true}
            onChange={this.props.onRuleChange}
            ref="to"
          />
        </div>
        <div className="col-md-2">
          <input
            className="form-control"
            type="number"
            min="0"
            step="any"
            required={true}
            onChange={this.props.onRuleChange}
            ref="value"
          />
        </div>
        {rateButton}
        <div className="btn-toolbar col-md-3">
          <button className="btn btn-danger" onClick={this.onRemoveSlab}>
            <span className="glyphicon glyphicon-minus"></span>
          </button>
          <button className="btn btn-primary" onClick={this.props.onAddSlab}>
            <span className="glyphicon glyphicon-plus"></span>
          </button>
        </div>
      </div>
    );
  }
}

export default RuleSlab;
