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

class ShowInterchange extends React.Component {
  componentDidMount() {
    const { params } = this.props.match;
    params &&
      params.interchangeId &&
      this.props.showInterchange(params.interchangeId);
  }

  onApprove = event => {
    event.preventDefault();

    const { attemptApprove, interchange } = this.props;
    attemptApprove("interchange", interchange);
  };

  onActivate = event => {
    event.preventDefault();

    const { attemptActivate, interchange } = this.props;
    attemptActivate("interchange", interchange);
  };

  onDeactivate = event => {
    event.preventDefault();

    const { attemptDeactivate, interchange } = this.props;
    attemptDeactivate("interchange", interchange);
  };

  renderInterchange = () => {
    const interchange = this.props.interchange;

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
                Interchange Details &nbsp;
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={routes.LIST_INTERCHANGES_PATH} />
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
                  flag={interchange.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                <Boolean
                  flag={interchange.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                {interchange.pendingReactivation && (
                  <label className="label label-warning details">
                    Pending Reactivation
                  </label>
                )}
                <Link to={routes.editInterchangePath(interchange.id)}>
                  {" "}
                  Edit{" "}
                </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Interchange Name:
                  </label>{" "}
                  <br />
                  <span className="view-details">{interchange.name}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.name}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Interchange ID:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {interchange.interchangeId}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.interchangeId}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">PAN:</label>{" "}
                  <br />
                  <span className="view-details">{interchange.pan}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.pan}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Service Tax No:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {interchange.serviceTaxNo}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.serviceTaxNo}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">TIN:</label>{" "}
                  <br />
                  <span className="view-details">{interchange.tin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.tin}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">CIN:</label>{" "}
                  <br />
                  <span className="view-details">{interchange.cin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.cin}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">GSTIN:</label>{" "}
                  <br />
                  <span className="view-details">{interchange.gstin}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.gstin}
                  </Typography> */}
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    GST State Code:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {interchange.gstStateCode}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.gstStateCode}
                  </Typography> */}
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Account No:
                  </label>{" "}
                  <br />
                  <span className="view-details">{interchange.accountNo}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.accountNo}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Account Type:
                  </label>{" "}
                  <br />
                  <span className="view-details">
                    {interchange.accountType}
                  </span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.accountType}
                  </Typography> */}
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">IFSC:</label>{" "}
                  <br />
                  <span className="view-details">{interchange.ifsc}</span>
                  {/* <Typography variant="subheading" gutterBottom>
                    {interchange.ifsc}
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
    if (Object.keys(this.props.interchange).length) {
      return this.renderInterchange();
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
)(ShowInterchange);
