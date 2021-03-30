/**
 * Created by ashwin.raghavan on 20/01/17.
 */

import React from "react";
import { epochToISO } from 'utils/helpers';

const Disbursement = (props) => {
  const { disbursement }  = props;
  return (
    <div className="page-container">
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
}

export default Disbursement;
