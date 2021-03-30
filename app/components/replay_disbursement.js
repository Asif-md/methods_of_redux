/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import React from 'react';
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { epochToISO } from 'utils/helpers';
import Disbursement from 'components/show_disbursement';

class ReplayDisbursement extends React.Component{

  componentDidMount() {
    this.props.clearTransactionalMessages();
    this.props.clearState();
  }

  onSubmitMerchant = (event) => {
    this.props.clearTransactionalMessages();
    event.preventDefault();

    const merchantUrn  = this.refs.merchantUrn.value;
    this.props.replayDisbursement('merchant', merchantUrn);
  }

  onSubmitCustomer = (event) => {
    this.props.clearTransactionalMessages();
    event.preventDefault();

    const customerUrn  = this.refs.customerUrn.value;
    this.props.replayDisbursement('customer', customerUrn);
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
    const disbursement = this.props;

    return (
      <div className="page-container">

        <div className="row">
          <div className="col-md-6">
            <form onSubmit={this.onSubmitMerchant}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-10">
                    <label>Enter URN (Merchant) :</label>
                    <input className="form-control" ref="merchantUrn" type="text" required = {true} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-md btn-primary" type="submit">Replay</button>
              </div>
            </form>
          </div>

          <div className="col-md-6">
            <form onSubmit={this.onSubmitCustomer}>
              <div className="form-group">
                <div className="row">
                  <div className="col-md-10">
                    <label>Enter URN (Customer) :</label>
                    <input className="form-control" ref="customerUrn" type="text" required = {true} />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <button className="btn btn-md btn-primary" type="submit">Replay</button>
              </div>
            </form>
          </div>
        </div>

        <p className="lead clearfix"></p>

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

export default connect(mapStateToProps, mapDispatchToProps)(ReplayDisbursement);
