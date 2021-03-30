import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Boolean from "components/boolean";
import BackLink from "components/back_link";
import PleaseWait from "components/please_wait";
import {Link} from "react-router-dom";
import * as routes from "routes";
import { isoToDateString } from "utils/helpers";

class ShowPgMId extends React.Component{
  componentDidMount() {
    const { params } = this.props.match;
    params && params.pgMId && this.props.showPgMId(params.pgMId);
  }

  onApprove = (event) => {
    event.preventDefault();

    const { attemptApprove, pgMId } = this.props;
    attemptApprove('pgMId', pgMId);
  }

  onActivate = (event) => {
    event.preventDefault();

    const { attemptActivate, pgMId } = this.props;
    attemptActivate('pgMId', pgMId);
  }

  onDeactivate = (event) => {
    event.preventDefault();
    const { attemptDeactivate, pgMId } = this.props;
    attemptDeactivate('pgMId', pgMId);
  }

  renderPgMId = () => {
    const pgMId = this.props.pgMId;

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_PG_MID_PATH} />
                  <a className="btn btn-sm btn-success" href="#" onClick={this.onApprove}>
                    Approve
                  </a>
                  <a className="btn btn-sm btn-primary" href="#" onClick={this.onActivate}>
                    Activate
                  </a>
                  <a className="btn btn-sm btn-danger" href="#" onClick={this.onDeactivate}>
                    De-activate
                  </a>
                </div>
                MID Details
                &nbsp;
                <Boolean
                  flag={pgMId.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
                <Boolean
                  flag={pgMId.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
                <Link to={routes.editPgMIdPath(pgMId.id)}> Edit </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">MID:</label>
                  <span className="details">{pgMId.mid}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Merchant Name:</label>
                  <span className="details">{pgMId.merchantName}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Linked Rate Card:</label>
                  <span className="details">{pgMId.rateCardId}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Effective From:</label>
                  <span className="details">{isoToDateString(pgMId.effectiveFrom)}</span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Effective To:</label>
                  <span className="details">{isoToDateString(pgMId.effectiveTo)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }

  renderData = () => {
    if (Object.keys(this.props.pgMId).length) {
      return this.renderPgMId();
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowPgMId);
