import React from 'react';
import { epochToISO } from 'utils/helpers';

/**
 * @author ashwin.raghavan
 */

class TransactionStatus extends React.Component{

  renderTransactionStatus = () => {
    const transactionStatus = this.props.transaction;

    return (
      <div>

        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                Transaction Details
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Transaction ID:</label>
                  <span className="details">{transactionStatus.transactionDetails.transactionId}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">External Transaction ID:</label>
                  <span className="details">{transactionStatus.transactionDetails.externalTransactionId}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Payment ID:</label>
                  <span className="details">{transactionStatus.transactionDetails.paymentId}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Transaction Date:</label>
                  <span className="details">{epochToISO(transactionStatus.transactionDetails.transactionDate)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {transactionStatus.entries.map(function (entry) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Entry
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-3">
                        <label className="control-label text-muted">From Party:</label>
                        <span className="details">{entry.fromParty}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">From Party Type:</label>
                        <span className="details">{entry.fromPartyType}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">To Party:</label>
                        <span className="details">{entry.toParty}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">To Party Type:</label>
                        <span className="details">{entry.toPartyType}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-3">
                        <label className="control-label text-muted">Transaction Type:</label>
                        <span className="details">{entry.transactionType}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">Entry Type:</label>
                        <span className="details">{entry.entryType}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">Entry For:</label>
                        <span className="details">{entry.entryFor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-3">
                        <label className="control-label text-muted">Status:</label>
                        <span className="details">{entry.status}</span>
                      </div>
                      <div className="col-md-3">
                        <label className="control-label text-muted">Amount:</label>
                        <span className="details">{entry.amount}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }

        {transactionStatus.settlements.map(function (settlement) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Settlement
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Type:</label>
                        <span className="details">{settlement.type}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Tag:</label>
                        <span className="details">{settlement.tag}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Status:</label>
                        <span className="details">{settlement.status}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Updated:</label>
                        <span className="details">{epochToISO(settlement.updated)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }

        {transactionStatus.disbursements.map(function (disbursement) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Disbursement
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Tag:</label>
                        <span className="details">{disbursement.tag}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Mode:</label>
                        <span className="details">{disbursement.mode}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Channel:</label>
                        <span className="details">{disbursement.channel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Amount:</label>
                        <span className="details">{disbursement.amount}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">UTR:</label>
                        <span className="details">{disbursement.utrCode}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Ref No:</label>
                        <span className="details">{disbursement.refNo}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Status:</label>
                        <span className="details">{disbursement.status}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Fail Reason:</label>
                        <span className="details">{disbursement.failReason}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Date:</label>
                        <span className="details">{epochToISO(disbursement.updated)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }

        {transactionStatus.fundTransferStatusResponses.map(function (fundTransferStatusResponse) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Fund Transfer Status Response
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">UTR:</label>
                        <span
                          className="details">{fundTransferStatusResponse.bankReferenceNumber}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Token:</label>
                        <span className="details">{fundTransferStatusResponse.token}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Transfer Channel:</label>
                        <span className="details">{fundTransferStatusResponse.transferChannel}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Transfer Status Code:</label>
                        <span className="details">{fundTransferStatusResponse.transferStatusCode}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Sub Status Code:</label>
                        <span className="details">{fundTransferStatusResponse.subStatusCode}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Failure Reason:</label>
                        <span className="details">{fundTransferStatusResponse.failureMessage}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">External Reference ID 1:</label>
                        <span className="details">{fundTransferStatusResponse.externalReferenceId1}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">External Reference ID 2:</label>
                        <span className="details">{fundTransferStatusResponse.externalReferenceId2}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }

        {transactionStatus.invoices.map(function (invoice) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Invoice
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Tag:</label>
                        <span className="details">{invoice.tag}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Invoice No:</label>
                        <span className="details">{invoice.invoiceNo}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Amount:</label>
                        <span className="details">{invoice.amount}</span>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Status:</label>
                        <span className="details">{invoice.status}</span>
                      </div>
                      <div className="col-md-4">
                        <label className="control-label text-muted">Updated:</label>
                        <span className="details">{epochToISO(invoice.updated)}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })
        }

        {transactionStatus.paymentStatus.map(function (payment) {
          return (
            <div>
              <p className="lead clearfix"></p>

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend data-toggle="collapse">
                      Payment Status
                    </legend>
                  </fieldset>

                  <div className="form-group">
                    <div className="row">
                      {payment.paidFromType.map(function (type) {
                        return(
                          <div className="col-md-3">
                            <label className="control-label text-muted">Type:</label>
                            <span className="details">{type}</span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      {payment.paidFromAmount.map(function (amount) {
                        return(
                          <div className="col-md-3">
                            <label className="control-label text-muted">Amount:</label>
                            <span className="details">{amount}</span>
                          </div>
                        )
                      })
                      }
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="row">
                      <div className="col-md-4">
                        <label className="control-label text-muted">Payment State:</label>
                        <span className="details">{payment.paymentState}</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )
        })
        }

      </div>
    );
  }

  renderData = () => {
    if (Object.keys(this.props.transaction).length) {
      return this.renderTransactionStatus();
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

export default TransactionStatus;

