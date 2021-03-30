import React from 'react';
import FilterExpression from 'components/filter_expression';

class FilterFormBox extends React.Component{ 
  getData = () => {
    const { filter } = this.props.newRuleset;
    return filter;
  }

  onChangeFilter = (event) =>  {
    event.preventDefault();
    this.props.changeFilterName(this.refs.name.value);
  }

  renderFilter = (filter, index) => {
    var key = `filter-${filter.timestamp}`;
    return (
      <FilterExpression
        key={key}
        index={index}
        addFilter={this.props.addFilter}
        removeFilter={this.props.removeFilter}
        changeFilter={this.props.changeFilter}/>
    );
  }

  renderFilters = () => {
    const filters = this.props.newRuleset.filter.filters;
    return filters.map(this.renderFilter);
  }

  render() {
    const filterNodes = this.renderFilters();

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <fieldset>
            <legend data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">Filters</legend>
            <div className="collapse in" id="collapseExample2">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label">Name:</label>
                    <input
                      className="form-control" type="text"
                      onChange={this.onChangeFilter}
                      ref="name"/>
                  </div>
                  <p className="lead remove-margin">Expression</p>
                  <hr/>
                </div>
                <div className="col-md-12">
                  {filterNodes}
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default FilterFormBox;
