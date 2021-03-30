import React from "react";
import Boolean from "components/boolean";

class StaticSlab extends React.Component {
  getData = () => {
    const { from, to, value } = this.refs;

    return {
      id: this.props.data.id,
      from: from.value,
      to: to.value,
      value: value.value
    };
  };

  render() {
    const { data, rate } = this.props;

    return (
      <div className="row">
        <div className="col-md-3">
          <input
            className="form-control"
            type="number"
            min="0"
            required={true}
            defaultValue={data.from}
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
            defaultValue={data.to}
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
            required={true}
            defaultValue={data.value}
            onChange={this.props.onRuleChange}
            ref="value"
          />
        </div>
        <div className="col-md-2">
          <span className="details">
            <Boolean flag={rate} />
          </span>
        </div>
      </div>
    );
  }
}

export default StaticSlab;
