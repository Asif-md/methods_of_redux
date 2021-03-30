/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { Link } from "react-router-dom";
import Form from "components/form";
import PartySearchFormGroup from "components/party_search_form_group";
import ScheduleFrequency from "components/schedule_frequency";
import { dateStringToISO, epochToISO } from "utils/helpers";
import * as routes from "routes";
import TimeInput from 'material-ui-time-picker'
import apiFetch from "../utils/api_fetch";


const invoiceChannelTypes = ["EMAIL", "FILE"];
const disbursementChannelTypes = ["API", "FILE"];
const disbursementModeTypes = ["IMPS", "NEFT", "RTGS", "ANY"];
const workflowTypes = ["SYSTEM_DEFAULT", "PS_IMPS_PPI", "PS_USER_FUND_TRANSFER", "PS_USER_YES_PAY", "PG_SETTLEMENT", "MERCHANT_SETTLEMENT", "INTERNAL_SETTLEMENT", "UPI_SETTLEMENT", "IMPS_BANK"]
const activeStatus = ["true", "false"]
const activeStatus2 = ["true", "false"]
const dropDownList = [{ "name": "true", "value": true },
{ "name": "false", "value": false }
]


let Style = {
  paddingLeft: 10,
  paddingTop: 10
}

const entryTypes = ["DAYS", "WEEKS", "MONTHS"];
const entryTypesSettlementWindow = ["DAYS","HOURS", "WEEKS", "MONTHS"];
const dayOfWeeks = [7, 6, 5, 4, 3, 2, 1]
const dayOfWeeksIndex = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]

const dayOfMonths = ["31", "30", "29", "28", "27", "26", "25", "24", "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1"]

const Hours = [ "23", "22", "21", "20", "19", "18", "17", "16", "15", "14", "13", "12", "11", "10", "9", "8", "7", "6", "5", "4", "3", "2", "1","0"]


const minutes = ["59", "58", "57", "56", "54", "53", "52", "51", "50", "49", "48", "47", "46", "45", "44", "43", "42", "41", "40", "39", "38", "37", "36", "35", "34", "33", "32", "31", "30","29","28","27","26","25","24","23","22","21","20","19","18","17","16","15","14","13","12","11","10","9","8","7","6","5","4","3","2","1","0"]

function titleCase(input) {
  if (input)
    return input.charAt(0) + input.substr(1).toLowerCase();
  return "";
}

const display = {
  display: 'block',
  width: "600px",
  marginLeft: "30%",
  height: 400
};
const hide = {
  display: 'none'
};

class EditSettlement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timeWindowComponent: this.props.settlementRule.timeWindow,
      settlementRuleId: "",
      merchantId: "",
      fromParty: null,
      toParty: null,
      toPartyShort: "",
      fromPartyType: "",
      toPartyType: "",
      fromId: "",
      fromUser: "",
      toId: "",
      toUser: "",
      onDemandChecked: false,
      onDemandActive: false,
      onCustomWindowChecked: this.props.settlementRule.schedulingType === "COMPOSITE" ||  this.props.settlementRule.schedulingType === "MULTIPLE" ? true:false,
      active: false,
      isChecked: false,
      successMessage: "",
      isSuccess: false,
      show: false,
      resData: {},
      showCreate: false,
      resDataCreate: {},
      customTimeWindowComponent: this.props.settlementRule.schedulingType === "COMPOSITE" ||  this.props.settlementRule.schedulingType === "MULTIPLE" ? true:false,
      active: false,
      schedulingRuleRequests: [],
      schedulingChildRequests:[],
      custom: false,
      newArray: [],
      activeMessage:false,
      customChild:false,
      customChildTimeWindowComponent:false,
      activeWindowMessage:false,
    }

  }

  onCustomTimeWindowToggle = event => {
    this.setState({
      customTimeWindowComponent: event.target.checked,
      onCustomWindowChecked: !this.state.onCustomWindowChecked,
      custom:event.target.checked
    });
  };

  onToggle = () => {
    this.setState({
      onDemandChecked: !this.state.onDemandChecked
    })
  }

  onToggleActive = () => {
    this.setState({
      onDemandActive: !this.state.onDemandActive
    })
  }

  onToggleChecked = (e) => {
    e.preventDefault()
    // this.setState({
    //   active: !e.target.name

    // })
    this.setState({ isChecked: !this.state.isChecked });
  }

  onSubmitUpdate = (e) => {
    e.preventDefault();

    const { settlementRule } = this.props

    let url = `v1/onDemandSettlement/${this.state.merchantId ? this.state.merchantId : settlementRule.toPartyShortName}`

    const {
      frequencyOnDemand,
      eligibilityStartTime,
      eligibilityEndTime,
      thresholdAmount,
      settlementInterval,
      active,
      activeCreate
    } = this.refs


    var onDemandRuleUpdate = {
      settlementRuleId: this.state.settlementRuleId ? this.state.settlementRuleId : settlementRule.id,
      merchantId: this.state.merchantId ? this.state.merchantId : settlementRule.toPartyShortName,
      frequency: Number(frequencyOnDemand.value),
      eligibilityStartTime: Number(eligibilityStartTime.value),
      eligibilityEndTime: Number(eligibilityEndTime.value),
      thresholdAmount: Number(thresholdAmount.value),
      settlementInterval: Number(settlementInterval.value),
      active: active.value
    }


    apiFetch.put(url, onDemandRuleUpdate).then(res => {
      if (res) {
        this.setState({
          successMessage: "On Demand Rule Updated successfully!",
          isSuccess: true,
          resData: res

        })
        this.toggle()
      }
    })

  }

  toggle = (event) => {
    this.setState((prevState) => ({
      show: !prevState.show
    }));
  }

  toggleCreate = (event) => {
    this.setState((prevState) => ({
      showCreate: !prevState.showCreate
    }));
  }


  onSubmitCreate = (e) => {
    e.preventDefault();

    const { settlementRule } = this.props
    let url = "v1/onDemandSettlement"

    const {
      frequencyOnDemand,
      eligibilityStartTime,
      eligibilityEndTime,
      thresholdAmount,
      settlementInterval,
      active,
      activeCreate
    } = this.refs


    var onDemandRuleCreate = {
      settlementRuleId: this.state.settlementRuleId ? this.state.settlementRuleId : settlementRule.id,
      merchantId: this.state.merchantId ? this.state.merchantId : this.state.toPartyShort,
      frequency: Number(frequencyOnDemand.value),
      eligibilityStartTime: Number(eligibilityStartTime.value),
      eligibilityEndTime: Number(eligibilityEndTime.value),
      thresholdAmount: Number(thresholdAmount.value),
      settlementInterval: Number(settlementInterval.value),
      active: activeCreate.value
    }




    apiFetch.post(url, onDemandRuleCreate).then(res => {
      if (res) {
        this.setState({
          successMessage: "On Demand Rule Created successfully!",
          isSuccess: true,
          resDataCreate: res
        })
        this.toggleCreate()
      }
    })

  }

  componentWillReceiveProps(nextProps) {


    if (nextProps.report && nextProps.report.fromPartySearchResult && nextProps.report.fromPartySearchResult.locked === false) {
      this.setState({
        fromId: "User",
        fromUser: "User"
      })
    }

    if (nextProps.report && nextProps.report.toPartySearchResult && nextProps.report.toPartySearchResult.locked === false) {
      this.setState({
        toId: "User",
        toUser: "User"
      })
    }

    if (
      nextProps.report &&
      nextProps.report.fromPartySearchResult && nextProps.report.fromPartySearchResult.details
    ) {

      if (Array.isArray(nextProps.report.fromPartySearchResult.details)) {
        if (nextProps.report.fromPartySearchResult.hasOwnProperty('index')) {
          let i = nextProps.report.fromPartySearchResult.index;
          this.setState({
            fromPartyType: nextProps.report.fromPartySearchResult.details[i].entryType,
            fromParty: nextProps.report.fromPartySearchResult.details[i].id,
            fromId: "",
            fromUser: ""
          });
        }
      } else {
        this.setState({
          fromPartyType: nextProps.report.fromPartySearchResult.details.entryType,
          fromParty: nextProps.report.fromPartySearchResult.details.id,
          fromId: "",
          fromUser: ""
        });


      }
    }
    if (
      nextProps.report &&
      nextProps.report.toPartySearchResult && nextProps.report.toPartySearchResult.details
    ) {
      if (Array.isArray(nextProps.report.toPartySearchResult.details)) {
        if (nextProps.report.toPartySearchResult.hasOwnProperty('index')) {
          let i = nextProps.report.toPartySearchResult.index;

          this.setState({
            toPartyType: nextProps.report.toPartySearchResult.details[i].entryType,
            toParty: nextProps.report.toPartySearchResult.details[i].id,
            toId: "",
            toUser: "",
            toPartyShort: nextProps.report.toPartySearchResult.details[i].result
          });


        }
      } else {
        this.setState({
          toPartyType: nextProps.report.toPartySearchResult.details.entryType,
          toParty: nextProps.report.toPartySearchResult.details.id,
          toId: "",
          toUser: "",
          toPartyShort: nextProps.report.toPartySearchResult.details.result
        });

      }
    }
  }

  isEmpty = (value) => {
    return (value == null || value.length === 0);
  }


  componentDidMount() {
    const { params, settlementId } = this.props.match;
    params && params.settlementId && this.props.showSettlement(params.settlementId);
    const { settlementRule, onDemand, showScheduleType } = this.props

    this.setState({
      merchantId: settlementRule.toPartyShortName,
      settlementRuleId: settlementRule.id,
      onDemandActive: onDemand == null ? false : true,
      onDemandActiveChecking: onDemand && onDemand.active === true ? true : false,
      schedulingRuleRequests: showScheduleType ? showScheduleType : []
      // onDemandActive: true
    })

  }
 
  getData = () => {

    const { invoice, disbursement, onDemand, settlementRule } = this.props;

    const {
      name,
      settlementTag,
      transactionType,
      entryFor,
      eventType,
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
    } = this.refs;

    const fromParty = this.props.report.fromPartySearchResult;
    const toParty = this.props.report.toPartySearchResult;
  
  
    // this.addData();  
     

    const common = {
      name: name.value,
      settlementTag: settlementTag.value,
      fromParty: this.state.fromId === "User" ? this.state.fromId : this.state.fromParty,
      fromPartyType: this.state.fromUser === "User" ? this.state.fromUser : this.state.fromPartyType,
      toParty: this.state.toId === "User" ? this.state.toId : this.state.toParty,
      toPartyType: this.state.toUser === "User" ? this.state.toUser : this.state.toPartyType,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value),
      schedulingRuleRequests:this.state.schedulingRuleRequests.concat(this.state.schedulingChildRequests),
      custom: this.state.custom,
    };
   

    const settlementPayload = Object.assign({}, common, {
      transactionType: transactionType.value,
      entryFor: entryFor.value,
      eventType: eventType.value,
      scheduleStartTime: dateStringToISO(scheduleStartTime.value),
      frequency: frequency.value,
      frequencyUnit: frequencyUnit.getData(),
      timeWindow: timeWindow.checked,
      settlementWindowLength: (timeWindow.checked) ? settlementWindowLength.value : 0,
      settlementWindowUnit: (timeWindow.checked) ? settlementWindowUnit.getData() : "HOURS",
      windowEndTime: (timeWindow.checked) ? windowEndTime.value : "24",
      netOff: autoNetOff.checked,
      autoDispersal: autoDispersal.checked,
      disableOnWeekend: disableWeekends.checked,
      disableOnHolidays: disableHolidays.checked,
      workflowType: workflowType.value,
      aggregateSettlement: aggregateSettlement.checked,
      invoiceGenerationThreshold: invoiceGenerationThreshold.value,
      salesRegisterRecords: salesRegisterRecords.checked

    });

    const invoicePayload = Object.assign({}, common, {
      channel: invoiceChannel.value
    });

    const disbursementPayload = Object.assign({}, common, {
      channel: disbursementChannel.value,
      mode: disbursementMode.value,
      autoRetry: autoRetry.checked,
      failReasons: failReasons.value
    });


    // if (this.state.onDemandActive === true) {
    //   var onDemandRuleUpdate = {
    //     // settlementRuleId: response.length ? response.id : "null",
    //     settlementRuleId: this.state.settlementRuleId,
    //     merchantId: this.state.merchantId,
    //     frequency: Number(frequencyOnDemand.value),
    //     eligibilityStartTime: Number(eligibilityStartTime.value),
    //     eligibilityEndTime: Number(eligibilityEndTime.value),
    //     thresholdAmount: Number(thresholdAmount.value),
    //     settlementInterval: Number(settlementInterval.value),
    //     active: active.value
    //   }
    // }

    // if (this.state.onDemandChecked === true) {
    //   var onDemandRuleCreate = {
    //     settlementRuleId: "",
    //     merchantId: this.state.merchantId,
    //     frequency: Number(frequencyOnDemand.value),
    //     eligibilityStartTime: Number(eligibilityStartTime.value),
    //     eligibilityEndTime: Number(eligibilityEndTime.value),
    //     thresholdAmount: Number(thresholdAmount.value),
    //     settlementInterval: Number(settlementInterval.value),
    //     active: activeCreate.value
    //   }
    // }


    // if (this.state.onDemandActive === true) {
    //   return {
    //     settlementRule: settlementPayload,
    //     invoice: invoicePayload,
    //     invoiceId: invoice.id,
    //     disbursement: disbursementPayload,
    //     disbursementId: disbursement.id,
    //     onDemand: onDemandRuleUpdate,
    //     onDemandId: this.state.merchantId
    //   }
    // }

    // if (this.state.onDemandChecked === true) {
    //   return {
    //     settlementRule: settlementPayload,
    //     invoice: invoicePayload,
    //     invoiceId: invoice.id,
    //     disbursement: disbursementPayload,
    //     disbursementId: disbursement.id,
    //     onDemand: onDemandRuleCreate,
    //     onDemandId: this.state.merchantId
    //   }
    // }

    return {
      settlementRule: settlementPayload,
      invoice: invoicePayload,
      invoiceId: invoice.id,
      disbursement: disbursementPayload,
      disbursementId: disbursement.id,
      onDemand: {},
      onDemandId: this.state.merchantId
    }
  }




  onTimeWindowToggle = (event) => {
    this.setState({
      timeWindowComponent: event.target.checked
    })
  }

  renderTimeWindowComponent = () => {

    const { settlementRule } = this.props;
    const timeWindowComponent = this.state.timeWindowComponent;

    return (
      <div>
        <div className="col-md-5">
          <label className="control-label">Settlement Window Length:</label>
          <input
            className="form-control" type="number" min="0"
            disabled={!timeWindowComponent} defaultValue={settlementRule.settlementWindowLength}
            ref="settlementWindowLength" />
        </div>

        <div className="col-md-3">
          <ScheduleFrequency disabled={!timeWindowComponent} defaultValue={settlementRule.settlementWindowUnit} ref="settlementWindowUnit" />
        </div>

        <div className="col-md-4">
          <label className="control-label">Window End Time:</label>
          <input
            className="form-control" type="text"
            placeholder="hh:mm:ss"
            defaultValue={settlementRule.windowEndTime}
            disabled={!timeWindowComponent}
            ref="windowEndTime" />
        </div>
      </div>
    )
  }

  handleEditDateChange = (id,date) => {
   
    let { scheduleTime } =this.state;
    let scheduleHour=[];
    let scheduleMin=[];
    let scheduledTime = new Date();
     scheduleTime=[];

     let newArray = this.state.schedulingRuleRequests.map((obj, idx) => {
     if (id == idx) {
     
       if (date) {         
         let value=date;
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
 

     this.setState({ schedulingRuleRequests:newArray, customChildTimeWindowComponent: false});

  };





  
  handleDateChange = (id,date) => {
    let { scheduleTime } =this.state;
    let scheduleHour=[];
    let scheduleMin=[];
    let scheduledTime = new Date();
     scheduleTime=[];
  
    let newArray = this.state.schedulingChildRequests.map((obj, idx) => {
    
      if (id == idx) {
    
        if (date) {
        
         let value = date.toLocaleTimeString()
          let newDate = value.split(":")
          let hour = parseInt(newDate[0])
          let minutes = parseInt(newDate[1])
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
   
   
    this.setState({ schedulingChildRequests:newArray, customChildTimeWindowComponent: true,
      customTimeWindowComponent: false});

  };
  AddRuleArray = (e) => {
  
    e.preventDefault();
    this.setState({
      schedulingChildRequests: this.state.schedulingChildRequests.concat([
        {
         
          scheduleFormat: {
            schedulingRuleUnit: "",
            scheduledHours: new Date().getHours(),
            scheduledMinutes:  new Date().getMinutes(),
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
      customChildTimeWindowComponent: true,
      customTimeWindowComponent: true
    });
  };


  AddArray = (e) => {
  
    e.preventDefault();
    this.setState({
      schedulingChildRequests: this.state.schedulingChildRequests.concat([
        {
         
          scheduleFormat: {
            schedulingRuleUnit: "",
            scheduledHours: new Date().getHours(),
            scheduledMinutes:  new Date().getMinutes(),
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
      customChildTimeWindowComponent: true,
      customTimeWindowComponent: false
    });
  };


  OnRemoveArray = id => {

    let deletedRules = this.state.schedulingChildRequests;
    deletedRules.splice(id, 1);

    this.setState({
      schedulingChildRequests: deletedRules
    });

  };

  onChangeRuleRequest = (itemType,itemNameId, id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.schedulingRuleUnit = e.target.value;
        } else {
          obj.scheduleFormat.schedulingRuleUnit = obj.scheduleFormat.schedulingRuleUnit;
        }
      }
      return obj;
    });

    this.setState({ setStateType: newArray });

  };

  
  onChangeWeek = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.dayOfWeek = e.target.value;
          obj.scheduleFormat.dayOfMonth = 0;
        } else {
          obj.scheduleFormat.dayOfWeek = 0;
        }
      }
      return obj;
    });

    this.setState({ setStateType: newArray });
  }
  onChangeScheduleHours = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.scheduledHours = Number(e.target.value);
        } else {
          obj.scheduleFormat.dayOfWeek = 0;
        }
      }
      return obj;
    });

    this.setState({ setStateType: newArray });
  }
  onChangeScheduleMinutes = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.scheduledMinutes = Number(e.target.value);
        } else {
          obj.scheduleFormat.dayOfWeek = 0;
        }
      }
      return obj;
    });
    this.setState({ setStateType: newArray });
  }

  onChangeMonth = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.dayOfMonth = e.target.value;
          obj.scheduleFormat.dayOfWeek = 0;
        } else {
          obj.scheduleFormat.dayOfMonth = 0;
        }
      }
      return obj;
    });

    this.setState({ setStateType: newArray });
  }

  onChangeFrequency = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.scheduleFormat.frequency = e.target.value;
        } else {
          obj.scheduleFormat.frequency = "";
        }
      }
      return obj;
    });

    this.setState({ setStateType: newArray });
  }

  onChangeActive = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    const { activeMessage }= this.state;
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.active = e.target.checked === true ? true : false;
        } else {
          obj.active = obj.active;
        }
      }
      return obj;
    });
    this.setState({ setStateType: newArray,activeMessage:!activeMessage });
  };

  onChangeWindowRuleUnit = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray =selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.schedulingRuleUnit = e.target.value;
        } else {
          obj.settlementWindow.schedulingRuleUnit = obj.settlementWindow.schedulingRuleUnit
        }
      }
      return obj;
    });
    this.setState({ setStateType: newArray,activeWindowMessage:true })
  }

  onChangeWindowLength = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.windowLength = Number(e.target.value);
        } else {
          obj.settlementWindow.windowLength = obj.settlementWindow.windowLength
        }
      }
      return obj;
    });
    this.setState({ setStateType: newArray })
  }

  onChangeEndTime = (itemType,id, e) => {
    let selectedType;
    let setStateType;
    if(itemType ==='parent'){
      selectedType = this.state.schedulingRuleRequests;
      setStateType = 'schedulingRuleRequests';
    }
    else {
      selectedType = this.state.schedulingChildRequests;
      setStateType = 'schedulingChildRequests';
    }
    let newArray = selectedType.map((obj, idx) => {
      if (id == idx) {
        if (e.target.value) {
          obj.settlementWindow.endTime = Number(e.target.value);
        } else {
          obj.settlementWindow.endTime = obj.settlementWindow.endTime
        }
      }
      return obj;
    });
    this.setState({ setStateType: newArray,activeWindowMessage:true })
  }

  renderCustomChildTimeComponent = (showType) => {
    const { showScheduleType } = this.props;
    const { activeMessage ,activeWindowMessage}= this.state;
    let data = this.state.schedulingChildRequests.length ? showType : []
    let scheduleWeekDay;
  
   
    return (<div style={{ width: '75%', marginLeft: '145px' }}>
      <div className="row">

        <div>
          {
            data.map((itemName, index) => {
              return <div style={{ boxShadow: "-1px 1px 7px -1px #888888", marginTop: 5 }}>
                <h4 style={Style}>Scheduling Rule</h4>
                <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                <div className="row" style={Style} >
                  <div className="form-group col-md-2">
                    <label className="control-label">Unit:</label>
                    <select
                      className="form-control"
                      value={itemName.scheduleFormat.schedulingRuleUnit}
                      onChange={e => {
                        this.onChangeRuleRequest('child',itemName.id, index, e);
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
                        className="form-control"
                        value={itemName.scheduleFormat.dayOfWeek}
                        onChange={e => {
                          this.onChangeWeek('child',index, e);
                        }}
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
                            this.onChangeMonth('child',index, e);
                          }}
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
                   <div className="col-md-2">
                     <label className="control-label">Scheduled Time:</label>
                      <TimeInput
                      mode='24h'
                      value={itemName.scheduleTime}
                      onChange={(time) => this.handleDateChange(index,time)}
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
                  <div className="col-md-2">
                  <label className="control-label">Frequency :</label>
                  <input
                className="form-control"
                type="number"
                min="1"
                required={true}
                ref="frequency"
                value={itemName.scheduleFormat.frequency}
                onChange={e =>
                  this.onChangeFrequency('child',index, e)
                }
                  />
                </div>
                }

                  <div className="col-md-1">

                    <div className="checkbox" >
                      <label style={{ marginTop: 20 }}>
                        <input

                          type="checkbox"
                          checked={itemName.active ? true : false}
                          onChange={(e) => this.onChangeActive('child',index, e)}
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
                    <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[itemName && itemName.scheduleFormat.dayOfWeek]} with the interval of 1 week</div>
                    :
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[(itemName && itemName.scheduleFormat.dayOfWeek) -1]} with the interval of 1 week.</div>
                   :  itemName && itemName.scheduleFormat.schedulingRuleUnit === "MONTHS" ?
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  on {itemName && itemName.scheduleFormat.dayOfMonth} day of month with the interval of 1 week.</div>
                   :itemName && itemName.scheduleFormat.schedulingRuleUnit === "DAYS" ?
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} day.</div>
                     : <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} hour.</div>
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
                        this.onChangeWindowRuleUnit('child',index, e);
                      }}
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
                        this.onChangeWindowLength('child',index, e)
                      }

                    />
                  </div>
                  {itemName && itemName.settlementWindow.schedulingRuleUnit === "DAYS"?
                  <div className="col-md-3">
                    <label className="control-label">End Time :</label>
                    <input
                      className="form-control"
                      type="text"
                      value={itemName.settlementWindow.endTime}
                      onChange={e =>
                        this.onChangeEndTime('child',index, e)
                      }
                    />
                  </div>
                  :""}
                  <div className="col-md-3">
                    <button
                      style={{ textAlign: "right", marginTop: 25 }}
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => this.AddArray(e)}
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
                         <div>Filter txns till {itemName && itemName.settlementWindow.endTime} hour same day .</div>
                          :
                         <div> Filter txns till {itemName && itemName.settlementWindow.endTime} hour {itemName && itemName.settlementWindow.windowLength} day before.</div>
                     : itemName && itemName.settlementWindow.schedulingRuleUnit === "HOURS" ?
                     itemName && itemName.settlementWindow.windowLength === 0?
                     <div>Filter txns till same hour</div>
                      :
                     <div> Filter txns till {itemName && itemName.settlementWindow.windowLength} hour before.</div>
                   
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "WEEKS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <div>Filter txns till 11.59.59 hour SUN same week.</div>
                    :
                   <div> Filter txns till 11.59.59  hour SUN {itemName && itemName.settlementWindow.windowLength} week before</div>
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "MONTHS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <div>Filter txn till first day of the same month</div>
                    :
                   <div> 
                   Filter txn till first day of {itemName && itemName.settlementWindow.windowLength} month before.</div>
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
  }

  renderCustomTimeComponent = (showType) => {
    const { showScheduleType } = this.props;
    const { activeMessage,activeWindowMessage }= this.state;
 
     let data = this.state.schedulingRuleRequests.length ? showType : []
     
  
     if(data.length != 0){
     dataList();
     }
    
     function dataList () {
          for(var i in data) {
 
         data = data.map((obj, idx) => {
         let scheduledTime = new Date();
           if (parseInt(i) === idx) {
        const scheduleHour=obj && obj.scheduleFormat && obj.scheduleFormat.scheduledHours;
        const scheduleMin=obj && obj.scheduleFormat && obj.scheduleFormat.scheduledMinutes; 
        scheduledTime.setHours(scheduleHour);
        scheduledTime.setMinutes(scheduleMin)
        obj.scheduleTime= scheduledTime;
        }
  
           return obj;
         });
          }
       }

    return (<div style={{ width: '75%', marginLeft: '145px' }}>
      <div className="row">

        <div>
          {
            data.map((itemName, index) => {
              return <div style={{ boxShadow: "-1px 1px 7px -1px #888888", marginTop: 5 }}>
                <h4 style={Style}>Scheduling Rule</h4>
                <hr style={{ marginTop: '0px', marginBottom: '0px' }} />
                <div className="row" style={Style} >
                  <div className="form-group col-md-2">
                    <label className="control-label">Unit:</label>
                    <select
                      className="form-control"
                      value={itemName.scheduleFormat.schedulingRuleUnit}
                      onChange={e => {
                        this.onChangeRuleRequest('parent',itemName.id, index, e);
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
                        className="form-control"
                        value={itemName.scheduleFormat.dayOfWeek}
                        onChange={e => {
                          this.onChangeWeek('parent',index, e);
                        }}
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
                            this.onChangeMonth('parent',index, e);
                          }}
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
                   <div className="col-md-2">
                     <label className="control-label">Scheduled Time:</label>
                      <TimeInput
                      mode='24h'
                      value={itemName.scheduleTime}
                      onChange={(time) => this.handleEditDateChange(index,time)}
                    />                        
                    </div> 
                  { itemName && itemName.scheduleFormat.schedulingRuleUnit === "WEEKS" ?
                  <div className="col-md-2">
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
                 <div className="col-md-2">
                 <label className="control-label">Frequency :</label>
                 <input
               className="form-control"
               type="number"
               min="1"
               required={true}
               ref="frequency"
               value={itemName.scheduleFormat.frequency}
               onChange={e =>
                 this.onChangeFrequency('parent',index, e)
               }
                 />
               </div>
            }

                  <div className="col-md-1">

                    <div className="checkbox" >
                      <label style={{ marginTop: 20 }}>
                        <input

                          type="checkbox"
                          checked={itemName.active ? true : false}
                          onChange={(e) => this.onChangeActive('parent',index, e)}
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
                    <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[itemName && itemName.scheduleFormat.dayOfWeek]} with the interval of 1 week</div>
                    :
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes} on {dayOfWeeksIndex[(itemName && itemName.scheduleFormat.dayOfWeek) -1]} with the interval of 1 week.</div>
                   :  itemName && itemName.scheduleFormat.schedulingRuleUnit === "MONTHS" ?
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  on {itemName && itemName.scheduleFormat.dayOfMonth} day of month with the interval of 1 week.</div>
                   :itemName && itemName.scheduleFormat.schedulingRuleUnit === "DAYS" ?
                   <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} day.</div>
                     : <div>Schedule rule at {itemName && itemName.scheduleFormat.scheduledHours}:{itemName && itemName.scheduleFormat.scheduledMinutes}  with interval of {itemName && itemName.scheduleFormat.frequency} hour.</div>
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
                        this.onChangeWindowRuleUnit('parent',index, e);
                      }}
                    >
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
                        this.onChangeWindowLength('parent',index, e)
                      }

                    />
                  </div>
                  {itemName && itemName.settlementWindow.schedulingRuleUnit === "DAYS"?
                  <div className="col-md-3">
                    <label className="control-label">End Time :</label>
                    <input
                      className="form-control"
                      type="text"
                      value={itemName.settlementWindow.endTime}
                      onChange={e =>
                        this.onChangeEndTime('parent',index, e)
                      }
                    />
                  </div>
                  :' '}
          
                  <div className="col-md-3">
                    <button
                      style={{ textAlign: "right", marginTop: 25 }}
                      type="button"
                      className="btn btn-primary"
                      onClick={(e) => this.AddArray(e)}
                    >
                      +
                      </button>
                      {/* {itemName && itemName.id !==  undefined ?
                     <button
                      style={{ textAlign: "right", marginTop: 25, marginLeft: 10 }}
                      type="button"
                      className="btn btn-danger"
                      onClick={e => this.OnRemoveArray(index)}
                    >
                      -
                  </button> 
                  :''
                } */}
                  </div>
                </div>
                <div className="row" style={{paddingLeft:25,marginTop:12}} >
                  {activeWindowMessage ?
                   itemName && itemName.settlementWindow.schedulingRuleUnit !== "" ?
                      itemName && itemName.settlementWindow.schedulingRuleUnit === "DAYS" ? 
                        itemName && itemName.settlementWindow.windowLength === 0?
                         <div>Filter txns till {itemName && itemName.settlementWindow.endTime} hour same day .</div>
                          :
                         <div> Filter txns till {itemName && itemName.settlementWindow.endTime} hour {itemName && itemName.settlementWindow.windowLength} day before.</div>
                     : itemName && itemName.settlementWindow.schedulingRuleUnit === "HOURS" ?
                     itemName && itemName.settlementWindow.windowLength === 0?
                     <div>Filter txns till same hour</div>
                      :
                     <div> Filter txns till {itemName && itemName.settlementWindow.windowLength} hour before.</div>
                   
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "WEEKS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <div>Filter txns till 11.59.59 hour SUN same week.</div>
                    :
                   <div> Filter txns till 11.59.59  hour SUN {itemName && itemName.settlementWindow.windowLength} week before</div>
                   : itemName && itemName.settlementWindow.schedulingRuleUnit === "MONTHS" ?
                   itemName && itemName.settlementWindow.windowLength === 0?
                   <div>Filter txn till first day of the same month</div>
                    :
                   <div> 
                   Filter txn till first day of {itemName && itemName.settlementWindow.windowLength} month before.</div>
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
  }

  render() {

    const { settlementRule, invoice, disbursement, report, onDemand, showSchedulingType } = this.props;
    let onDemandActive = onDemand == null ? false : true
    // onDemandActiveChecking: onDemand && onDemand.active === true ? true : false

    const fromPartyType = titleCase(settlementRule.fromPartyType);
    const toPartyType = titleCase(settlementRule.toPartyType);

    const fromParty = {
      id: settlementRule.fromParty,
      result: settlementRule.fromPartyShortName,
      entryType: fromPartyType
    }



    const toParty = {
      id: settlementRule.toParty,
      result: settlementRule.toPartyShortName,
      entryType: toPartyType
    }

    var modal = [];
    modal.push(
      <div className="modal" style={this.state.show ? display : hide}>
        <div className="modal-content">
          <h4>{this.state.resData ? "On-Demand Settlement Rule updated successfully!" : "Something went wrong!"}</h4><hr />
          <div> {this.state.resData ? <h5>Settlement Rule ID: {this.state.resData.settlementRuleId}</h5> : ""}</div>
          <div> {this.state.resData ? <h5>Merchant ID: {this.state.resData.merchantId}</h5> : ""}</div>

          <div className="modal-footer" style={{ background: "#fff", float: "right" }}>
            <a className="btn btn-primary" onClick={this.toggle}>Agree</a>
          </div>
        </div>
      </div>
    );

    var modal2 = [];
    modal2.push(
      <div className="modal" style={this.state.showCreate ? display : hide}>
        <div className="modal-content">
          <h4>{this.state.resDataCreate ? "On-Demand Settlement Rule created successfully!" : "Something went wrong!"}</h4><hr />
          <div> {this.state.resDataCreate ? <h5>Settlement Rule ID: {this.state.resDataCreate.settlementRuleId}</h5> : ""}</div>
          <div> {this.state.resDataCreate ? <h5>Merchant ID: {this.state.resDataCreate.merchantId}</h5> : ""}</div>

          <div className="modal-footer" style={{ background: "#fff", float: "right" }}>
            <a className="btn btn-primary" onClick={this.toggleCreate}>Agree</a>
          </div>
        </div>
      </div>
    );


    return (
      <div className="page-container">
        <Form
          {...this.props}
          recordType="settlement"
          serializeForm={this.getData}
          submitAction={this.props.editSettlementRule}
          editStatus={true}
          id={settlementRule.id}>
          <h1 className="page-header">
            Create Settlement Rule
          </h1>

          <div>

            {modal}

          </div>

          <div>
            {modal2}
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Name:</label>
                <input
                  className="form-control" type="text"
                  required={true} defaultValue={settlementRule.name}
                  ref="name" />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <div className="form-group">
                  <label className="control-label">Schedule Start Time:</label>
                  <input
                    className="form-control" type="text"
                    placeholder="DD/MM/YYYY 12:00 am"
                    required={true} defaultValue={settlementRule.scheduleStartTime ? epochToISO(settlementRule.scheduleStartTime) : ""}
                    ref="scheduleStartTime" />
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Settlement Tag:</label>
                <input
                  className="form-control" type="text"
                  required={true} defaultValue={settlementRule.settlementTag}
                  ref="settlementTag" />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <label className="control-label">Frequency:</label>
                <input
                  className="form-control" type="number" min="0"
                  required={true} defaultValue={settlementRule.frequency}
                  ref="frequency" />
              </div>

              <div className="col-md-3">
                <ScheduleFrequency
                  ref="frequencyUnit" defaultValue={settlementRule.frequencyUnit} />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <PartySearchFormGroup
                  ref="fromPartySearch"
                  forComponent="report"
                  beingEdited={true}
                  party={fromParty}
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
                  className="form-control" type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  required={true} defaultValue={settlementRule.effectiveFrom ? epochToISO(settlementRule.effectiveFrom) : ""}
                  ref="effectiveFrom" />
              </div>

              <div className="col-md-3">
                <label className="control-label">Effective To:</label>
                <input
                  className="form-control" type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  required={true} defaultValue={settlementRule.effectiveTo ? epochToISO(settlementRule.effectiveTo) : ""}
                  ref="effectiveTo" />
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <PartySearchFormGroup
                  ref="toPartySearch"
                  forComponent="report"
                  beingEdited={true}
                  party={toParty}
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

              <div className="col-md-offset-1 col-md-6">
                <div className="checkbox">
                  <label>
                    <input
                      ref="timeWindow"
                      type="checkbox"
                      defaultChecked={settlementRule.timeWindow}
                      onChange={this.onTimeWindowToggle} />
                    Time Window
                  </label>
                </div>
                {this.renderTimeWindowComponent()}
              </div>

            </div>
          </div>
          <br />

          {/* {
            settlementRule.schedulingType === "COMPOSITE" || "MULTIPLE" ? <div>{this.renderCustomTimeComponent(showSchedulingType)} </div> : ""
          } */}


          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Transaction Type:</label>
                <input
                  className="form-control" type="text"
                  required={true} defaultValue={settlementRule.transactionType}
                  ref="transactionType" />
              </div>

              <div className="col-md-offset-1 col-md-3">
                <div className="form-group">
                  <label className="control-label">Workflow Type:</label>
                  <select
                    className="form-control"
                    required={true}
                    defaultValue={settlementRule.workflowType}
                    ref="workflowType">
                    {
                      workflowTypes.map((workflowType) => {
                        return (<option key={`sub-option-${workflowType}`}>{workflowType}</option>);
                      })
                    }
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
                  className="form-control" type="text"
                  required={true} defaultValue={settlementRule.entryFor}
                  ref="entryFor" />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="autoNetOff" defaultChecked={settlementRule.netOff} />
                  Auto Netoff</label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="autoDispersal" defaultChecked={settlementRule.autoDispersal} />
                  Auto Process</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Event Type:</label>
                <input
                  className="form-control" type="text"
                  required={true} defaultValue={settlementRule.eventType}
                  ref="eventType" />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableWeekends" defaultChecked={settlementRule.disableOnWeekend} />
                  Disable on Weekends</label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableHolidays" defaultChecked={settlementRule.disableOnHolidays} />
                  Disable on Holidays</label>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Invoice Generation Threshold ( paise ):</label>
                <input
                  className="form-control" type="number" min={0} defaultValue={settlementRule.invoiceGenerationThreshold}
                  required={true}
                  ref="invoiceGenerationThreshold" />
              </div>
            </div>

            <div className="col-md-offset-1 col-md-6">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" defaultChecked={settlementRule.aggregateSettlement}
                    ref="aggregateSettlement" />Aggregate Settlement</label>
              </div>

              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" defaultChecked={settlementRule.salesRegisterRecords}
                    ref="salesRegisterRecords" />Record Sales Register Entries</label>
              </div>

              {/* <div className="form-group checkbox">
                <label>
                  <input
                    // disabled={true}
                    type="checkbox"
                    checked={onDemand && onDemand.active ? onDemand.active : this.state.onDemandChecked}
                    onChange={this.onToggle}
                  />
                  On Demand Settlement
                </label>
              </div> */}

              {
                this.state.toPartyType === "Merchant" ?
                  <>
                    {
                      onDemandActive ?
                        <div className="form-group checkbox">
                          <label>
                            <input
                              type="checkbox"
                              checked={onDemandActive}
                              onChange={this.onToggleActive}
                            />
                            On Demand Settlement
                </label>
                        </div> : <div className="form-group checkbox">
                          <label>
                            <input
                              // disabled={true}
                              type="checkbox"
                              checked={this.state.onDemandChecked}
                              onChange={this.onToggle}
                            />
                            On Demand Settlement
                </label>
                        </div>

                    }
                  </> : <div className="form-group checkbox">
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
            
              <div className="form-group checkbox">
                <div className="checkbox">
                  <label>
                    <input
                      // ref="timeWindow"
                      type="checkbox"
                      checked={this.state.onCustomWindowChecked}
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
                  style={{ marginTop: 10 }}
                  type="button"
                  className="btn btn-primary"
                  onClick={this.AddRuleArray}
                >
                  Add Rule
                    </button>

                {/* {this.renderCustomTimeComponent()} */}
              </div> : ""
          }
            </div>
            
          </div>
         

          {
            this.renderCustomTimeComponent(this.state.schedulingRuleRequests)
          }
           {
            this.state.customChildTimeWindowComponent === true ? this.renderCustomChildTimeComponent(this.state.schedulingChildRequests) : ""
          }
          {
            onDemandActive && this.state.toPartyType === "Merchant" &&
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
                      On Demand settlement update
                  </legend>
                  </fieldset>
                  <form onSubmit={this.onSubmitUpdate} >
                    <div className="row">
                      <div className="form-group">
                        <div className="col-md-5">
                          <label className="control-label">Frequency:</label>
                          <input
                            className="form-control"
                            type="number"
                            required={true}
                            ref="frequencyOnDemand"
                            defaultValue={onDemand && onDemand.frequency ? onDemand && onDemand.frequency : ""}
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
                              defaultValue={onDemand && onDemand.eligibilityStartTime ? onDemand &&  onDemand.eligibilityStartTime : ""}
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
                            defaultValue={onDemand && onDemand.thresholdAmount ?onDemand && onDemand.thresholdAmount : ""}
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
                              defaultValue={onDemand && onDemand.eligibilityEndTime ? onDemand && onDemand.eligibilityEndTime : ""}
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
                            defaultValue={onDemand && onDemand.settlementInterval ? onDemand &&  onDemand.settlementInterval : ""}
                            name="settlementInterval"
                            onChange={this.onChangeDemand}
                          />
                        </div>

                        <div className="col-md-offset-1 col-md-3">
                          <div className="form-group">
                            <label className="control-label">Active :</label>
                            <select
                              className="form-control"
                              required={true}
                              defaultValue={this.state.onDemandActiveChecking === true ? "true" : "false"}
                              ref="active"

                            >
                              {
                                dropDownList.map((item) => {
                                  return (<option key={`sub-option-${item.value}`}>{item.name}</option>);
                                })
                              }
                            </select>

                          </div>
                        </div>
                      </div>
                    </div>

                    {
                      this.state.isSuccess === true ? <button type="submit" disabled={true} className="btn btn-primary" style={{ float: "right" }}>Updated successfully!!</button> :

                        <button type="submit" className="btn btn-primary" style={{ float: "right" }} onClick={this.onSubmitUpdate}>Update</button>
                    }


                  </form>
                </div>
              </div>
            </>
          }




          {
            this.state.onDemandChecked && <>
              <div className="panel panel-default">
                <div className="panel-body" >
                  <fieldset>
                    <legend
                      data-toggle="collapse"
                      data-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      On Demand settlement Create
                </legend>
                  </fieldset>
                  <form onSubmit={this.onSubmitCreate}>
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
                              defaultValue={0}
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
                              defaultValue={0}
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
                              // defaultValue={onDemand && onDemand.active ? "true" : "false"}
                              ref="activeCreate">
                              {
                                activeStatus2.map((item) => {
                                  return (<option key={`sub-option-${item}`}>{item}</option>);
                                })
                              }
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {
                      this.state.isSuccess === true ? <button type="submit" disabled={true} className="btn btn-primary" style={{ float: "right" }}>Created successfully!!</button> :

                        <button type="submit" className="btn btn-primary" style={{ float: "right" }} onClick={this.onSubmitCreate}>Create</button>
                    }
                  </form>
                </div>
              </div>
            </>
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
                  defaultValue={disbursement && disbursement.channel}
                  ref="disbursementChannel">
                  {
                    disbursementChannelTypes.map((disbursementChannel) => {
                      return (<option key={`sub-option-${disbursementChannel}`}>{disbursementChannel}</option>);
                    })
                  }
                </select>
              </div>
            </div>

            <div className="col-md-offset-1 col-md-5">
              <div className="form-group">
                <label className="control-label">Channel:</label>
                <select
                  className="form-control"
                  required={true}
                  defaultValue={invoice && invoice.channel}
                  ref="invoiceChannel">
                  {
                    invoiceChannelTypes.map((invoiceChannel) => {
                      return (<option key={`sub-option-${invoiceChannel}`}>{invoiceChannel}</option>);
                    })
                  }
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
                  required={true} defaultValue={disbursement && disbursement.mode}
                  ref="disbursementMode">
                  {
                    disbursementModeTypes.map((disbursementMode) => {
                      return (<option key={`sub-option-${disbursementMode}`}>{disbursementMode}</option>);
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="form-group">
              <div className="col-md-5">
                <label className="control-label">Fail Reasons:</label>
                <input
                  className="form-control" type="text"
                  required={true} defaultValue={disbursement && disbursement.failReasons}
                  ref="failReasons" />
              </div>
            </div>
          </div>

          <br />

          <div className="row">
            <div className="col-md-5 form-group">
              <div className="checkbox">
                <label>
                  <input type="checkbox" ref="autoRetry" defaultChecked={ disbursement && disbursement.autoRetry} />
                  Auto Retry</label>
              </div>
            </div>
          </div>

          <button
            className="btn btn-lg btn-block btn-success"
            type="submit">Create Settlement Rule</button>

          <div className="col-md-6 form-group">
            or <Link to={routes.ROOT_PATH}>cancel</Link>
          </div>
        </Form>
      </div >
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditSettlement);
