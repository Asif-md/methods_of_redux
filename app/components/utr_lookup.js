/**
 * Created by ashwin.raghavan on 12/01/17.
 */

import React from "react";
import { epochToISO } from 'utils/helpers';
import LoadNormalList from 'components/load_normal_list';

const alertColor = '#FF6666';

class UtrLookup extends React.Component{
  renderData = () => {
    if (Object.keys(this.props.utrLookupResult).length) {
      return this.renderUtrLookupResult();
    }
  }

  renderUtrLookupResult = () => {
    const { utrLookupResult }  = this.props;
    const { bankTransaction, summary } = utrLookupResult;
    const disbursement = bankTransaction.dcMark === "DEBIT" ? utrLookupResult.disbursement : null;
    const invoices = bankTransaction.dcMark === "CREDIT" ? utrLookupResult.invoices : null;

    var alert = true;

    if (bankTransaction && summary)
      alert = bankTransaction.amount !== summary.amount;

    return (
      <div>
        {this.renderBankTransactionDetails(bankTransaction, alert)}
        {this.renderSummary(summary, alert)}
        {this.renderDisbursement(disbursement)}
        {this.renderInvoices(invoices)}
      </div>
    )
  }

  renderBankTransactionDetails = (bankTransaction, alert) => {
    if (bankTransaction) {
      return (
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                Bank Transaction Details
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">UTR No:</label>
                  <span className="details">{bankTransaction.clientReferenceNumber}</span>
                </div>
                <div className="col-md-8">
                  <label className="control-label text-muted">Description:</label>
                  <span className="details">{bankTransaction.description}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Amount:</label>
                  <span className="details"
                        style={{backgroundColor: alert ? alertColor : null}}>{bankTransaction.amount}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Entry Date:</label>
                  <span className="details">{epochToISO(bankTransaction.entryDate)}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Value Date:</label>
                  <span className="details">{bankTransaction.valueDate}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Transaction Type:</label>
                  <span className="details">{bankTransaction.dcMark}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Desc:</label>
                  <span className="details">{bankTransaction.transactionType}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Statement No:</label>
                  <span className="details">{bankTransaction.statementNumber}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      );
    }
    else {
      return null;
    }
  }

  renderSummary = (summary, alert) => {
    if (summary) {
      return(
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                Summary
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label text-muted">Amount:</label>
                  <span className="details" style={{backgroundColor: alert ? alertColor : null}}>{summary.amount}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">Total Payable:</label>
                  <span className="details">{summary.totalPayable}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">Total Receivable:</label>
                  <span className="details">{summary.totalReceivable}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label text-muted">Tax:</label>
                  <span className="details">{summary.tax}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">IGST:</label>
                  <span className="details">{summary.igst}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">SGST:</label>
                  <span className="details">{summary.sgst}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">CGST:</label>
                  <span className="details">{summary.cgst}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label text-muted">Fee:</label>
                  <span className="details">{summary.fee}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">ST:</label>
                  <span className="details">{summary.st}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">SBC:</label>
                  <span className="details">{summary.sbc}</span>
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">KKC:</label>
                  <span className="details">{summary.kkc}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }

    else {
      return null;
    }
  }

  renderDisbursement = (disbursement) => {
    if (disbursement) {
      return (
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
                  <label className="control-label text-muted">From Party:</label>
                  <span className="details">{disbursement.fromParty}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">To Party:</label>
                  <span className="details">{disbursement.toParty}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">To Account No:</label>
                  <span className="details">{disbursement.toAccountNo}</span>
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
                  <label className="control-label text-muted">Ref No:</label>
                  <span className="details">{disbursement.refNo}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Status:</label>
                  <span className="details">{disbursement.status}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Tag:</label>
                  <span className="details">{disbursement.tag}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Created:</label>
                  <span className="details">{epochToISO(disbursement.created)}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Updated:</label>
                  <span className="details">{epochToISO(disbursement.updated)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      )
    }

    else {
      return null;
    }
  }

  renderInvoices = (invoices) => {
    if (invoices) {
      const count = invoices.length;

      const customRows = {
        headers: ["From Party", "To Party", "Invoice No", "Amount", "Status", "Tag"],
        attributes: (record) => {
          return [
            <span data-test-element="fromParty">{record.fromParty}</span>,
            <span data-test-element="toParty">{record.toParty}</span>,
            <span data-test-element="invoiceNo">{record.invoiceNo}</span>,
            <span data-test-element="amount">{record.amount}</span>,
            <span data-test-element="status">{record.status}</span>,
            <span data-test-element="tag">{record.tag}</span>
          ];
        }
      };

      return (
        <LoadNormalList
          ref="load-list"
          {...this.props}
          title="Invoices"
          recordType="invoice"
          data={invoices}
          count={count}
          pageSize={count}
          customRows={customRows}
        />
      );
    }

    else {
      return null;
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

export default UtrLookup;
