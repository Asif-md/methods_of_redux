import React from "react";

class FilterExpression extends React.Component {
  onAddFilter = event => {
    event.preventDefault();
    this.props.addFilter();
  };

  onRemoveFilter = event => {
    event.preventDefault();
    this.props.removeFilter(this.props.index);
  };

  onChangeFilter = event => {
    event.preventDefault();
    this.props.changeFilter(this.props.index, this.getData());
  };

  getData = () => {
    const { leftOperand, operation, rightOperand } = this.refs;

    return {
      leftOperand: leftOperand.value,
      operation: operation.value,
      rightOperand: rightOperand.value
    };
  };

  render() {
    return (
      <div className="form-group">
        <div className="row">
          <div className="col-sm-3 col-md-2">
            <input
              className="form-control"
              type="text"
              onChange={this.onChangeFilter}
              ref="leftOperand"
            />
          </div>
          <div className="col-sm-3 col-md-2">
            <select
              className="form-control"
              onChange={this.onChangeFilter}
              ref="operation"
            >
              <option value="==">Equal to</option>
              <option value=">">Greater than</option>
              <option value="<">Lesser than</option>
              <option value=">=">Greater than Equal to</option>
              <option value="<=">Lesser than Equal to</option>
            </select>
          </div>
          <div className="col-sm-3 col-md-2">
            <input
              className="form-control"
              type="text"
              onChange={this.onChangeFilter}
              ref="rightOperand"
            />
          </div>
          <div className="btn-toolbar col-sm-3">
            <button
              className="btn btn-danger"
              onClick={this.onRemoveFilter}
              data-test-element="remove-filter"
            >
              <span className="glyphicon glyphicon-minus" />
            </button>
            <button
              className="btn btn-primary"
              onClick={this.onAddFilter}
              data-test-element="add-filter"
            >
              <span className="glyphicon glyphicon-plus" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default FilterExpression;
