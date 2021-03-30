/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import { Link } from "react-router-dom";
import Form from "components/form";
import PartySearchFormGroup from "components/party_search_form_group";
import ScheduleFrequency from "components/schedule_frequency";
import {
  dateStringToISO,
  getDefaultEffectiveFrom,
  getDefaultEffectiveTo
} from "utils/helpers";
import * as routes from "routes";
import apiFetch from "utils/api_fetch"
import { withStyles } from '@material-ui/core/styles';
import TimeInput from 'material-ui-time-picker'
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


let Style = {
  paddingLeft: 10,
  paddingTop: 10
}

const invoiceChannelTypes = ["FILE", "EMAIL"];
const disbursementChannelTypes = ["API", "FILE"];
const disbursementModeTypes = ["NEFT", "IMPS", "RTGS", "ANY"];
const workflowTypes = [
  "SYSTEM_DEFAULT",
  "PS_IMPS_PPI",
  "PS_USER_FUND_TRANSFER",
  "PS_USER_YES_PAY",
  "PG_SETTLEMENT",
  "MERCHANT_SETTLEMENT",
  "INTERNAL_SETTLEMENT",
  "UPI_SETTLEMENT",
  "IMPS_BANK"
];
const activeStatus = ["true", "false"]

const entryTypes = ["DAYS", "WEEKS", "MONTHS",];

const entryTypesSettlementWindow = ["DAYS","HOURS", "WEEKS", "MONTHS"];

const dayOfWeeks = [1,2,3,4,5,6,7]

const dayOfWeeksIndex = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const dayOfMonths = ["31", "30", "29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

const Hours = [ "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1","0"]

const minutes = ["59", "58", "57", "56", "54", "53", "52", "51", "50", "49", "48", "47", "46", "45", "44", "43", "42", "41", "40", "39", "38", "37", "36", "35", "34", "33", "32", "31", "30","29","28","27","26","25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1","0"]

class CreateSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeWindowComponent: null,
      fromParty: null,
      toParty: null,
      fromPartyType: "",
      toPartyType: "",
      fromId: "",
      fromUser: "",
      toId: "",
      toUser: "",
      onDemandChecked: false,
      open: false,
      settlementRuleId: "533419ae-8f4f-4e0e-8d66-4a18148c85c7",
      merchantId: "14ee7e85-5539-4e0e-bc13-9ce119f69381",
      frequency: null,
      eligibilityStartTime: null,
      eligibilityEndTime: null,
      thresholdAmount: null,
      settlementInterval: null,
      customTimeWindowComponent: false,
      active: false,
      schedulingRuleRequests: [],
      custom: false,
      rangeFrom: 1,
      rangeTo: 23,
      selectedDate: new Date('2014-08-18T21:11:54'),
      activeWindowMessage:false,
      selectedDate: new Date('2014-08-18T21:11:54'),   
      scheduleTime:''
    };
  }


  AddArray = e => {
    e.preventDefault();
    this.setState({
      schedulingRuleRequests: this.state.schedulingRuleRequests.concat([
        {
          scheduleFormat: {
            schedulingRuleUnit: "",
            scheduledHours: new Date().getHours()  ,
            scheduledMinutes: new Date().getMinutes(),
            dayOfWeek: 1,
            dayOfMonth: 31,
            frequency: 1,
          },
          settlementWindow: {
            schedulingRuleUnit: "",
            windowLength: 0,
            endTime: 0
          },
          active: false,
          scheduleTime:new Date(),
        }
      ]),
  
      custom: true
    });
  };

  OnRemoveArray = id => {
    let deletedRules = this.state.schedulingRuleRequests;
    deletedRules.splice(id, 1);

    this.setState({
      schedulingRuleRequests: deletedRules
    });
  };

  onToggle = () => {
    this.setState({
      onDemandChecked: !this.state.onDemandChecked
    })
  }

  onToggleActive = () => {
    this.setState({
      active: !this.state.active,
     
    })
  }

  onChangeDemand = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getOnDemandData = (e) => {
    
    const { response } = this.props.message

    let url = 'v1/onDemandSettlement'

    const {
      frequency,
      eligibilityStartTime,
      eligibilityEndTime,
      thresholdAmount,
      settlementInterval,
      active
    } = this.refs

    const body = {
      settlementRuleId: response.length ? response.id : "null",
      merchantId: "14ee7e85-5539-4e0e-bc13-9ce119f69381",
      frequency: Number(frequency.value),
      eligibilityStartTime: Number(eligibilityStartTime.value),
      eligibilityEndTime: Number(eligibilityEndTime.value),
      thresholdAmount: Number(thresholdAmount.value),
      settlementInterval: Number(settlementInterval),
      active: active.value
    }
    apiFetch.post(url, body).then(res => console.log(res))

  }


  componentWillReceiveProps(nextProps) {
    if (
      nextProps.report &&
      nextProps.report.fromPartySearchResult &&
      nextProps.report.fromPartySearchResult.entryType
    ) {
      this.setState({
        fromPartyType: nextProps.report.fromPartySearchResult.entryType
      });
    }
    if (
      nextProps.report &&
      nextProps.report.toPartySearchResult &&
      nextProps.report.toPartySearchResult.entryType
    ) {
      this.setState({
        toPartyType: nextProps.report.toPartySearchResult.entryType
      });
    }
  }


  getData = () => {
    const {
      name,
      settlementTag,
      transactionType,
      eventType,
      entryFor,
      frequency,
      frequencyUnit,
      timeWindow,
      settlementWindowLength,
      settlementWindowUnit,
      windowEndTime,
      scheduleStartTime,
      effectiveFrom,
      effectiveTo,
      autoNetOff,
      autoDispersal,
      disableWeekends,
      disableHolidays,
      invoiceChannel,
      disbursementChannel,
      disbursementMode,
      failReasons,
      autoRetry,
      workflowType,
      aggregateSettlement,
      invoiceGenerationThreshold,
      salesRegisterRecords,
      frequencyOnDemand,
      eligibilityStartTime,
      eligibilityEndTime,
      thresholdAmount,
      settlementInterval,
      active,
      

    } = this.refs;
    const fromParty = this.props.report.fromPartySearchResult;
    const toParty = this.props.report.toPartySearchResult;



    const common = {
      name: name.value,
      settlementTag: settlementTag.value,
      fromParty: this.state.fromPartyType === "" ? "User" : fromParty.details[fromParty.index].id,
      fromPartyType: this.state.fromPartyType === "" ? "User" : fromParty.details[fromParty.index].entryType,
      toParty: this.state.toPartyType === "" ? "User" : toParty.details[toParty.index].id,
      toPartyType: this.state.toPartyType === "" ? "User" : toParty.details[toParty.index].entryType,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value),
    };

    const settlementRule = Object.assign({}, common, {
      eventType: eventType.value.trim(),
      transactionType: transactionType.value,
      entryFor: entryFor.value,
      scheduleStartTime: dateStringToISO(scheduleStartTime.value),
      frequency: frequency.value,
      frequencyUnit: frequencyUnit.getData(),
      timeWindow: timeWindow.checked,
      settlementWindowLength: timeWindow.checked
        ? settlementWindowLength.value
        : 0,
      settlementWindowUnit: timeWindow.checked
        ? settlementWindowUnit.getData()
        : "HOURS",
      windowEndTime: timeWindow.checked ? windowEndTime.value : "24",
      netOff: autoNetOff.checked,
      autoDispersal: autoDispersal.checked,
      disableOnWeekend: disableWeekends.checked,
      disableOnHolidays: disableHolidays.checked,
      workflowType: workflowType.value,
      aggregateSettlement: aggregateSettlement.checked,
      invoiceGenerationThreshold: invoiceGenerationThreshold.value,
      salesRegisterRecords: salesRegisterRecords.checked,
      schedulingRuleRequests: this.state.schedulingRuleRequests,
      custom: this.state.customTimeWindowComponent, 
    });

    const invoice = Object.assign({}, common, {
      channel: invoiceChannel.value
    });

    const disbursement = Object.assign({}, common, {
      channel: disbursementChannel.value,
      mode: disbursementMode.value,
      autoRetry: autoRetry.checked,
      failReasons: failReasons.value
    });


    const { response } = this.props.message

    if (this.state.onDemandChecked === true) {
      var onDemandRule = {
        settlementRuleId: "123456",
        merchantId: toParty.details[toParty.index].result,
        frequency: Number(frequencyOnDemand.value),
        eligibilityStartTime: Number(eligibilityStartTime.value),
        eligibilityEndTime: Number(eligibilityEndTime.value),
        thresholdAmount: Number(thresholdAmount.value),
        settlementInterval: Number(settlementInterval.value),
        active: active.value
      }
    }



    return {
      settlementRule: settlementRule,
      invoice: invoice,
      disbursement: disbursement,
      onDemand: this.state.onDemandChecked ? onDemandRule : {}
    };
  };

  onCustomTimeWindowToggle = event => {
    this.setState({
      customTimeWindowComponent: event.target.checked
    });
  };

  onChangeRuleRequest = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.schedulingRuleUnit = e.target.value;
        } else {
          obj.scheduleFormat.schedulingRuleUnit = "";
        }
      }
      return obj;
    });

    this.setState({ schedulingRuleRequests: newArray });
  };

  onChangeScheduleHour = (id, e) => {
    let { scheduleTime } =this.state;
    let scheduleHour=[];
    let scheduleMin=[];
    let scheduledTime = new Date();
     scheduleTime=[];
    
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
    
      if (id == idx) {
        if (e) {
          let value = e;
        //   let newDate = value.split(":")

          let hour = value.getHours();
          let minutes = value.getMinutes();
          obj.scheduleFormat.scheduledHours = hour;
          obj.scheduleFormat.scheduledMinutes = minutes
       
          scheduleHour=obj.scheduleFormat.scheduledHours;
          scheduleMin=obj.scheduleFormat.scheduledHours;   

          scheduledTime.setHours(hour);
          scheduledTime.setMinutes(minutes)
          obj.scheduleTime= scheduledTime;
     

        } else {
          obj.scheduleFormat.scheduledHours = 0;
        }
      }

      return obj;
    });
    

    this.setState({ schedulingRuleRequests: newArray});
  }
  onChangeScheduleHours = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.scheduledHours = Number(e.target.value);
        } else {
          obj.scheduleFormat.scheduledHours = 0;
        }
      }
      return obj;
    });

    this.setState({ schedulingRuleRequests: newArray });
  }
  onChangeScheduleMinutes = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.scheduledMinutes = Number(e.target.value);
        } else {
          obj.scheduleFormat.scheduledMinutes = 0;
        }
      }
      return obj;
    });

    this.setState({ schedulingRuleRequests: newArray });
  }

  onChangeWeek = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.dayOfWeek = Number(e.target.value);
        } else {
          obj.scheduleFormat.dayOfWeek = 0;
        }
      }
      return obj;
    });
    this.setState({ schedulingRuleRequests: newArray });
  }

  onChangeMonth = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.dayOfMonth = Number(e.target.value);
        } else {
          obj.scheduleFormat.dayOfMonth = 0;
        }
      }
      return obj;
    });

    this.setState({ schedulingRuleRequests: newArray });
  }

  onChangeFrequency = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.frequency = Number(e.target.value);
        } else {
          obj.scheduleFormat.frequency = 0;
        }
      }
      return obj;
    });

    this.setState({ schedulingRuleRequests: newArray });
  }

  onChangeActive = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.active = e.target.checked === true ? true : false;
        } else {
          obj.active = false;
        }
      }
     
      return obj;

    });
    this.setState({ schedulingRuleRequests: newArray });
  };

  onChangeWindowRuleUnit = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.schedulingRuleUnit = e.target.value;
        } else {
          obj.settlementWindow.schedulingRuleUnit = ""
        }
      }
      return obj;
    });
    this.setState({ schedulingRuleRequests: newArray,activeWindowMessage:true })
  }

  onChangeWindowLength = (id, e) => {
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.windowLength = Number(e.target.value);
        } else {
          obj.settlementWindow.windowLength = 0
        }
      }
      return obj;
    });
    this.setState({ schedulingRuleRequests: newArray })
  }

  onChangeEndTime = (id, e) => {
    const { activeWindowMessage }=this.state;
    let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.endTime = Number(e.target.value);
        } else {
          obj.settlementWindow.endTime = 0
        }
      }
      return obj;
    });
    this.setState({ schedulingRuleRequests: newArray,activeWindowMessage:true })
  }

  renderCustomTimeComponent = () => {
    const { schedulingRuleRequests ,activeWindowMessage ,schedulingTime } = this.state;
    const { classes } = this.props;
  
    
    return (
      <div style={{ width: '75%', marginLeft: '145px' }}>
        <div className="row">

          <div>
            {
              schedulingRuleRequests.map((itemName, index) => {
                return <div style={{ boxShadow: "-1px 1px 7px -1px #888888", marginTop: 5 }}>
                  <h4 style={Style}>Scheduling Rule</h4>
                  <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                  <div className="row" style={Style} >
                    <div className="form-group col-md-3">
                      <label className="control-label">Unit:</label>
                      <select
                        required={true}
                        className="form-control"
                        value={itemName.scheduleFormat.schedulingRuleUnit}
                        onChange={e => {
                          this.onChangeRuleRequest(index, e);
                        }}
                      >
                        <option>Select Rule Type</option>

                        {entryTypes.map(entryType => {
                          return (
                            <option key={`sub-option-${entryType}`} value={entryType}>
                              {entryType}
                            </option>
                          );
                        })}
                      </select>

                    </div>

                    {itemName && itemName.scheduleFormat.schedulingRuleUnit === "WEEKS" ?
                      <div className="form-group col-md-2">
                        <label className="control-label">Day Of Week:</label>
                        <select
                          required={true}
                          className="form-control"
                          value={itemName.scheduleFormat.dayOfWeek}
                          onChange={e => {
                            this.onChangeWeek(index, e);
                          }}
                          required={true}
                        >
                          {dayOfWeeks.map(entryType => {
                            return (
                              <option key={`sub-option-${entryType}`} value={entryType}>
                                {dayOfWeeksIndex[entryType-1]}
                              </option>
                            );
                          })}
                        </select>
                      </div> : ""
                    }

                    {
                      itemName && itemName.scheduleFormat.schedulingRuleUnit === "MONTHS" ?
                        <div className="col-md-2">
                          <label className="control-label">Day Of Month:</label>
                          <select
                            className="form-control"
                            value={itemName.scheduleFormat.dayOfMonth}
                            onChange={e => {
                              this.onChangeMonth(index, e);
                            }}
                            required={true}
                          >
                            {dayOfMonths.map(entryType => {
                              return (
                                <option key={`sub-option-${entryType}`} value={entryType}>
                                  {entryType}
                                </option>
                              );
                            })}
                          </select>

                        </div> : ""
                    }
                     <div className="col-md-3">
                     <label className="control-label">Scheduled Time:</label>
                      <TimeInput
                      mode='24h'
                      value={itemName.scheduleTime}
                      onChange={(time) => this.onChangeScheduleHour(index,time)}
                    />                        
                    </div> 
                { itemName && itemName.scheduleFormat.schedulingRuleUnit === "WEEKS" ?
                    <div className="col-md-3">
                      <label className="control-label">Frequency :</label>
                       <input
                  className="form-control"
                  type="number"
                  min="1"
                  required={true}
                  ref="frequency"
                  value="1"
                />
                    </div>
                   :
                   <div className="col-md-3">
                      <label className="control-label">Frequency :</label>
                       <input
                  className="form-control"
                  type="number"
                  min="1"
                  required={true}
                  ref="frequency"
                  value={itemName.scheduleFormat.frequency}
                  onChange={e =>
                    this.onChangeFrequency(index, e)
                  }
                />
                    </div>
              }
                    <div className="col-md-1">

                      <div className="checkbox" >
                        <label style={{ marginTop: 20 }}>
                          <input
                            // ref="timeWindow"
                            type="checkbox"
                            value={itemName.active}
                            onChange={(e) => this.onChangeActive(index, e)}
                          />
                          Active
                        </label>
                      </div>
                    </div>
                   

                  </div>
                  <div className="row" style={{paddingLeft:25}} >
                  {itemName.active ?
                  itemName && itemName.scheduleFormat.schedulingRuleUnit !== "" ?
                   itemName && itemName.scheduleFormat.schedulingRuleUnit === "WEEKS" ?
                   itemName && itemName.scheduleFormat.dayOfWeek === 0?
                    <p>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[itemName && itemName.scheduleFormat.dayOfWeek]} with the interval of 1 week</p>
                    :
                   <p>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[(itemName && itemName.scheduleFormat.dayOfWeek) -1]} with the interval of 1 week.</p>
                   :  itemName && itemName.scheduleFormat.schedulingRuleUnit === "MONTHS" ?
                   <p>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  on {itemName && itemName.scheduleFormat.dayOfMonth} day of month with the interval of 1 week.</p>
                   :itemName && itemName.scheduleFormat.schedulingRuleUnit === "DAYS" ?
                   <p>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} day.</p>
                     : <p>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} hour.</p>
                   :null
                   :null
                  }
                </div>  
                  <h4 style={{ paddingLeft: 10 }}>Transaction Window</h4>
                  <hr style={{ marginTop: '0px', marginBottom: '0px' }} />

                  <div className="row" style={Style}>

                    <div className="col-md-3">
                      <label className="control-label">Unit:</label>
                      <select
                        className="form-control"
                        value={itemName.settlementWindow.schedulingRuleUnit}
                        onChange={e => {
                          this.onChangeWindowRuleUnit(index, e);
                        }}
                        required={true}
                      >
                        <option>Select Rule Type</option>
                        {entryTypesSettlementWindow.map(entryType => {
                          return (
                            <option key={`sub-option-${entryType}`} value={entryType}>
                              {entryType}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="col-md-3">
                      <label className="control-label">Window Length :</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder="Window Length"
                        value={itemName.settlementWindow.windowLength}
                        onChange={e =>
                          this.onChangeWindowLength(index, e)
                        }
                        required={true}
                        />
                    </div>
                    {
                      itemName && itemName.settlementWindow.schedulingRuleUnit === "DAYS" ?
                    <div className="col-md-3">
                      <label className="control-label">End Hour :</label>
                      <input
                        className="form-control"
                        type="text"
                        placeholder=" Should be lessthan 24"
                        value={itemName.settlementWindow.endTime}
                        maxLength={2}
                        onChange={e =>
                          this.onChangeEndTime(index, e)
                        }
                        required={true}
                      />
                    </div>
              :
              null
                      }
                    <div className="col-md-3">
                      <button
                        style={{ textAlign: "right", marginTop: 25 }}
                        type="button"
                        className="btn btn-primary"
                        onClick={this.AddArray}
                      >
                        +
                      </button>

                      <button
                        style={{ textAlign: "right", marginTop: 25, marginLeft: 10 }}
                        type="button"
                        className="btn btn-danger"
                        onClick={e => this.OnRemoveArray(index)}
                      >
                        -
                  </button>
                    </div>
                  </div>

                  <div className="row" style={{paddingLeft:25,marginTop:12}} >
                  {activeWindowMessage ?
                   itemName && itemName.settlementWindow.schedulingRuleUnit !== "" ?
                      itemName && itemName.settlementWindow.schedulingRuleUnit === "DAYS" ? 
                        itemName && itemName.settlementWindow.windowLength === 0?
                         <p>Filter txns till {itemName && itemName.settlementWindow.endTime} hour same day .</p>
                          :
                         <p> Filter txns till {itemName && itemName.settlementWindow.endTime} hour {itemName && itemName.settlementWindow.windowLength} day before.</p>
                     : itemName && itemName.settlementWindow.schedulingRuleUnit === "HOURS" ?
                     itemName && itemName.settlementWindow.windowLength === 0?
                     <p>Filter txns till same hour</p>
                      :
                     <p> Filter txns till {itemName && itemName.settlementWindow.windowLength} hour before.</p>
                   
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "WEEKS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <p>Filter txns till 11.59.59 hour SUN same week.</p>
                    :
                   <p> Filter txns till 11.59.59  hour SUN {itemName && itemName.settlementWindow.windowLength} week before</p>
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "MONTHS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <p>Filter txn till first day of the same month</p>
                    :
                   <p> 
                   Filter txn till first day of {itemName && itemName.settlementWindow.windowLength} month before.</p>
                   :null
                   :null
                   :''
                  }
                </div>  
                  <hr />
                </div>

              })
            }


          </div>
        </div>
      </div>
    );
  };



  onTimeWindowToggle = event => {
    this.setState({
      timeWindowComponent: event.target.checked
    });
  };

  renderTimeWindowComponent = () => {
    const timeWindowComponent = this.state.timeWindowComponent;

    return (
      <div>
        <div className="col-md-5">
          <label className="control-label">Settlement Window Length:</label>
          <input
            className="form-control"
            type="number"
            min="0"
            disabled={!timeWindowComponent}
            ref="settlementWindowLength"
          />
        </div>

        <div className="col-md-3">
          <ScheduleFrequency
            disabled={!timeWindowComponent}
            ref="settlementWindowUnit"
          />
        </div>

        <div className="col-md-4">
          <label className="control-label">Window End Time:</label>
          <input
            className="form-control"
            type="text"
            placeholder="hh:mm:ss"
            defaultValue="24"
            disabled={!timeWindowComponent}
            ref="windowEndTime"
          />
        </div>
      </div>
    );
  };

  render() {

    const { report } = this.props;




    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createSettlementRule}
        >
          <h1 className="page-header">Create Settlement Rule</h1>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Name:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="name"
                />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <div className="form-group">
                  <label className="control-label">Schedule Start Time:</label>
                  <input
                    className="form-control"
                    type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    defaultValue={getDefaultEffectiveFrom()}
                    required={true}
                    ref="scheduleStartTime"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Settlement Tag:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="settlementTag"
                />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <label className="control-label">Frequency:</label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  defaultValue={1}
                  required={true}
                  ref="frequency"
                />
              </div>

              <div className="col-md-3">
                <ScheduleFrequency defaultValue="DAYS" ref="frequencyUnit" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <PartySearchFormGroup
                  ref="fromPartySearch"
                  forComponent="report"
                  required={true}
                  searchingFor="FromParty"
                  searchResult={report.fromPartySearchResult}
                  multiFindInput={this.props.multiFindInput}
                  multiFindSearch={this.props.multiFindSearch}
                  multiFindLock={this.props.multiFindLock}
                  editLock={this.props.editLock}
                  multiFindClear={this.props.multiFindClear}
                />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <label className="control-label">Effective From:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  defaultValue={getDefaultEffectiveFrom()}
                  required={true}
                  ref="effectiveFrom"
                />
              </div>

              <div className="col-md-3">
                <label className="control-label">Effective To:</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  defaultValue={getDefaultEffectiveTo()}
                  required={true}
                  ref="effectiveTo"
                />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <PartySearchFormGroup
                  ref="toPartySearch"
                  forComponent="report"
                  required={false}
                  searchingFor="ToParty"
                  searchResult={report.toPartySearchResult}
                  multiFindInput={this.props.multiFindInput}
                  multiFindSearch={this.props.multiFindSearch}
                  multiFindLock={this.props.multiFindLock}
                  editLock={this.props.editLock}
                  multiFindClear={this.props.multiFindClear}
                />
              </div>



              <div className="col-md-offset-1 col-md-6" >
                <div className="checkbox">
                  <label>
                    <input
                      ref="timeWindow"
                      type="checkbox"
                      onChange={this.onTimeWindowToggle}
                    />
                    Time Window
                  </label>
                </div>
                {this.renderTimeWindowComponent()}
              </div>


            </div>
          </div>
          <br />



          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Transaction Type:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="transactionType"
                />
              </div>

              <div className="col-md-offset-1 col-md-3" >
                <div className="form-group">
                  <label className="control-label">Workflow Type:</label>
                  <select
                    className="form-control"
                    required={true}
                    ref="workflowType"
                  >
                    {workflowTypes.map(workflowType => {
                      return (
                        <option key={`sub-option-${workflowType}`}>
                          {workflowType}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Entry For:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="entryFor"
                />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6" >
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="autoNetOff" />
                  Auto Netoff
                </label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="autoDispersal" />
                  Auto Process
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Event Type:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="eventType"
                />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableWeekends" />
                  Disable on Weekends
                </label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    ref="disableHolidays"
                  />
                  Disable on Holidays
                </label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">
                  Invoice Generation Threshold ( paise ):
                </label>
                <input
                  className="form-control"
                  type="number"
                  min={0}
                  defaultValue={0}
                  required={true}
                  ref="invoiceGenerationThreshold"
                />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    ref="aggregateSettlement"
                  />
                  Aggregate Settlement
                </label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    defaultChecked={true}
                    ref="salesRegisterRecords"
                  />
                  Record Sales Register Entries
                </label>
              </div>

              {
                this.state.toPartyType === "Merchant" ?
                  <div className="form-group checkbox">
                    <label>
                      <input
                        type="checkbox"
                        checked={this.state.onDemandChecked}
                        onChange={this.onToggle}
                      />
                      On Demand Settlement
                </label>
                  </div> : <div className="form-group checkbox">
                    <label>
                      <input
                        disabled={true}
                        type="checkbox"
                        checked={this.state.onDemandChecked}
                        onChange={this.onToggle}
                      />
                      On Demand Settlement
                </label>
                  </div>

              }

              <div className="form-group" style={{ marginTop: 20 }}>
                <div className="checkbox">
                  <label>
                    <input
                      // ref="timeWindow"
                      type="checkbox"
                      onChange={this.onCustomTimeWindowToggle}
                    />
                    Custom Settlement Window
                  </label>
                </div>
              </div>

              {
                this.state.customTimeWindowComponent === true ?
                  <div className="form-group" style={{ marginTop: -10, marginLeft: 5 }}>
                    <button

                      type="button"
                      className="btn btn-primary"
                      onClick={this.AddArray}
                    >
                      Add Rule
                    </button>

                    {/* {this.renderCustomTimeComponent()} */}
                  </div> : ""
              }


            </div>
          </div>


          {
            this.state.onDemandChecked &&
            <>
              <div className="panel panel-default">
                <div className="panel-body" >
                  <fieldset>
                    <legend
                      data-toggle="collapse"
                      data-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      On Demand settlement
                    </legend>
                  </fieldset>
                  <form onSubmit={this.getOnDemandData}>
                    <div className="row">
                      <div className="form-group">
                        <div className="col-md-5">
                          <label className="control-label">Frequency:</label>
                          <input
                            className="form-control"
                            type="number"
                            required={true}
                            ref="frequencyOnDemand"
                            defaultValue={0}
                            name="frequency"
                            onChange={this.onChangeDemand}
                          />
                        </div>

                        <div className="col-md-offset-1 col-md-3">
                          <div className="form-group">
                            <label className="control-label">Eligibility Start Time:</label>
                            <input
                              className="form-control"
                              placeholder="1200"
                              type="number"
                              min={0}
                              max={4}
                              required={true}
                              ref="eligibilityStartTime"
                              name="eligibilityStartTime"
                              onChange={this.onChangeDemand}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <div className="col-md-5">
                          <label className="control-label">Threshold Amount :</label>
                          <input
                            className="form-control"
                            type="number"
                            required={true}
                            ref="thresholdAmount"
                            defaultValue={0}
                            name="thresholdAmount"
                            onChange={this.onChangeDemand}
                          />
                        </div>

                        <div className="col-md-offset-1 col-md-3">
                          <div className="form-group">
                            <label className="control-label">Eligibility End Time:</label>
                            <input
                              className="form-control"
                              placeholder="1200"
                              required={true}
                              ref="eligibilityEndTime"
                              type="number"
                              min={0}
                              max={4}
                              name="eligibilityEndTime"
                              onChange={this.onChangeDemand}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row">
                      <div className="form-group">
                        <div className="col-md-5">
                          <label className="control-label">settlementInterval :</label>
                          <input
                            className="form-control"
                            type="number"
                            required={true}
                            ref="settlementInterval"
                            defaultValue={0}
                            name="settlementInterval"
                            onChange={this.onChangeDemand}
                          />
                        </div>

                        <div className="col-md-offset-1 col-md-3">
                          <div className="form-group">
                            <label className="control-label">Active:</label>
                            <select
                              className="form-control"
                              required={true}

                              ref="active">
                              {
                                activeStatus.map((item) => {
                                  return (<option key={`sub-option-${item}`}>{item}</option>);
                                })
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </>
          }



          <br />

          {
            this.state.customTimeWindowComponent === true ? this.renderCustomTimeComponent() : ""
          }
          <br />

          <div className="row">
            <div className="col-md-6">
              <h3> Disbursement </h3>
            </div>
            <div className="col-md-6">
              <h3> Invoice </h3>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">Channel:</label>
                <select
                  className="form-control"
                  required={true}
                  ref="disbursementChannel"
                >
                  {disbursementChannelTypes.map(disbursementChannel => {
                    return (
                      <option key={`sub-option-${disbursementChannel}`}>
                        {disbursementChannel}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <div className="col-md-offset-1 col-md-5">
              <div className="form-group">
                <label className="control-label">Channel:</label>
                <select
                  className="form-control"
                  required={true}
                  ref="invoiceChannel"
                >
                  {invoiceChannelTypes.map(invoiceChannel => {
                    return (
                      <option key={`sub-option-${invoiceChannel}`}>
                        {invoiceChannel}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-5">
              <div className="form-group">
                <label className="control-label">Mode:</label>
                <select
                  className="form-control"
                  required={true}
                  ref="disbursementMode"
                >
                  {disbursementModeTypes.map(disbursementMode => {
                    return (
                      <option key={`sub-option-${disbursementMode}`}>
                        {disbursementMode}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Fail Reasons:</label>
                <input
                  className="form-control"
                  type="text"
                  defaultValue="NONE"
                  required={true}
                  ref="failReasons"
                />
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-5 form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" ref="autoRetry" />
                  Auto Retry
                </label>
              </div>
            </div>
          </div>

          <button className="btn btn-lg btn-block btn-success" type="submit">
            Create Settlement Rule
          </button>

          <div className="col-md-4 form-group">
            or <Link to={routes.ROOT_PATH}>cancel</Link>
          </div>
        </Form>
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateSettlement));
