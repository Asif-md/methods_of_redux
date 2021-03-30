import React, { Component } from 'react'
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import { Link } from "react-router-dom";
import * as routes from "routes";
import { epochToISO } from "utils/helpers";


import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";

class ShowTaxRule extends Component {

    componentDidMount() {
        const { params } = this.props.match;

        params &&
            params.taxRuleId &&
            this.props.showTaxRule(params.taxRuleId);
    }

    onApprove = event => {
        event.preventDefault();

        const { attemptApprove, taxRule } = this.props;


        attemptApprove("rules/tax", taxRule);
    };

    onActivate = event => {
        event.preventDefault();

        const { attemptActivate, taxRule } = this.props;
        attemptActivate("rules/tax", taxRule);
    };

    onDeactivate = event => {
        event.preventDefault();

        const { attemptDeactivate, taxRule } = this.props;
        attemptDeactivate("rules/tax", taxRule);
    };

    renderInterchange = () => {
        const taxRule = this.props.taxRule;

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
                                Show Tax Rule Details &nbsp;
              </small>
                        </Typography>
                    </AppBar>
                    <div className="panel-body">
                        <fieldset>
                            <legend data-toggle="collapse">
                                <div className="btn-toolbar pull-right">
                                    <BackLink to={routes.LIST_TAX_RULES_PATH} />
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
                                    flag={taxRule.approved}
                                    trueText="Approved"
                                    falseText="Un-Approved"
                                    trueStatus="label-success details"
                                    falseStatus="label-danger details"
                                />
                                <Boolean
                                    flag={taxRule.active}
                                    trueText="Activated"
                                    falseText="De-activated"
                                    trueStatus="label-success details"
                                    falseStatus="label-danger details"
                                />
                                {taxRule.pendingReactivation && (
                                    <label className="label label-warning details">
                                        Pending Reactivation
                                    </label>
                                )}
                                <Link to={routes.editTaxRulePath(taxRule.id)}>
                                    {" "}
                                    Edit{" "}
                                </Link>
                            </legend>
                        </fieldset>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Tax Rule Name:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">{taxRule.name}</span>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">Active:</label>{" "}
                                    <br />
                                    <Typography variant="subheading" gutterBottom>
                                        <Boolean flag={taxRule.active} />
                                    </Typography>
                                </div>
                                {/* <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Tax Rule ID:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.name}
                                    </span>
                                </div> */}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">Transaction Type:</label>{" "}
                                    <br />
                                    <span className="view-details">{taxRule.transactionType}</span>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                    Entry For:    
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.entryFor}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">HSN Code:</label>{" "}
                                    <br />
                                    <span className="view-details">{taxRule.hsn}</span>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">SAC Code:</label>{" "}
                                    <br />
                                    <span className="view-details">{taxRule.sac}</span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">

                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        To Party Type:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.toPartyType}
                                    </span>
                                </div>

                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        To Party:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.toPartyId}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Effective From:
                                    </label>
                                    <Typography variant="subheading" gutterBottom>
                                        {epochToISO(taxRule.effectiveFrom)}
                                    </Typography>
                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Effective To:
                                    </label>
                                    <Typography variant="subheading" gutterBottom>
                                        {epochToISO(taxRule.effectiveTo)}
                                    </Typography>
                                </div>
                            </div>
                        </div>


                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">Approved:</label>{" "}
                                    <br />
                                    <Typography variant="subheading" gutterBottom>
                                        <Boolean flag={taxRule.approved} />
                                    </Typography>

                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Created By:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.createdBy}
                                    </span>

                                </div>

                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted">Pending Reactivation:</label>{" "}
                                    <br />
                                    <Typography variant="subheading" gutterBottom>
                                        <Boolean flag={taxRule.pendingReactivation} />
                                    </Typography>

                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Updated By:
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.updatedBy}
                                    </span>

                                </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted"> Approved By:</label>{" "}
                                    <br />
                                    <span className="view-details">
                                        {taxRule.approvedBy}
                                    </span>

                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Created :
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">

                                        {epochToISO(taxRule.created)}
                                    </span>

                                </div>

                            </div>
                        </div>

                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label className="control-label text-muted"> Approved Date:</label>{" "}
                                    <br />
                                    <span className="view-details">

                                        {taxRule.approvedDate ? epochToISO(taxRule.approvedDate) : "--"}
                                    </span>

                                </div>
                                <div className="col-md-6">
                                    <label className="control-label text-muted">
                                        Updated :
                                    </label>{" "}
                                    <br />
                                    <span className="view-details">

                                        {epochToISO(taxRule.updated)}
                                    </span>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    renderData = () => {
        if (Object.keys(this.props.taxRule).length) {
            return this.renderInterchange();
        } else {
            return <PleaseWait message="Loading" />;
        }
    };

    render() {
        return <div className="page-container">{this.renderData()}</div>;
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowTaxRule);




// import React from "react";
// import { connect } from "react-redux";
// import { mapStateToProps, mapDispatchToProps } from "stateToProps";
// import Boolean from "components/boolean";
// import PleaseWait from "components/please_wait";
// import BackLink from "components/back_link";
// import { Link } from "react-router-dom";
// import * as routes from "routes";

// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import AppBar from "@material-ui/core/AppBar";

// class ShowInterchange extends React.Component {
//   componentDidMount() {
//     const { params } = this.props.match;
//     params &&
//       params.interchangeId &&
//       this.props.showInterchange(params.interchangeId);
//   }

//   onApprove = event => {
//     event.preventDefault();

//     const { attemptApprove, interchange } = this.props;
//     attemptApprove("interchange", interchange);
//   };

//   onActivate = event => {
//     event.preventDefault();

//     const { attemptActivate, interchange } = this.props;
//     attemptActivate("interchange", interchange);
//   };

//   onDeactivate = event => {
//     event.preventDefault();

//     const { attemptDeactivate, interchange } = this.props;
//     attemptDeactivate("interchange", interchange);
//   };

//   renderInterchange = () => {
//     const interchange = this.props.interchange;

//     return (
//       <div>
//         <div className="" style={{ backgroundColor: "#eeeeee" }}>
//           <AppBar
//             position="static"
//             color="primary"
//             style={{ height: "50px", textAnchor: "inherit" }}
//           >
//             <Typography
//               style={{ marginTop: "10px" }}
//               variant="title"
//               color="inherit"
//             >
//               <small
//                 style={{ color: "#fff", marginLeft: "30px", marginTop: "30px" }}
//               >
//                 Interchange Details &nbsp;
//               </small>
//             </Typography>
//           </AppBar>
//           <div className="panel-body">
//             <fieldset>
//               <legend data-toggle="collapse">
//                 <div className="btn-toolbar pull-right">
//                   <BackLink to={routes.LIST_INTERCHANGES_PATH} />
//                   <a
//                     className="btn btn-sm btn-success"
//                     href="#"
//                     onClick={this.onApprove}
//                   >
//                     Approve
//                   </a>
//                   <a
//                     className="btn btn-sm btn-primary"
//                     href="#"
//                     onClick={this.onActivate}
//                   >
//                     Activate
//                   </a>
//                   <a
//                     className="btn btn-sm btn-danger"
//                     href="#"
//                     onClick={this.onDeactivate}
//                   >
//                     De-activate
//                   </a>
//                 </div>

//                 <Boolean
//                   flag={interchange.approved}
//                   trueText="Approved"
//                   falseText="Un-Approved"
//                   trueStatus="label-success details"
//                   falseStatus="label-danger details"
//                 />
//                 <Boolean
//                   flag={interchange.active}
//                   trueText="Activated"
//                   falseText="De-activated"
//                   trueStatus="label-success details"
//                   falseStatus="label-danger details"
//                 />
//                 {interchange.pendingReactivation && (
//                   <label className="label label-warning details">
//                     Pending Reactivation
//                   </label>
//                 )}
//                 <Link to={routes.editInterchangePath(interchange.id)}>
//                   {" "}
//                   Edit{" "}
//                 </Link>
//               </legend>
//             </fieldset>

//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">
//                     Interchange Name:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.name}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.name}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">
//                     Interchange ID:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">
//                     {interchange.interchangeId}
//                   </span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.interchangeId}
//                   </Typography> */}
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">PAN:</label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.pan}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.pan}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">
//                     Service Tax No:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">
//                     {interchange.serviceTaxNo}
//                   </span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.serviceTaxNo}
//                   </Typography> */}
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">TIN:</label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.tin}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.tin}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">CIN:</label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.cin}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.cin}
//                   </Typography> */}
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">GSTIN:</label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.gstin}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.gstin}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-6">
//                   <label className="control-label text-muted">
//                     GST State Code:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">
//                     {interchange.gstStateCode}
//                   </span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.gstStateCode}
//                   </Typography> */}
//                 </div>
//               </div>
//             </div>

//             <div className="form-group">
//               <div className="row">
//                 <div className="col-md-4">
//                   <label className="control-label text-muted">
//                     Account No:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.accountNo}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.accountNo}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-4">
//                   <label className="control-label text-muted">
//                     Account Type:
//                   </label>{" "}
//                   <br />
//                   <span className="view-details">
//                     {interchange.accountType}
//                   </span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.accountType}
//                   </Typography> */}
//                 </div>
//                 <div className="col-md-4">
//                   <label className="control-label text-muted">IFSC:</label>{" "}
//                   <br />
//                   <span className="view-details">{interchange.ifsc}</span>
//                   {/* <Typography variant="subheading" gutterBottom>
//                     {interchange.ifsc}
//                   </Typography> */}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   };

//   renderData = () => {
//     if (Object.keys(this.props.interchange).length) {
//       return this.renderInterchange();
//     } else {
//       return <PleaseWait message="Loading" />;
//     }
//   };

//   render() {
//     return <div className="page-container">{this.renderData()}</div>;
//   }
// }

// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(ShowInterchange);
