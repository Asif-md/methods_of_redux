import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import { Link } from "react-router-dom";
import * as routes from "routes";

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

class ShowAccount extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    params && params.accountId && this.props.showAccount(params.accountId);
  }

  onApprove = event => {
    event.preventDefault();

    const { attemptApprove, account } = this.props;
    attemptApprove("account", account);
  };

  onActivate = event => {
    event.preventDefault();
    const { attemptActivate, account } = this.props;
    attemptActivate("account", account);
  };

  onDeactivate = event => {
    event.preventDefault();

    const { attemptDeactivate, account } = this.props;
    attemptDeactivate("account", account);
  };

  renderAccount = () => {
    const account = this.props.account;

    return (
      <div>
        <div style={{ backgroundColor: "#eeeeee" }}>
          <AppBar
            position="static"
            color="primary"
            style={{ height: "50px", textAnchor: "inherit" }}
          >
            <Typography
              style={{ marginTop: "10px" }}
              variant="title"
              color="inherit"
            >
              <small
                style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}
              >
                Account Details &nbsp;
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_ACCOUNTS_PATH} />
                  <a
                    className="btn btn-sm btn-success"
                    href="#"
                    onClick={this.onApprove}
                  >
                    Approve
                  </a>
                  <a
                    className="btn btn-sm btn-primary"
                    href="#"
                    onClick={this.onActivate}
                  >
                    Activate
                  </a>
                  <a
                    className="btn btn-sm btn-danger"
                    href="#"
                    onClick={this.onDeactivate}
                  >
                    De-activate
                  </a>
                </div>

                <Boolean
                  flag={account.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                <Boolean
                  flag={account.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                {account.pendingReactivation && (
                  <label className="label label-warning details">
                    Pending Reactivation
                  </label>
                )}
                <Link to={routes.editAccountPath(account.id)}> Edit </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Account Name:
                  </label>{" "}
                  <br />
                  <span className="view-details">{account.name}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {account.name}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Account Number:
                  </label>{" "}
                  <br />
                  <span className="view-details">{account.accountNo}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {account.accountNo}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Account Type:
                  </label>{" "}
                  <br />
                  <span className="view-details">{account.accountType}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {account.accountType}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">IFSC:</label>{" "}
                  <br />
                  <span className="view-details">{account.ifsc}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {account.ifsc}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderData = () => {
    if (Object.keys(this.props.account).length) {
      return this.renderAccount();
    } else {
      return <PleaseWait message="Loading" />;
    }
  };

  render() {
    return <div className="page-container">{this.renderData()}</div>;
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowAccount);
