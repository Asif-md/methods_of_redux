import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import {Link} from "react-router-dom";
import * as routes from "routes";
import { epochToISO } from 'utils/helpers';

class ShowInternalFundTransfer extends React.Component{
  componentDidMount() {
    const { params } = this.props.match;
    params && params.internalFundTransferId && this.props.showInternalFundTransfer(params.internalFundTransferId);
  }

  onApprove = (event) => {
    event.preventDefault();

    const { attemptApprove, internalFundTransfer } = this.props;
    attemptApprove('internalFundTransfer', internalFundTransfer);
  }

  renderInternalFundTransfer = () => {
    const internalFundTransfer = this.props.internalFundTransfer;

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_INTERNAL_FUND_TRANSFERS_PATH} />
                  <a className="btn btn-sm btn-success" href="#" onClick={this.onApprove}>
                    Approve
                  </a>
                </div>
                Internal Fund Transfer Details
                &nbsp;
                <Boolean
                  flag={internalFundTransfer.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">From Account No:</label>
                  <span className="details">{internalFundTransfer.fromAccountNo}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">To Account No:</label>
                  <span className="details">{internalFundTransfer.toAccountNo}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">From IFSC:</label>
                  <span className="details">{internalFundTransfer.fromIfsc}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">To IFSC:</label>
                  <span className="details">{internalFundTransfer.toIfsc}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Payee Name:</label>
                  <span className="details">{internalFundTransfer.payeeName}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Beneficiary Name:</label>
                  <span className="details">{internalFundTransfer.beneficiaryName}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Created By:</label>
                  <span className="details">{internalFundTransfer.createdBy}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Created Date:</label>
                  <span className="details">{epochToISO(internalFundTransfer.createdDate)}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Updated By:</label>
                  <span className="details">{internalFundTransfer.updatedBy}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Updated Date:</label>
                  <span className="details">{epochToISO(internalFundTransfer.updatedDate)}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Approved By:</label>
                  <span className="details">{internalFundTransfer.approvedBy}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Approved Date:</label>
                  <span className="details">{epochToISO(internalFundTransfer.approvedDate)}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Amount:</label>
                  <span className="details">{internalFundTransfer.amount}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Remarks:</label>
                  <span className="details">{internalFundTransfer.remarks}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Ref No:</label>
                  <span className="details">{internalFundTransfer.refNo}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">UTR:</label>
                  <span className="details">{internalFundTransfer.utrCode}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">ID:</label>
                  <span className="details">{internalFundTransfer.id}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Status:</label>
                  <span className="details">{internalFundTransfer.status}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  renderData = () => {
    if (Object.keys(this.props.internalFundTransfer).length) {
      return this.renderInternalFundTransfer();
    } else {
      return (
        <PleaseWait message="Loading" />
      );
    }
  }

  render() {
    return (
      <div className="page-container">
        {this.renderData()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowInternalFundTransfer);
