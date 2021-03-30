import React from 'react';
import PropTypes from 'prop-types';
class TaxAccountFormGroup extends React.Component{
  getData = () => {
    const { taxAccountId } = this.refs;
    return {
      taxAccountId: taxAccountId.value
    };
  }

  renderFetching = () => {
    return (
      <span className="help-block">
        Options will be fetched form backend
      </span>
    );
  }

  renderTaxAccounts = () => {
    return (
      <select
        className="form-control"
        required = {false}
        onChange={this.props.onChange}
        ref="taxAccountId">
        <option value="">Select Tax Account</option>
        {
          this.props.taxAccounts.map((taxAccount) => {
            return (
              <option
                key={`tax-account-option-${taxAccount.id}`}
                value={taxAccount.id}>
                {taxAccount.name}
              </option>
            );
          })
        }
      </select>
    );
  }

  renderData = () =>  {
    if (this.props.taxAccounts.length === 0) {
      return this.renderFetching();
    } else {
      return this.renderTaxAccounts();
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="control-label">Tax Account:</label>
        {this.renderData()}
      </div>
    );
  }
}

TaxAccountFormGroup.propTypes = {
  taxAccounts: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}


export default TaxAccountFormGroup;
