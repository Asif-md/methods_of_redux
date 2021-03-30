/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { epochToISO } from 'utils/helpers';
import Disbursement from 'components/show_disbursement';

class CloseToa extends React.Component{

  componentDidMount() {
    this.props.clearTransactionalMessages();
    this.props.clearState();
  }

  onSubmitClose = (event) => {
    this.props.clearTransactionalMessages();
    event.preventDefault();

    const payload = {
      fail_id: this.refs.failId.value,
      toa_id: this.refs.toaId.value
    }
    this.props.closeToa(payload);
  }

  onSubmitStatus = (event) => {
    this.props.clearTransactionalMessages();
    event.preventDefault();

    const urn  = this.refs.urn.value;
    this.props.showDisbursementByUrn(urn);
  }

  showDisbursement = () => {
    if(Object.keys(this.props.disbursement).length) {
      return (
        <Disbursement disbursement={this.props.disbursement}/>
      )
    }
  }

  render() {
    const { disbursement } = this.props;

    return (
      <div className="page-container">

        <h2>Close Transaction</h2>
        <form onSubmit={this.onSubmitClose}>
          <div className="row">
            <div className="form-group col-md-5">
              <label>Enter Failed Transaction Id :</label>
              <input className="form-control" ref="failId" type="text" required = {true} />
            </div>
          </div>
          <div className="row">
            <div className="form-group col-md-5">
              <label>Enter TOA transaction ID :</label>
              <input className="form-control" ref="toaId" type="text" required = {true} />
            </div>
          </div>
          <div className="form-group">
              <button className="btn btn-md btn-primary" type="submit">Submit</button>
          </div>
        </form>

        <p className="lead clearfix"></p>
        <p className="lead clearfix"></p>

        <h2>Check Disbursement Status</h2>
        <form onSubmit={this.onSubmitStatus}>
          <div className="row">
            <div className="form-group col-md-5">
              <label>Enter URN:</label>
              <input className="form-control" ref="urn" type="text" required = {true} />
            </div>
          </div>
          <div className="form-group">
            <button className="btn btn-md btn-primary" type="submit">Find Status</button>
          </div>
        </form>

        <p className="lead clearfix"></p>

        {this.showDisbursement()}

      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CloseToa);
