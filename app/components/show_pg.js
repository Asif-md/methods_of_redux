import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import {Link} from "react-router-dom";
import * as routes from "routes";

class ShowPG extends React.Component{
  componentDidMount() {
    const { params } = this.props.match;
    params && params.accountId && this.props.showAccount(params.accountId);
  }

  onApprove = (event) => {
    event.preventDefault();
    const { attemptApprove, account } = this.props;
    attemptApprove('account', account);
  }

  onActivate = (event) => {
    event.preventDefault();
    const { attemptActivate, account } = this.props;
    attemptActivate('account', account);
  }

  onDeactivate = (event) => {
    event.preventDefault();
    const { attemptDeactivate, account } = this.props;
    attemptDeactivate('account', account);
  }

  renderAccount = () => {
    const account = this.props.account;

    return (
      <div>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_ACCOUNTS_PATH} />
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
                Account Details
                &nbsp;
                <Boolean
                  flag={account.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
                <Boolean
                  flag={account.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
                <Link to={routes.editAccountPath(account.id)}> Edit </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Account Name:</label>
                  <span className="details">{account.name}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">Account Number:</label>
                  <span className="details">{account.accountNo}</span>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Account Type:</label>
                  <span className="details">{account.accountType}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">IFSC:</label>
                  <span className="details">{account.ifsc}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  renderData = () => {
    if (Object.keys(this.props.account).length) {
      return this.renderAccount();
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

export default connect(mapStateToProps, mapDispatchToProps)(ShowPG);
