/**
 * Created by ashwin.raghavan on 10/01/17.
 */

import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { epochToISO } from 'utils/helpers';
import ListMerchantSettlements from 'components/list_merchant_settlements';

const TYPES = ["DISBURSEMENT", "INVOICE"];

class MerchantSettlementStatus extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      interchange: null,
      merchant: null
    }
  }

  componentDidMount() {
    this.props.clearState();
  }

  onSubmit = (event) => {
    event.preventDefault();

    const {
      interchangeId,
      merchantId,
      type
    } = this.refs;

    this.props.merchantSettlementStatus(interchangeId.value, merchantId.value, type.value);

    this.setState({
      interchange: interchangeId.value,
      merchant: merchantId.value
    })
  }

  render() {

    return (
      <div className="page-container">
        <form onSubmit={this.onSubmit}>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Enter Interchange ID:</label>
              <input className="form-control" ref="interchangeId" type="text" required = {true} />
            </div>
            <div className="form-group col-md-3">
              <label>Enter Merchant ID:</label>
              <input className="form-control" ref="merchantId" type="text" required = {true} />
            </div>
            <div className="form-group col-md-3">
              <label className="control-label">Type:</label>
              <select
                className="form-control"
                required = {true}
                onChange={this.onSelectTypeComponent}
                ref="type">
                {
                  TYPES.map((type) => {
                    return (<option key={`sub-option-${type}`}>{type}</option>);
                  })
                }
              </select>
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Find Status</button>
          </div>
        </form>

        <p className="lead clearfix"></p>

        <ListMerchantSettlements
          merchantSettlement = {this.props.merchantSettlements}
          interchange = {this.state.interchange}
          merchant = {this.state.merchant}
        />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MerchantSettlementStatus);
