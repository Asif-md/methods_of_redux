/**
 * Created by ashwin.raghavan on 25/05/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import CreateInvoiceRecovery from "components/create_invoice_recovery";
import PendingSettlementAmount from "components/pending_settlement_amount";

class InvoiceRecovery extends React.Component{ 

  constructor(props){
    super(props);
    this.state = {
      merchant: null
    }
  }

  componentDidMount() {
    this.props.clearState();
  }


  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    })
  }

  onSubmitAmount = (event) => {
    event.preventDefault();

    const {
      merchantId
    } = this.refs;

    this.props.pendingSettlementAmount(merchantId.value);

    this.setState({
      merchant: merchantId.value
    })
  }

  onSubmitInvoice = (event) => {
    event.preventDefault();

    const {
      merchantId,
      invoiceNos
    } = this.refs;

    if (this.state.selectedOption === 'invalidate')
      this.props.invoiceRecovery(merchantId.value, invoiceNos.value, false);
    else
      this.props.invoiceRecovery(merchantId.value, invoiceNos.value, true);

  }

  render() {
    return(
      <div className="page-container">
        <h1 className="page-header">
          Invoice Recovery
        </h1>

        <form onSubmit={this.onSubmitAmount}>
          <div className="row">
            <div className="form-group col-md-3">
              <label>Enter Merchant ID:</label>
              <input className="form-control" ref="merchantId" type="text" required = {true} />
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Current pending amount</button>
          </div>
        </form>

        <PendingSettlementAmount
          pending={this.props.pendingSettlementAmountResult}
        />

        <p className="lead clearfix"></p>

        <hr/>

        <p className="lead clearfix"></p>

        <form onSubmit={this.onSubmitInvoice}>
          <div className="row form-group">
            <div className="form-group col-md-9">
              <label>Enter Invoice No(s) (comma separated):</label>
              <input className="form-control" ref="invoiceNos" type="text" required = {true} />
            </div>
          </div>

          <div className="form-group radio-inline">
            <label>
              <input type="radio" value="invalidate"
                     checked = {this.state.selectedOption === 'invalidate'}
                     onChange={this.handleOptionChange}/>
              Invalidate
            </label>
          </div>

          <div className="form-group radio-inline">
            <label>
              <input type="radio" value="reconcile"
                     checked = {this.state.selectedOption === 'reconcile'}
                     onChange={this.handleOptionChange}/>
              Invalidate & Reconcile
            </label>
          </div>

          <p className="lead clearfix"></p>

          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Submit</button>
          </div>
        </form>

      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InvoiceRecovery);
