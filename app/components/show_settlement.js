/**
 * @author ashwin.raghavan
 */
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import * as routes from "routes";
import { LIST_SETTLEMENTS_PATH } from "routes";
import { epochToISO } from "utils/helpers";
import apiFetch from "../utils/api_fetch"

import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AppBar from "@material-ui/core/AppBar";
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider, TimePicker } from 'material-ui-pickers';
import { object } from "prop-types";

class ShowSettlement extends React.Component {

  constructor() {
    super();
    this.state = {
      invoiceState: {},
      disbursementState: {},
      settlementRuleList:'',
    }
  }

  componentDidMount() {
    const { params, settlementId } = this.props.match;
    params &&
      params.settlementId &&
      this.props.showSettlement(params.settlementId);
    setTimeout(() => this.getData(), 2000)
  }

  onApprove = event => {
    event.preventDefault();

    const { attemptApprove, settlementRule } = this.props;
    attemptApprove("settlement", settlementRule);


    setTimeout(() => this.getData(), 1000)

  };

  // handleDateChange = (id,date) => {
  //   let scheduledTime = new Date();
  //   let newArray = this.props.showScheduleType.map((obj, idx) => {
  //     if (id == idx) {
     
  //   let value = date
  //   let time = value.toLocaleTimeString()
  //   let newDate = time.split(":")
  //   let hour = newDate[0]
  //   let minutes = newDate[1]
  //   obj.scheduleFormat.scheduledHours = hour;
  //   obj.scheduleFormat.scheduledMinutes = minutes; 
  //   scheduledTime.setHours(hour);
  //   scheduledTime.setMinutes(minutes)
  //   obj.scheduleTime= scheduledTime;
  //     }       
  //     return obj;
  //   });
  //   this.setState({ schedulingRuleRequests: newArray });
    
  // };

  getData = () => {
    let url = "v1/rules/invoice/lookup"
    let url2 = "v1/rules/disbursement/lookup"

    const { settlementRule } = this.props

    const lookup = {
      settlementTag: settlementRule.settlementTag,
      fromParty: settlementRule.fromParty,
      fromPartyType: settlementRule.fromPartyType,
      toParty: settlementRule.toParty,
      toPartyType: settlementRule.toPartyType
    };

    apiFetch.post(url, lookup).then(res => {
      if (res !== null) {
        this.setState({
          invoiceState: res
        })
      } else {
        this.setState({
          invoiceState: null
        })
      }
    })

    apiFetch.post(url2, lookup).then(res => {
      if (res !== null) {
        this.setState({
          disbursementState: res
        })
      } else {
        this.setState({
          disbursementState: null
        })
      }
    })

  }


  onActivate = event => {
    event.preventDefault();

    const { attemptActivate, settlementRule } = this.props;
    attemptActivate("settlement", settlementRule);

    setTimeout(() => this.getData(), 1000)
  };

  onDeactivate = event => {
    event.preventDefault();

    const { attemptDeactivate, settlementRule } = this.props;
    attemptDeactivate("settlement", settlementRule);
    setTimeout(() => this.getData(), 1000)
  };



  renderSettlement = () => {

    const { settlementRule, invoice, disbursement, onDemand, showScheduleType } = this.props;
    const { invoiceState, disbursementState } = this.state;
    let greyOutColorStyle; 

    
   if(settlementRule && settlementRule.schedulingType !== undefined){
    if((settlementRule && settlementRule.schedulingType === "MULTIPLE")|| (settlementRule && settlementRule.schedulingType === "COMPOSITE")){
     greyOutColorStyle='#d3d3d3';
    }
    else {
      greyOutColorStyle='#000000';
     }
   } 
  

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
                Settlement Rule Details
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse">
                <div className="btn-toolbar pull-right">
                  <BackLink to={LIST_SETTLEMENTS_PATH} />
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
                  flag={settlementRule.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                <Boolean
                  flag={settlementRule.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
                {settlementRule.pendingReactivation && (
                  <label className="label label-warning details">
                    Pending Reactivation
                  </label>
                )}
                <Link to={routes.editSettlementPath(settlementRule.id)}>
                  Edit
                </Link>
              </legend>
            </fieldset>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Settlement Name:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.name}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Settlement ID:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.id}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Settlement Tag:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.settlementTag}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Transaction Type:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.transactionType}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">Entry For:</label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.entryFor}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Event Type:
                  </label>
                  <Typography style={{ wordBreak: "break-word" }} variant="subheading" gutterBottom>
                    {settlementRule.eventType
                      ? settlementRule.eventType.split(",").join(",")
                      : "--"}
                  </Typography>
                </div>
              </div>
            </div>


            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Workflow Type:
                  </label>
                  <span className="details">{settlementRule.workflowType}</span>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Invoice Generation Threshold ( paise ):
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.invoiceGenerationThreshold}
                  </Typography>
                </div>

              </div>
            </div>
            <div className="form-group">
              <div className="row">

                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Scheduling Type :
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.schedulingType ? settlementRule.schedulingType : "--"}
                  </Typography>
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
                Parties Involved
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    From Party:
                  </label>

                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.fromPartyName} -{" "}
                    {settlementRule.fromPartyShortName}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    From Party Type:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.fromPartyType}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">To Party:</label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.toPartyName} -{" "}
                    {settlementRule.toPartyShortName}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    To Party Type:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {settlementRule.toPartyType}
                  </Typography>
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
                Details
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">Net Off:</label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.netOff} />
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Auto Process:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.autoDispersal} />
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Aggregate Settlement:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.aggregateSettlement} />
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Disable on Weekend:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.disableOnWeekend} />
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Disable on Holidays:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.disableOnHolidays} />
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Record Sales Register Entries:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.salesRegisterRecords} />
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Time Window:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={settlementRule.timeWindow} />
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Settlement Window:
                  </label>
                  <Typography variant="subheading" gutterBottom style={{color:greyOutColorStyle}}>
                    {settlementRule.settlementWindowLength}{" "}
                    {settlementRule.settlementWindowUnit}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Windows End Time:
                  </label>
                  <Typography variant="subheading" gutterBottom style={{color:greyOutColorStyle}}>
                    {settlementRule.windowEndTime}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Schedule Start Time:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {epochToISO(settlementRule.scheduleStartTime)}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Frequency:</label>
                  <Typography variant="subheading" gutterBottom style={{color:greyOutColorStyle}} >
                    {settlementRule.frequency} {settlementRule.frequencyUnit}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Effective From:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {epochToISO(settlementRule.effectiveFrom)}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Effective To:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {epochToISO(settlementRule.effectiveTo)}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="lead clearfix" />
        {
          onDemand ? this.renderOnDemand(onDemand) : ""
        }

        <p className="lead clearfix" />
        {this.renderSchedulingType(showScheduleType)}


        <p className="lead clearfix" />
        {this.renderInvoice(invoice, invoiceState)}

        <p className="lead clearfix" />
        {this.renderDisbursement(disbursement, disbursementState)}
      </div>
    );
  };

  renderSchedulingType = (showScheduleType) => {

    let data = showScheduleType ? Array.from(showScheduleType) : []
    return <div>
      {data.map((scheduleRule, index) => {

        return (<div style={{ backgroundColor: "#eeeeee" }}>
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
                Scheduling Rule ID : {scheduleRule.id}
              </small>
            </Typography>
          </AppBar>

          <div className="panel-body" >
            <div className="form-group">
              <div className="row">
                <Typography style={{ marginLeft: 15 }} variant="h6" gutterBottom>
                Scheduling Rule:
                  </Typography>

                <div className="col-md-4">
                  <label className="control-label text-muted">Unit:</label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.scheduleFormat.schedulingRuleUnit}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Scheduled Time:
                    </label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.scheduleFormat.scheduledHours+":"+scheduleRule.scheduleFormat.scheduledMinutes}
                  </Typography>
                </div>

                <div className="col-md-4">
                  {/* <MuiPickersUtilsProvider utils={DateFnsUtils} >
                    <TimePicker
                    margin="normal"
                    label="Scheduled Time:"
                    value={scheduleRule.scheduleTime}
                    ampm={false}
                   
                      />
                  </MuiPickersUtilsProvider> */}
                  
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Active:
                    </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={scheduleRule.active} />

                  </Typography>
                </div>
              </div>
            </div>
            <div className="form-group">
              <div className="row">
                
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Frequency:
                    </label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.scheduleFormat.frequency}
                  </Typography>
                </div>
                {
                  scheduleRule.scheduleFormat.schedulingRuleUnit === "WEEKS" ? <div className="col-md-4">
                    <label className="control-label text-muted">
                      dayOfWeek:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {scheduleRule.scheduleFormat.dayOfWeek}
                    </Typography>
                  </div> : ""
                }

                {
                  scheduleRule.scheduleFormat.schedulingRuleUnit === "MONTHS" ? <div className="col-md-4">
                    <label className="control-label text-muted">
                      dayOfMonth:
                    </label>
                    <Typography variant="subheading" gutterBottom>
                      {scheduleRule.scheduleFormat.dayOfMonth}
                    </Typography>
                  </div> : ""
                }
              </div>
            </div>

            <br />
            <Typography variant="h6" gutterBottom>
              Transaction Window :
            </Typography>


            <div className="form-group">
              <div className="row">
                <div className="col-md-4">
                  <label className="control-label text-muted">
                    Unit:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.settlementWindow.schedulingRuleUnit}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">Window Length:</label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.settlementWindow.windowLength}
                  </Typography>
                </div>
                <div className="col-md-4">
                  <label className="control-label text-muted">End Time :</label>
                  <Typography variant="subheading" gutterBottom>
                    {scheduleRule.settlementWindow.endTime}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
        )
      })}
    </div>
  }



  renderOnDemand = (onDemand) => {
    return (
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
              On Demand Settlement
              </small>
          </Typography>
        </AppBar>
        <div className="panel-body">
          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label text-muted">Active:</label>
                <Typography variant="subheading" gutterBottom>
                  <Boolean flag={onDemand.active} />
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Merchant ID:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.merchantId}
                </Typography>
              </div>

              <div className="col-md-4">
                <label className="control-label text-muted">
                  Settlement Rule Id:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.settlementRuleId}
                </Typography>
              </div>
            </div>
          </div>

          {/* <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Disable on Weekend:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  <Boolean flag={settlementRule.disableOnWeekend} />
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Disable on Holidays:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  <Boolean flag={settlementRule.disableOnHolidays} />
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Record Sales Register Entries:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  <Boolean flag={settlementRule.salesRegisterRecords} />
                </Typography>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Time Window:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  <Boolean flag={settlementRule.timeWindow} />
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Settlement Window:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {settlementRule.settlementWindowLength}{" "}
                  {settlementRule.settlementWindowUnit}
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Windows End Time:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {settlementRule.windowEndTime}
                </Typography>
              </div>
            </div>
          </div> */}

          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Eligibility Start Time:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.eligibilityStartTime}
                </Typography>
              </div>

              <div className="col-md-4">
                <label className="control-label text-muted">
                  Eligibility End Time:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.eligibilityEndTime}
                </Typography>
              </div>

              <div className="col-md-4">
                <label className="control-label text-muted">Frequency:</label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.frequency}
                </Typography>
              </div>
            </div>
          </div>

          <div className="form-group">
            <div className="row">
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Threshold Amount:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.thresholdAmount}
                </Typography>
              </div>
              <div className="col-md-4">
                <label className="control-label text-muted">
                  Settlement Interval:
                  </label>
                <Typography variant="subheading" gutterBottom>
                  {onDemand.settlementInterval}
                </Typography>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }


  renderInvoice = (invoice, invoiceState) => {
    if (invoice != null) {
      return (
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
                Invoice
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="btn-toolbar pull-right">

              {
                invoiceState && <Boolean
                  flag={invoiceState.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              }

              {
                invoiceState && <Boolean
                  flag={invoiceState.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              }

              {/* <Boolean
                flag={invoiceState.approved ? invoiceState.approved : invoice.approved}
                trueText="Approved"
                falseText="Un-Approved"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              />
              <Boolean
                flag={invoiceState.active ? invoiceState.active : invoice.active}
                trueText="Activated"
                falseText="De-activated"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              /> */}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Invoice Channel:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {invoice.channel}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else return <div />;
  };

  renderDisbursement = (disbursement, disbursementState) => {
    if (disbursement != null) {
      return (
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
                Disbursement
              </small>
            </Typography>
          </AppBar>
          <div className="panel-body">
            <div className="btn-toolbar pull-right">

              {
                disbursementState && <Boolean
                  flag={disbursementState.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              }

              {
                disbursementState && <Boolean
                  flag={disbursementState.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details"
                />
              }

              {/* <Boolean
                flag={disbursement.approved}
                trueText="Approved"
                falseText="Un-Approved"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              />
              <Boolean
                flag={disbursement.active}
                trueText="Activated"
                falseText="De-activated"
                trueStatus="label-success details"
                falseStatus="label-danger details"
              /> */}
            </div>
            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Disbursement Channel:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {disbursement.channel}
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Disbursement Mode:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {disbursement.mode}
                  </Typography>
                </div>
              </div>
            </div>

            <div className="form-group">
              <div className="row">
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Auto Retry:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    <Boolean flag={disbursement.autoRetry} />
                  </Typography>
                </div>
                <div className="col-md-6">
                  <label className="control-label text-muted">
                    Fail Reasons:
                  </label>
                  <Typography variant="subheading" gutterBottom>
                    {disbursement.failReasons}
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else return <div />;
  };

  renderData = () => {
    if (Object.keys(this.props.settlements).length) {
      return this.renderSettlement();
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
)(ShowSettlement);
