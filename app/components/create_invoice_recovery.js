/**
 * Created by ashwin.raghavan on 25/05/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';

class CreateInvoiceRecovery extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      selectedOption: 'invalidate'
    }
  }
  
  handleOptionChange = (event) => {
    this.setState({
      selectedOption: event.target.value
    })
  }

  onSubmitInvoice = (event) => {
    event.preventDefault();

    const {
      invoiceNos
    } = this.refs;

    if (this.state.selectedOption === 'invalidate')
      this.props.invoiceRecovery(this.props.merchant, invoiceNos.value, false);
    else
      this.props.invoiceRecovery(this.props.merchant, invoiceNos.value, true);

  }

  render() {

    const { merchant } = this.props;

    return(
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
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateInvoiceRecovery);
