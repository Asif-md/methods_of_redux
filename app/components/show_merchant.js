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

class ShowMerchant extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    params && params.merchantId && this.props.showMerchant(params.merchantId);
  }

  onVerifyAddress = event => {
    event.preventDefault();

    const { attemptVerifyAddress, merchant } = this.props;
    attemptVerifyAddress(merchant);
  };

  onApprove = event => {
    event.preventDefault();

    const { attemptApprove, merchant } = this.props;
    attemptApprove("merchant", merchant);
  };

  onActivate = event => {
    event.preventDefault();

    const { attemptActivate, merchant } = this.props;
    attemptActivate("merchant", merchant);
  };

  onDeactivate = event => {
    event.preventDefault();

    const { attemptDeactivate, merchant } = this.props;
    attemptDeactivate("merchant", merchant);
  };

  renderMerchant = () => {
    const merchant = this.props.merchant;
    return (
      <div>
        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                Merchant Details
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_MERCHANTS_PATH} />
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
                  flag={merchant.address.verified}
                  trueText="Address Verified"
                  falseText="Verification Pending"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                <Boolean
                  flag={merchant.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                <Boolean
                  flag={merchant.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                {merchant.pendingReactivation && (
                  <label className="label label-warning details">
                    Pending Reactivation
                  </label>
                )}
                <Link to={routes.editMerchantPath(merchant.id)}> Edit </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Merchant Name:
                  </label>
                  <br />

                  <span className="view-details">{merchant.name}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.name}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Merchant ID:
                  </label>
                  <br />
                  <span className="view-details">{merchant.merchantId}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.merchantId}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label text-muted">PAN Card:</label>
                  <br />
                  <span className="view-details">{merchant.pan}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.pan}
                  </Typography> */}
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">
                    Service Tax Number:
                  </label>
                  <br />
                  <span className="view-details">{merchant.serviceTaxNo}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.serviceTaxNo}
                  </Typography> */}
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">
                    TIN Number:
                  </label>
                  <br />
                  <span className="view-details">{merchant.tin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.tin}
                  </Typography> */}
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">
                    CIN Number:
                  </label>
                  <br />
                  <span className="view-details">{merchant.cin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.cin}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label text-muted">GSTIN:</label>
                  <br />
                  <span className="view-details">{merchant.gstin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.gstin}
                  </Typography> */}
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">
                    GST State Code:
                  </label>
                  <br />
                  <span className="view-details">{merchant.gstStateCode}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.gstStateCode}
                  </Typography> */}
                </div>
                <div className="col-md-3">
                  <label className="control-label text-muted">
                    B2C:
                  </label>
                  <br />
                  <Boolean
                  flag={merchant.b2c}
                  trueText="true"
                  falseText="false"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                  <br />
                  <span className="view-details">{merchant.b2c}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.gstStateCode}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="lead clearfix" />

        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                Contact Info:
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Phone Number:
                  </label>
                  <br />
                  <span className="view-details">{merchant.phone}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.phone}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Email ID:</label>
                  <br />
                  <span className="view-details">{merchant.email}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.email}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="lead clearfix" />

        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                Account Info:
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">Account Info:</legend>
            </fieldset>
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Account Number:
                  </label>
                  <br />
                  <span className="view-details">{merchant.accountNo}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.accountNo}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Account Type:
                  </label>{" "}
                  <br />
                  <span className="view-details">{merchant.accountType}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.accountType}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">IFSC Code:</label>
                  <br />
                  <span className="view-details">{merchant.ifsc}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ifsc}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="lead clearfix" />

        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                Address Info: &nbsp;
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <a
                  className="pull-right btn btn-success"
                  href="#"
                  onClick={this.onVerifyAddress}
                >
                  Verify Address
                </a>

                <Boolean
                  flag={merchant.address.verified}
                  trueText="Address Verified"
                  falseText="Verification Pending"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Building:</label>
                  <br />
                  <span className="view-details">
                    {merchant.address.building}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.building}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Street:</label>
                  <br />
                  <span className="view-details">
                    {merchant.address.street}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.street}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Area:</label>
                  <br />
                  <span className="view-details">{merchant.address.area}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.area}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Locality:</label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.address.locality}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.locality}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">City:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.address.city}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.city}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">State:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.address.state}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.state}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Country:</label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.address.country}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.country}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Postal:</label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.address.postalCode}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.address.postalCode}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="lead clearfix" />

        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                FTP Details:
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Server Address:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.ftpServerAddress}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpServerAddress}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Port:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.ftpPort}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpPort}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Transfer Protocol:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.ftpTransferProtocol}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpTransferProtocol}
                  </Typography> */}
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Output Directory:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.ftpOutputDirectory}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpOutputDirectory}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Username:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.ftpUsername}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpUsername}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Password:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.ftpPassword}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {merchant.ftpPassword}
                  </Typography> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="" style={{ backgroundColor: "#eeeeee" }}>
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
                Report Templates:
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                  Settlement Report Template ID:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {merchant.settlementTemplateId}
                  </span>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Invoice Report Template ID:</label>{" "}
                  <br />
                  <span className="view-details">{merchant.invoiceTemplateId}</span>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderData = () => {
    if (Object.keys(this.props.merchant).length) {
      return this.renderMerchant();
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
)(ShowMerchant);
