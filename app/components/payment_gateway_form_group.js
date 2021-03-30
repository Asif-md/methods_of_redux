import React from 'react';
import PropTypes from 'prop-types';
class PaymentGatewayFormGroup extends React.Component{  
  getData = () => {
    const { paymentGatewayId } = this.refs;
    return {
      paymentGatewayId: paymentGatewayId.value
    };
  }

  renderFetching = () => {
    return (
      <span className="help-block">
        Options will be fetched form backend
      </span>
    );
  }

  renderInterchanges = () => {
    return (
      <select
        className="form-control"
        required = {true}
        onChange={this.props.onChange}
        ref="paymentGatewayId">
        <option value="">Select Payment Gateway</option>
        {
          this.props.interchanges.map((interchange) => {
            return (
              <option
                key={`interchange-option-${interchange.id}`}
                value={interchange.id}>
                {interchange.name} ({interchange.interchangeId})
              </option>
            );
          })
        }
      </select>
    );
  }

  renderData = () => {
    if (this.props.interchanges.length === 0) {
      return this.renderFetching();
    } else {
      return this.renderInterchanges();
    }
  }

  render() {
    return (
      <div className="form-group">
        <label className="control-label">Payment Gateway:</label>
        {this.renderData()}
      </div>
    );
  }
}

PaymentGatewayFormGroup.propTypes =  {
  interchanges: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
}

export default PaymentGatewayFormGroup;
