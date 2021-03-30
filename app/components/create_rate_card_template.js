import React from "react";
import { connect } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import classNames from "classnames";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import apiFetch from "utils/api_fetch";
import Form from "components/form";
import Input from "components/input";
import RulesFormBox from "components/rules_form_box";
import PartySearchFormGroup from "components/party_search_form_group";
import { extractRuleFromStore } from "utils/extract_data_from_store";
import * as routes from "routes";
import CloneRateTemplateModal from "components/clone_rateCard";
import EntryTypeFormGroup from 'components/entry_type_form_group';
import { getDefaultEffectiveFrom, getDefaultEffectiveTo, dateStringToISO } from "utils/helpers";

class CreateRateCardtTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

      waiver: false,
      isAddRuleEnabled: false,
      shortId: "",
      selectedData: [],
      openModal: false,
      rateCardId: "",
      rateCardTemplateId: "",
      disabled: true,
      enabled: false,
      rules: [],
      type: "",
      name: "",
      entryFor: "",
      txnType: "",
      entryType: "",
      slabbedFee: false,
      slabbedFees: [],
      commission: false,
      countBasedWaiver: false,
      filterExpression: "",
      perTransaction: false,
      systemReversible: false,
      taxable: false,
      timeBasedWaiver: false,
      waiverLimitCount: "",
      taxExemptionThreshold: "",
      waiverStartDate: "",
      waiverEndDate: "",
      value: "0",
      rate: false,


      createRule: true,
      cloneTemplate: false,

      duplicate: null,

      open: false,
      openSuccess: false,
      success: "",
      newRules: [],
      dd: [],
      Parties: [],
      fromPartyDetails: [],
      toPartyDetails: [],
      selectedCard: {},
      newData: {},
      fromPartyType: "",
      toPartyType: ""

    };
  }

  onOpenMainModal = () => {
    this.setState({ openModal: false })
  }

  componentWillUnmount() {
    this.props.locationChange();

  }

  onOpenSuccess = () => {
    this.setState({ openSuccess: true })
  }

  onCloseSuccess = () => {
    this.setState({ openSuccess: false })
  }


  onOpen = () => {
    this.setState({ open: true })
  }

  onClose = () => {
    this.setState({ open: false })
  }

  onSelection = (id, shortId, selectedData) => {


    const { rateCardRules } = selectedData
    // this.getParties(rateCardRules)
    if (rateCardRules) {
      rateCardRules.map(item => this.setState({
        type: item.type,
        name: item.name,
        filterExpression: item.filterExpression,
        entryFor: item.entryFor,
        entryType: item.entryType,
        transactionType: item.transactionType,
        fromParty: item.fromParty,
        fromPartyType: item.fromPartyType,
        slabbedFee: item.basicFee.slabbedFee,
        slabbedFees: item.basicFee.slabbedFees ? item.basicFee.slabbedFees : [],
        commission: item.commission,
        countBasedWaiver: item.countBasedWaiver,
        perTransaction: item.perTransaction,
        systemReversible: item.systemReversible,
        taxable: item.taxable,
        timeBasedWaiver: item.timeBasedWaiver,
        waiverLimitCount: item.waiverLimitCount,
        taxExemptionThreshold: item.taxExemptionThreshold,
        waiverStartDate: item.waiverStartDate,
        waiverEndDate: item.waiverEndDate,
        value: item.basicFee.value,
        rate: item.basicFee.rate,
        fromExpression: item.fromExpression,
        toParty: item.toParty,
        toPartyType: item.toPartyType,
        toExpression: item.toExpression,
      }))
    }
    this.getParties(rateCardRules)
    this.setState({ rateCardId: id, shortId, selectedData, openModal: false, enabled: true, rules: rateCardRules });

  };




  getParties = (rateCardRules) => {

    // const { rules } = this.state
    let url = "v1/interchange"
    let url2 = "v1/merchant"

    // let { rateCardRules } = this.state.selectedData;

    rateCardRules.length ? rateCardRules.map((item, index) => {

      if (item.fromPartyType === "INTERCHANGE") {
        apiFetch.get(`${url}/${item.fromParty}`).then(res => {
          if (res) {
            rateCardRules[index] = {
              ...rateCardRules[index],
              fromParty: res.id,
              ["fromPartyShortName"]: res.interchangeId,
              ["fromPartyName"]: res.name
            }

            this.setState({
              newData: {
                ...this.state.selectedData,
                rateCardRules
              }
            })
          }
        })
      }
      if (item.toPartyType === "INTERCHANGE") {
        apiFetch.get(`${url}/${item.toParty}`).then(res => {
          if (res) {
            rateCardRules[index] = {
              ...rateCardRules[index],
              toParty: res.id,
              ["toPartyShortName"]: res.interchangeId,
              ["toPartyName"]: res.name
            }
            this.setState({
              newData: {
                ...this.state.selectedData,
                rateCardRules
              }
            })
          }
        })
      }

      if (item.fromPartyType === "MERCHANT") {
        return apiFetch.get(`${url2}/${item.fromParty}`).then(res => {
          if (res) {
            rateCardRules[index] = {
              ...rateCardRules[index],
              fromParty: res.id,
              ["fromPartyShortName"]: res.merchantId,
              ["fromPartyName"]: res.name
            }
            this.setState({
              newData: {
                ...this.state.selectedData,
                rateCardRules
              }
            })
          }
        })
      }
      if (item.toPartyType === "MERCHANT") {
        return apiFetch.get(`${url2}/${item.toParty}`).then(res => {
          if (res) {
            rateCardRules[index] = {
              ...rateCardRules[index],
              toParty: res.id,
              ["toPartyShortName"]: res.merchantId,
              ["toPartyName"]: res.name
            }
            this.setState({
              newData: {
                ...this.state.selectedData,
                rateCardRules
              }
            })
          }
        })
      }
      // if (res.length) {
      //   this.setState({
      //     newData: this.state.selectedData
      //   })
      // }

    }) : ""

  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  getRateCardData = () => {
    const { shortId } = this.refs;

    return {
      shortId: shortId.value(),
      merchant:
        this.props.report.merchantDetails &&
          this.props.report.merchantDetails.locked
          ? this.props.report.merchantDetails.details[
            this.props.report.merchantDetails.index
          ].result
          : "",
      pgId:
        this.props.report.pgId && this.props.report.pgId.locked
          ? this.props.report.pgId.details[this.props.report.pgId.index].result
          : "",
      providerName:
        this.props.report.providerDetails &&
          this.props.report.providerDetails.locked
          ? this.props.report.providerDetails.details[
            this.props.report.providerDetails.index
          ].result
          : ""
    };
  };

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



  getBasicRateCardRule = () => {

    const { rateCardRules } = this.state.newData

    let newRules = rateCardRules.map(rule => {
      return {
        type: rule.type,
        data: {
          name: rule.name,
          entryFor: rule.entryFor,
          transactionType: rule.transactionType,
          entryType: rule.entryType,
          slabbedFee: rule.basicFee.slabbedFee,
          slabbedFees: rule.basicFee.slabbedFees,
          commission: rule.commission,
          countBasedWaiver: rule.countBasedWaiver,
          filterExpression: rule.filterExpression,
          perTransaction: rule.perTransaction,
          systemReversible: rule.systemReversible,
          taxable: rule.taxable,
          timeBasedWaiver: rule.timeBasedWaiver,
          waiverLimitCount: rule.waiverLimitCount,
          taxExemptionThreshold: rule.taxExemptionThreshold,
          waiverStartDate: rule.timeBasedWaiver === true ? rule.waiverStartDate : "",
          waiverEndDate: rule.timeBasedWaiver === true ? rule.waiverEndDate : "",
          value: rule.basicFee.value,
          rate: rule.basicFee.rate,
          fromParty: rule.fromParty,
          fromPartyType: rule.fromPartyType,
          fromExpression: rule.fromExpression,
          toParty: rule.toParty,
          toPartyType: rule.toPartyType,
          toExpression: rule.toExpression,
        }
      }
    })
    return newRules
  }

  componentDidMount() {
    // this.onAddRule()

    this.setState({ isAddRuleEnabled: true });
  }

  getData = () => {
    const rateCardDetails = this.getRateCardData();
    const rules = this.getRules()
    return {
      rateCardDetails,
      rules
    };
  };

  getRules = () => {
    return this.props.newRuleset.rules.map(extractRuleFromStore);
  };





  OnSubmitAction = (e) => {
    this.onClose()
    e.preventDefault()

    const { shortId } = this.refs


    const rateCardDetails = {
      shortId: shortId.value(),
      merchant:
        this.props.report.merchantDetails &&
          this.props.report.merchantDetails.locked
          ? this.props.report.merchantDetails.details[
            this.props.report.merchantDetails.index
          ].result
          : "",
      pgId:
        this.props.report.pgId && this.props.report.pgId.locked
          ? this.props.report.pgId.details[this.props.report.pgId.index].result
          : "",
      providerName:
        this.props.report.providerDetails &&
          this.props.report.providerDetails.locked
          ? this.props.report.providerDetails.details[
            this.props.report.providerDetails.index
          ].result
          : ""
    };

    let rules = this.getBasicRateCardRule()
    this.props.createRateCardTemplate({ rateCardDetails, rules })

  }

  redirectFunction = () => {
    return <Redirect to={routes.LIST_RATE_CARD_TEMPLATE_PATH} />
  }

  onRenderSuccessModal = (message) => {

    return <div>
      {this.state.openSuccess && <div id="myModal" className="modal" style={{ width: 500, height: 500, textAlign: "center", marginLeft: "30%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" onClick={this.onCloseSuccess}>&times;</button>
            <h4 className="modal-title">Success!</h4><hr />
          </div>
          <div className="modal-body" style={{ height: 150, width: 400 }}>
            <p>{message}</p>
            <p></p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onCloseSuccess}>Close</button>
          </div>
          {/* <div className="modal-footer">
            <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onO}>Submit</button>
          </div> */}
        </div>
      </div>
      }
    </div>

  }

  onCheckingDuplicate = async (e) => {

    const { rateCardRules } = this.state.newData

    e.preventDefault()

    const url2 = "v1/rateCardTemplate/duplicate"

    let newRules = rateCardRules.map(rule => {
      return {
        name: rule.name,
        entryFor: rule.entryFor,
        transactionType: rule.transactionType,
        entryType: rule.entryType,
        slabbedFee: rule.basicFee.slabbedFee,
        slabbedFees: rule.basicFee.slabbedFees,
        commission: rule.commission,
        countBasedWaiver: rule.countBasedWaiver,
        filterExpression: rule.filterExpression,
        perTransaction: rule.perTransaction,
        systemReversible: rule.systemReversible,
        taxable: rule.taxable,
        timeBasedWaiver: rule.timeBasedWaiver,
        waiverLimitCount: rule.waiverLimitCount,
        taxExemptionThreshold: rule.taxExemptionThreshold,
        waiverStartDate: rule.timeBasedWaiver === true ? rule.waiverStartDate : "",
        waiverEndDate: rule.timeBasedWaiver === true ? rule.waiverEndDate : "",
        value: rule.basicFee.value,
        rate: rule.basicFee.rate,
        fromParty: rule.fromParty,
        fromPartyType: rule.fromPartyType,
        fromExpression: rule.fromExpression,
        toParty: rule.toParty,
        toPartyType: rule.toPartyType,
        toExpression: rule.toExpression,
        rateCardTemplateId: "string"
      }
    })

    // const body1 = [{
    //   name: this.state.name,
    //   entryFor: this.state.entryFor,
    //   transactionType: this.state.transactionType,
    //   entryType: this.state.entryType,
    //   slabbedFee: this.state.slabbedFee,
    //   slabbedFees: this.state.slabbedFees,
    //   commission: this.state.commission,
    //   countBasedWaiver: this.state.countBasedWaiver,
    //   filterExpression: this.state.filterExpression,
    //   perTransaction: this.state.perTransaction,
    //   systemReversible: this.state.systemReversible,
    //   taxable: this.state.taxable,
    //   timeBasedWaiver: this.state.timeBasedWaiver,
    //   waiverLimitCount: this.state.waiverLimitCount,
    //   taxExemptionThreshold: this.state.taxExemptionThreshold,
    //   waiverStartDate: this.state.timeBasedWaiver === false ? this.state.waiverStartDate : "",
    //   waiverEndDate: this.state.timeBasedWaiver === false ? this.state.waiverEndDate : "",
    //   value: this.state.value,
    //   rate: this.state.rate,
    //   fromParty: this.state.fromParty,
    //   fromPartyType: this.state.fromPartyType,
    //   fromExpression: false,
    //   toParty: this.state.toParty,
    //   toPartyType: this.state.toPartyType,
    //   toExpression: false,
    //   rateCardTemplateId: "string"
    // }]

    // await this.props.createBasicRateCardRule(body1, this.state.rateCardTemplateId)

    // await apiFetch.post(url2, body1).then(res => this.setState({
    //   duplicate: res.duplicate
    // }))

    await apiFetch.post(url2, newRules).then(res => {
      if (res.duplicate === true) {
        this.setState({
          duplicate: res
        })
        this.onOpen()
        this.onRenderDuplicateModal(res)
      } else {
        this.setState({
          duplicate: res
        })

        this.onOpen()
        this.onRenderDuplicateModal(res)
      }
    })
  }


  onAddRule = event => {
    if (!this.state.isAddRuleEnabled) {
      this.setState({ isAddRuleEnabled: true });
      event.preventDefault();
      return;
    } else {
      event.preventDefault();
      const index = Date.now();
      this.props.addRule(index);
    }
  };


  onChangeValueName = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.name = value;
    this.setState({ selectedData, name: value })
  };

  onChangeValueEntryFor = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.entryFor = value;
    this.setState({ selectedData, entryFor: value })
  }

  onChangeTransactionType = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.transactionType = value;
    this.setState({ selectedData, transactionType: value })
  }

  onChangeFilterExpression = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.filterExpression = value;
    this.setState({ selectedData, filterExpression: value })
  }

  onChangeEntryType = (id, e) => {
    const { defaultValue } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.entryType = defaultValue;
    this.setState({ selectedData, entryType: defaultValue })
  }

  onChangeSystemReversible = (MainId, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === MainId)[0];
    if (checked === true) {
      selectedCard.systemReversible = true
      this.setState({ selectedData, systemReversible: true })
    } else {
      selectedCard.systemReversible = false
      this.setState({ selectedData, systemReversible: false })
    }

  }

  onChangePerTransaction = (MainId, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === MainId)[0];
    if (checked === true) {
      selectedCard.perTransaction = true
      this.setState({ selectedData, perTransaction: true })
    } else {
      selectedCard.perTransaction = false
      this.setState({ selectedData, perTransaction: false })
    }

  }

  onChangeComission = (MainId, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === MainId)[0];
    if (checked === true) {
      selectedCard.commission = true
      selectedCard.taxable = false
      this.setState({ selectedData, commission: true, taxable: false })
    } else {
      selectedCard.commission = false
      this.setState({ selectedData, commission: false })
    }

  }


  onChangeTaxable = (id, e) => {
    const { checked } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.taxable = true
      selectedCard.commission = false

      this.setState({ selectedData, taxable: true, commission: false })
    } else {

      selectedCard.taxable = false
      this.setState({ selectedData, taxable: false })
    }
  }

  onChangeTaxExemption = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.taxExemptionThreshold = value
    this.setState({ selectedData, taxExemptionThreshold: value })
  }

  onChangeWaiver = (id, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.waiver = true
      this.setState({ selectedData, waiver: true })
    } else {
      selectedCard.waiver = false
      selectedCard.countBasedWaiver = false
      selectedCard.timeBasedWaiver = false
      this.setState({ selectedData, waiver: false, countBasedWaiver: false, timeBasedWaiver: false })
    }
  }

  onChangeCountBasedWaiver = (id, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.countBasedWaiver = true
      selectedCard.timeBasedWaiver = false
      this.setState({ selectedData, countBasedWaiver: true, timeBasedWaiver: false })
    } else {
      selectedCard.countBasedWaiver = false
      this.setState({ selectedData, countBasedWaiver: false })
    }
  }

  onChangeTimeBasedWaiver = (id, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.timeBasedWaiver = true
      selectedCard.countBasedWaiver = false
      this.setState({ selectedData, timeBasedWaiver: true, countBasedWaiver: false })
    } else {
      selectedCard.timeBasedWaiver = false
      this.setState({ selectedData, timeBasedWaiver: false })
    }
  }

  onChangeWaiverStartDate = (id, e) => {
    const { defaultValue } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.waiverStartDate = defaultValue;
    this.setState({ selectedData, waiverStartDate: defaultValue })
  }

  onChangeWaiverEndDate = (id, e) => {
    const { defaultValue } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.waiverEndDate = defaultValue;
    this.setState({ selectedData, waiverEndDate: defaultValue })
  }

  onChangeWaiverLimitCount = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.waiverLimitCount = Number(value);
    this.setState({ selectedData, waiverLimitCount: Number(value) })
  }

  onChangeCheckbox = event => {
    this.setState({ [event.target.id]: !this.state[event.target.id] });
  };

  onChangeCheckboxRate = event => {
    this.setState({ rate: !this.state.rate, slabbedFee: false })
  }

  onChangeCheckboxSlabbed = event => {
    this.setState({ slabbedFee: !this.state.slabbedFee, rate: false })
  }


  onChangeRateValue = (id, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    selectedCard.basicFee.value = value

    this.setState({ selectedData, value: value })
  }

  onChangeSlabbed = (id, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.basicFee.slabbedFee = true
      selectedCard.basicFee.rate = false
      this.setState({ selectedData, slabbedFee: true, rate: false })
    } else {
      selectedCard.basicFee.slabbedFee = false
      this.setState({ selectedData, slabbedFee: false })
    }
  }


  // AddNestedArray = (itemId, slabId, index, e) => {
  //   e.preventDefault();

  //   let { selectedData } = this.state;
  //   let { rateCardRules } = selectedData;
  //   let selectedCard = rateCardRules.filter((obj) => obj.id === itemId)[0];
  //   // let selectSlab = selectedCard.basicFee.slabbedFees.filter((slab, idx) => idx === index)[0];

  //   if (selectedCard.basicFee.slabbedFee === true) {

  //     selectedCard.basicFee.slabbedFees.push({
  //       id: index,
  //       fromAmount: "",
  //       toAmount: "",
  //       value: "",
  //       rate: ""
  //     })


  //   } else {
  //     selectedCard.basicFee.slabbedFees == []
  //   }

  //   this.setState({ selectedData })

  // };




  onChangeRate = (id, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === id)[0];
    if (checked === true) {
      selectedCard.basicFee.slabbedFee = false
      selectedCard.basicFee.rate = true
      this.setState({ selectedData, rate: true })
    } else {
      selectedCard.basicFee.rate = false
      this.setState({ selectedData, rate: false })
    }
  }

  onChangeSlabbedFromAmount = (itemId, slabId, e) => {



    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === itemId)[0];
    let slabCard = selectedCard.basicFee.slabbedFees.filter(slab => slab.id === slabId)[0];

    slabCard.fromAmount = Number(value)

    this.setState({ selectedData })
  }

  onChangeSlabbedtoAmount = (itemId, slabId, e) => {

    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === itemId)[0];
    let slabCard = selectedCard.basicFee.slabbedFees.filter(slab => slab.id === slabId)[0];

    slabCard.toAmount = Number(value)

    this.setState({ selectedData })
  }

  onChangeSlabbedValue = (itemId, slabId, e) => {
    const { value } = e.target;
    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === itemId)[0];
    let slabCard = selectedCard.basicFee.slabbedFees.filter(slab => slab.id === slabId)[0];

    slabCard.value = Number(value)

    this.setState({ selectedData })
  }

  onChangeSlabRate = (itemId, slabId, e) => {
    const { checked } = e.target;

    let { selectedData } = this.state;
    let { rateCardRules } = selectedData;
    let selectedCard = rateCardRules.filter(obj => obj.id === itemId)[0];
    let slabCard = selectedCard.basicFee.slabbedFees.filter(slab => slab.id === slabId)[0];
    if (checked === true) {
      slabCard.rate = true
      this.setState({ selectedData })
    } else {
      slabCard.rate = false
      this.setState({ selectedData })
    }
  }

  renderSearchResult = (data) => {

    return data.rateCardRules && data.rateCardRules.length ?
      data.rateCardRules.map(item => {

        return <div className="panel panel-default" key={item.id}>
          <div className="panel-body" >
            <fieldset>
              <legend
                data-toggle="collapse"
                data-target="#collapseExample1"
                aria-expanded="false"
                aria-controls="collapseExample"
              >
                {item.name}
              </legend>
            </fieldset>
            <div className="row shadow p-3 mb-5 bg-white rounded" style={{ marginBottom: 5 }}>
              <div className="col-md-6">

                <div className="form-group">
                  <label className="control-label">Type:</label>
                  <input
                    className="form-control" type="text"
                    required={true}
                    value={item.type}
                    name="name"
                    disabled
                  />
                </div>

                <div className="form-group">
                  <label className="control-label">Name:</label>
                  <input
                    className="form-control" type="text"
                    required={true}
                    value={item.name}
                    name="name"
                    onChange={(e) => this.onChangeValueName(item.id, e)}
                  />
                </div>
                <div className="form-group">
                  <label className="control-label">Entry For:</label>
                  <input
                    className="form-control" type="text"
                    required={true}
                    value={item.entryFor}
                    onChange={(e) => this.onChangeValueEntryFor(item.id, e)}
                    // defaultValue={preFilledTemplate.entryFor ? preFilledTemplate.entryFor : ""}
                    // onChange={this.props.onRuleChange}
                    ref="entryFor" />
                </div>
                <div className="form-group">
                  <label className="control-label">Transaction Type:</label>
                  <input
                    className="form-control" type="text"
                    required={true}
                    value={item.transactionType}
                    // defaultValue={preFilledTemplate.transactionType ? preFilledTemplate.transactionType : ""}
                    onChange={(e) => this.onChangeTransactionType(item.id, e)}
                    ref="txnType" />
                </div>
                <p className="lead clearfix"></p>
                <div className="form-group checkbox">
                  <label>
                    <input type="checkbox"
                      id="filterExpression"
                      checked={this.state.filterExpression ? true : false}
                      // checked={(this.state.filterExpression || preFilledTemplate.filterExpression) ? true : false}
                      onChange={this.onChangeCheckbox}
                      ref="filterExpression" />Filter</label>
                </div>


                {this.state.filterExpression !== "" &&
                  <div className="form-group">
                    <label className="control-label">Filter Expression:</label>
                    <input
                      className="form-control" type="text"
                      required={true}
                      value={item.filterExpression}
                      onChange={(e) => this.onChangeFilterExpression(item.id, e)}
                      ref="filterExpressionText" />
                  </div>
                }

                {/* <div className="form-group">
              <label className="control-label">Filter Expression:</label>
              <input
                className="form-control" type="text"
                required={true}
                value={item.filterExpression}
                // defaultValue={preFilledTemplate.filterExpression}
                onChange={(e) => this.onChangeFilterExpression(item.id, e)}
                ref="filterExpressionText" />
            </div> */}

                <p className="lead clearfix"></p>
                <EntryTypeFormGroup
                  required={true}
                  defaultValue={item.entryType}
                  // defaultValue={preFilledTemplate.entryType ? preFilledTemplate.entryType : ""}
                  ref="entryType"
                  // onChange={this.props.onRuleChange} 
                  onChange={(e) => this.onChangeEntryType(item.id, e)}

                />

                {
                  item.fromExpression === true ?

                    <div>
                      <div>
                        <div className="form-group">
                          <label className="control-label">From Party Type:</label>
                          <select
                            className="form-control"
                            required={false}

                          >
                            <option value="Expression">Expression</option>
                          </select>
                        </div>
                      </div>

                      <div className="well">
                        <div className="form-group">
                          <label className="control-label">From Party :</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="text"
                              disabled

                              defaultValue={item.fromPartyShortName ? item.fromPartyShortName : item.fromParty}

                              ref="input"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">From Party Type:</label>
                          <select
                            className="form-control"

                            ref="expressionEntryType"

                          >
                            <option value="">{item.fromPartyType}</option>

                          </select>
                        </div>
                      </div>
                    </div>

                    : <div>
                      <div className="form-group">
                        <label className="control-label">From Party Type:</label>
                        <select
                          className="form-control"
                          required={false}

                        >
                          <option value="">{item.fromPartyType}</option>
                        </select>
                      </div>
                      <div>
                        <label className="control-label">From Party:</label>
                        <div className="input-group">
                          <input
                            className="form-control"
                            type="text"
                            placeholder="Interchange"
                            required={false}
                            value={item.fromPartyShortName ? item.fromPartyShortName : item.fromParty}

                          />
                          <a
                            href="#"
                            className="input-group-addon btn btn-primary"
                          >
                            Search
                        </a>
                        </div>
                      </div>
                    </div>
                }

                <p className="lead clearfix"></p>

                {
                  item.toExpression === true ?

                    <div>
                      <div>
                        <div className="form-group">
                          <label className="control-label">To Party Type:</label>
                          <select
                            className="form-control"
                            required={false}

                          >
                            <option value="Expression">Expression</option>
                          </select>
                        </div>
                      </div>

                      <div className="well">
                        <div className="form-group">
                          <label className="control-label">To Party :</label>
                          <div className="input-group">
                            <input
                              className="form-control"
                              type="text"
                              disabled

                              defaultValue={item.toPartyShortName ? item.toPartyShortName : item.toParty}

                              ref="input"
                            />
                          </div>
                        </div>
                        <div className="form-group">
                          <label className="control-label">To Party Type:</label>
                          <select
                            className="form-control"

                            ref="expressionEntryType"

                          >
                            <option value={item.toPartyType}>{item.toPartyType}</option>

                          </select>
                        </div>
                      </div> </div> : <div>
                      <div className="form-group">
                        <label className="control-label">To Party Type:</label>
                        <select
                          className="form-control"
                          required={false}

                        >
                          <option value="">{item.toPartyType}</option>
                        </select>
                      </div>
                      <div>
                        <label className="control-label">To Party:</label>
                        <div className="input-group">
                          <input

                            className="form-control"
                            type="text"
                            placeholder="Interchange"
                            required={false}
                            value={item.toPartyShortName ? item.toPartyShortName : item.toParty}

                          />
                          <a
                            href="#"

                            className="input-group-addon btn btn-primary"
                          >
                            Search
                        </a>
                        </div>
                      </div>
                    </div>

                }
                <p className="lead clearfix"></p>


              </div>

              <div className="col-md-6">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group checkbox">
                      <label>
                        <input type="checkbox"
                          id="systemReversible"
                          checked={item.systemReversible}
                          onChange={(e) => this.onChangeSystemReversible(item.id, e)}
                          ref="systemReversible" />System Reversible</label>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group checkbox">
                      <label>
                        <input type="checkbox"
                          id="perTransaction"
                          checked={item.perTransaction}
                          onChange={(e) => this.onChangePerTransaction(item.id, e)}
                          // onChange={this.onChangeCheckbox}
                          ref="perTransaction" />Per Transaction</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group checkbox">
                      <label>
                        <input type="checkbox"
                          id="commission"
                          checked={item.commission}
                          onChange={(e) => this.onChangeComission(item.id, e)}
                          ref="commission" />Commission</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group checkbox">
                      <label>
                        <input type="checkbox"
                          id="taxable"
                          checked={item.taxable}

                          onChange={(e) => this.onChangeTaxable(item.id, e)}
                          ref="taxable" />Taxable</label>
                    </div>
                  </div>
                </div>

                {!item.commission && item.taxable &&
                  <div className="form-group">
                    <label className="control-label">Tax Exemption Threshold:</label>
                    <input
                      className="form-control" type="number"
                      required={true} min="0" step="1"
                      value={item.taxExemptionThreshold ? item.taxExemptionThreshold : 0}
                      onChange={(e) => this.onChangeTaxExemption(item.id, e)}
                      ref="taxExemptionThreshold" />
                  </div>
                }


                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group checkbox">
                      <label>
                        <input type="checkbox"
                          id="waiver"
                          checked={item.waiver}
                          onChange={(e) => this.onChangeWaiver(item.id, e)}
                          ref="countBasedWaiver" />Waiver</label>
                    </div>
                  </div>
                </div>
                {
                  item.waiver &&

                  <div className="row">
                    <div className="col-md-6">
                      <div className="form-group radio">
                        <label>
                          <input type="radio"
                            id="countBasedWaiver"
                            checked={item.countBasedWaiver}
                            onChange={(e) => this.onChangeCountBasedWaiver(item.id, e)}
                            ref="countBasedWaiver" />Count Based Waiver</label>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="form-group radio">
                        <label>
                          <input type="radio"
                            id="timeBasedWaiver"
                            checked={item.timeBasedWaiver}
                            onChange={(e) => this.onChangeTimeBasedWaiver(item.id, e)}
                            ref="timeBasedWaiver" />Time Based Waiver</label>
                      </div>
                    </div>
                  </div>
                }

                {
                  item.timeBasedWaiver &&


                  <div className="form-group">
                    <div className="row">
                      <div className="col-sm-4 col-md-6">
                        <label className="control-label">Waiver Start Date:</label>
                        <input
                          className="form-control" type="text"
                          placeholder="DD/MM/YYYY 12:00 am"
                          // value={item.waiverStartDate ? dateStringToISO(item.waiverStartDate) : getDefaultEffectiveFrom()}
                          defaultValue={getDefaultEffectiveFrom()}
                          required={true}
                          onChange={(e) => this.onChangeWaiverStartDate(item.id, e)}
                          ref="waiverStartDate" />
                      </div>
                      <div className="col-sm-4 col-md-6">
                        <label className="control-label">Waiver End Date:</label>
                        <input
                          className="form-control" type="text"
                          placeholder="DD/MM/YYYY 12:00 am"
                          defaultValue={getDefaultEffectiveTo()}
                          required={true}
                          onChange={(e) => this.onChangeWaiverEndDate(item.id, e)}
                          ref="waiverEndDate" />
                      </div>
                    </div>
                  </div>
                }

                {
                  item.countBasedWaiver &&


                  <div className="form-group">
                    <label className="control-label">Waiver Limit Count:</label>
                    <input
                      className="form-control" type="number"
                      required={true} min="0" step="1"
                      onChange={(e) => this.onChangeWaiverLimitCount(item.id, e)}
                      value={item.waiverLimitCount ? item.waiverLimitCount : 0}

                      ref="waiverLimitCount" />
                  </div>
                }



                <div>
                  <div className="row">
                    <div className="form-group checkbox col-md-12">
                      <label>
                        <input
                          type="checkbox"
                          id="slabbedFee"
                          checked={item.basicFee.slabbedFee}
                          onChange={(e) => this.onChangeSlabbed(item.id, e)}
                        // onChange={this.onChangeCheckboxSlabbed}
                        />
                        Slabbed Fee
                </label>
                    </div>
                  </div>


                  {item.basicFee.slabbedFee && (
                    <div className="col-md-12">
                      <p className="lead remove-margin">Slabs</p>
                      <hr />
                      <div className="row">
                        <div className="col-md-1">
                          <label className="control-label">Rate </label>
                        </div>
                        <div className="col-md-3">
                          <label className="control-label">From (paisa)</label>
                        </div>
                        <div className="col-md-3">
                          <label className="control-label">To (paisa)</label>
                        </div>
                        <div className="col-md-3">
                          <label className="control-label">Fee (In %)</label>
                        </div>

                        <div className="col-md-3" />
                      </div>


                      {
                        item.basicFee.slabbedFees.length ? item.basicFee.slabbedFees.map((slab, index) => {
                          return <div className="row" key={index}>
                            <div className="col-md-1">
                              <label>
                                <input id="rate" checked={slab.rate} onChange={(e) => this.onChangeSlabRate(item.id, slab.id, e)} ref="rate" type="checkbox" />
                              </label>
                            </div>

                            <div className="col-md-3">
                              <input
                                className="form-control"
                                type="number"
                                min="0"
                                required={true}
                                value={slab.fromAmount}
                                // onChange={this.props.onRuleChange}
                                onChange={(e) => this.onChangeSlabbedFromAmount(item.id, slab.id, e)}
                                ref="from"
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                className="form-control"
                                type="number"
                                value={slab.toAmount}
                                min="0"
                                required={true}
                                value={slab.toAmount}
                                onChange={(e) => this.onChangeSlabbedtoAmount(item.id, slab.id, e)}
                                // onChange={this.props.onRuleChange}
                                ref="to"
                              />
                            </div>
                            <div className="col-md-3">
                              <input
                                className="form-control"
                                type="number"
                                min="0"
                                step="any"
                                required={true}
                                value={slab.value}
                                onChange={(e) => this.onChangeSlabbedValue(item.id, slab.id, e)}
                                // onChange={this.props.onRuleChange}
                                ref="value"
                              />
                            </div>

                            <div className="btn-toolbar col-md-2">
                              <button
                                disabled
                                className="btn btn-danger btn-xs"
                                onClick={this.onRemoveSlab}
                              >
                                <span className="glyphicon glyphicon-minus"></span>
                              </button>
                              <button
                                className="btn btn-primary btn-xs"
                                disabled
                              // onClick={this.props.onAddSlab}
                              // onClick={(e) => this.AddNestedArray(item.id, slab.id, index, e)}
                              >
                                <span className="glyphicon glyphicon-plus"></span>
                              </button>
                            </div>
                          </div>
                        }) : "nothing here"
                      }
                    </div>
                  )}

                  {!item.basicFee.slabbedFee && (
                    <div className="form-group checkbox">
                      <label>
                        <input
                          type="checkbox"
                          id="rate"
                          checked={item.basicFee.rate}
                          onChange={(e) => this.onChangeRate(item.id, e)}
                        // onChange={this.onChangeCheckboxRate}
                        />
                        Rate
                </label>
                    </div>
                  )}


                  {!item.basicFee.slabbedFee && (
                    <div className="form-group row col-md-12">
                      <label>
                        Value:
                  <input
                          className="form-control"
                          type="number"
                          min="0"
                          step="any"
                          required={false}
                          defaultValue={0}
                          value={item.basicFee.value ? item.basicFee.value : 0}
                          onChange={(e) => this.onChangeRateValue(item.id, e)}
                          // onChange={this.props.onRuleChange}
                          ref="inputValue"
                        />
                      </label>
                    </div>
                  )}
                </div>
              </div>



            </div>
          </div>
        </div>

      }) : ""

  }

  onSelectRule = (e) => {
    // const { checked } = e.target
    this.setState({ createRule: true, cloneTemplate: false })
  }

  onSelectCloneRule = (e) => {
    // const { checked } = e.target
    this.setState({ createRule: false, cloneTemplate: true })
  }

  onRenderDuplicateModal = (result) => {

    return <div>
      {this.state.open && <div id="myModal" className="modal" style={{ width: 500, height: 500, textAlign: "center", marginLeft: "30%" }}>
        <div className="modal-content">
          <div className="modal-header">
            <button type="button" className="close" data-dismiss="modal" onClick={this.onClose}>&times;</button>
            <h4 className="modal-title"> Checking Duplicate</h4><hr />
          </div>
          <div className="modal-body" style={{ height: 150, width: 400 }}>
            <p>{result.duplicate === true ? <span> Duplicate: <b>True</b> ShortId : {result.shortId} </span> : <span>Duplicate : <b>False </b></span>}</p>
            <p>{result.duplicate === true ? "There is a duplicate Id with this ratecard " : "Checked, look's fine, Hit the submit button and create the rate card!"}</p>
          </div>
          <div className="row">
            <div className="modal-footer">
              <button type="button" className="btn btn-default" data-dismiss="modal" onClick={this.onClose}>Close</button>
            </div>

            <div className="modal-footer">
              <button disabled={result.duplicate === true ? true : false} type="button" className="btn btn-default" data-dismiss="modal" onClick={this.OnSubmitAction}>Submit</button>
            </div>
          </div>

        </div>
      </div>
      }
    </div>

  }


  render() {

    return (
      <div className="page-container">
        {
          this.state.createRule === true ?
            <Form
              {...this.props}
              serializeForm={this.getData}
              submitAction={this.props.createRateCardTemplate}
            >
              <h1 className="page-header">
                <span className="required-message">
                  <sup>*</sup>- fields are required
            </span>
                Create Rate Card Template
          </h1>

              <p className="lead clearfix" />

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend
                      data-toggle="collapse"
                      data-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Ruleset
                </legend>
                    <div className="collapse in" id="collapseExample1">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Short ID:<sup className="required-message">*</sup>
                            </label>
                            <Input ref={"shortId"} focus={true} />
                          </div>
                          <p className="lead clearfix" />
                          <PartySearchFormGroup
                            ref="merchant"
                            index={0}
                            forComponent="report"
                            searchingFor="Merchant"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.merchantDetails}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />
                          <p className="lead clearfix" />


                          {/* <div>
                            <div className="form-group">
                              <label className="control-label">Pg Id Type:</label>
                              <select
                                className="form-control"
                                required={false}
                                disabled={true}


                              >
                                <option value="">Interchange</option>

                              </select>
                            </div>
                            <div>
                              <label className="control-label">Pg Id:</label>
                              <div className="input-group">
                                <input
                                  disabled={true}
                                  className="form-control"
                                  type="text"
                                  placeholder="Interchange"
                                  required={false}

                                />
                                <a
                                  href="#"

                                  className="input-group-addon btn btn-primary"
                                >
                                  Search
                      </a>
                              </div>
                            </div>
                          </div> */}


                          <p className="lead clearfix" />

                          <PartySearchFormGroup
                            disabled={true}
                            ref="pgId"
                            index={0}
                            forComponent="report"
                            searchingFor="Pg Id"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.pgId}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />


                          <p className="lead clearfix" />
                          <PartySearchFormGroup
                            ref="providerName"
                            index={0}
                            forComponent="report"
                            searchingFor="Provider Name"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.providerDetails}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />
                          <p className="lead clearfix" />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>


              {this.state.isAddRuleEnabled && (
                <RulesFormBox ref="rules" ruleType="rateCard" selectedData={this.state.selectedData} {...this.props} />
              )}

              <div className="row">

                <div className="col-md-5">
                  <div className="form-group radio">
                    <label>
                      <input type="radio"
                        id="createRule"
                        checked={this.state.createRule}
                        // onChange={(e) => this.onChangeCountBasedWaiver(item.id, e)}
                        onChange={(e) => this.onSelectRule(e)}
                        ref="createRule" />

                      <button
                        disabled={this.state.createRule !== true ? true : false}
                        className="btn btn-primary"
                        data-toggle="collapse"
                        data-target="#collapseExample4"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        onClick={this.onAddRule}
                      >
                        Add Another Rule
                </button>
                    </label>
                  </div>
                </div>

                {/* <div className="col-md-3">
              <button
                className="btn btn-primary"
                data-toggle="collapse"
                data-target="#collapseExample4"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={this.onAddRule}
              >
                Add Another Rule
          </button>
            </div> */}
                <div className="col-md-5">
                  <div className="form-group radio">
                    <label>
                      <input type="radio"
                        id="cloneRule"
                        checked={this.state.cloneTemplate}
                        // onChange={(e) => this.onChangeCountBasedWaiver(item.id, e)}
                        onChange={(e) => this.onSelectCloneRule(e)}
                        ref="cloneRule" />


                      <button
                        disabled={this.state.cloneTemplate !== true ? true : false}
                        type="button"
                        className="btn btn-info"
                        onClick={() => {
                          this.setState({
                            openModal: !this.state.openModal,
                            rateCardTemplateId: ""
                          });
                        }}
                      >
                        Copy from existing Rate Card Template
                            </button>
                    </label>
                  </div>
                </div>
              </div>

              <p className="lead clearfix" />

              <div className="form-group">
                <button className="btn btn-lg btn-block btn-success" type="submit">
                  Create Rate Card Template
            </button>
              </div>

              <div className="form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </Form> : <form >
              {/* <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createRateCardTemplate}
        > */}
              <h1 className="page-header">
                <span className="required-message">
                  <sup>*</sup>- fields are required
            </span>
                Create Rate Card Template
          </h1>

              <p className="lead clearfix" />

              <div className="panel panel-default">
                <div className="panel-body">
                  <fieldset>
                    <legend
                      data-toggle="collapse"
                      data-target="#collapseExample1"
                      aria-expanded="false"
                      aria-controls="collapseExample"
                    >
                      Ruleset
                </legend>
                    <div className="collapse in" id="collapseExample1">
                      <div className="row">
                        <div className="col-md-6">
                          <div className="form-group">
                            <label className="control-label">
                              Short ID:<sup className="required-message">*</sup>
                            </label>
                            <Input ref={"shortId"} focus={true} />
                          </div>
                          <p className="lead clearfix" />
                          <PartySearchFormGroup
                            ref="merchant"
                            index={0}
                            forComponent="report"
                            searchingFor="Merchant"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.merchantDetails}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />
                          <p className="lead clearfix" />




                          {/* <div>
                            <div className="form-group">
                              <label className="control-label">Pg Id Type:</label>
                              <select
                                className="form-control"
                                required={false}
                                disabled={true}


                              >
                                <option value="">Interchange</option>

                              </select>
                            </div>
                            <div>
                              <label className="control-label">Pg Id:</label>
                              <div className="input-group">
                                <input
                                  disabled={true}
                                  className="form-control"
                                  type="text"
                                  placeholder="Interchange"
                                  required={false}

                                />
                                <a
                                  href="#"

                                  className="input-group-addon btn btn-primary"
                                >
                                  Search
                      </a>
                              </div>
                            </div>
                          </div> */}
                          <p className="lead clearfix" />






                          <PartySearchFormGroup

                            ref="pgId"
                            index={0}
                            forComponent="report"
                            searchingFor="Pg Id"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.pgId}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />


                          <p className="lead clearfix" />
                          <PartySearchFormGroup
                            ref="providerName"
                            index={0}
                            forComponent="report"
                            searchingFor="Provider Name"
                            hasExpression={false}
                            required={false}
                            searchResult={this.props.report.providerDetails}
                            multiFindInput={this.props.multiFindInput}
                            multiFindSearch={this.props.multiFindSearch}
                            multiFindLock={this.props.multiFindLock}
                            editLock={this.props.editLock}
                            multiFindClear={this.props.multiFindClear}
                          />
                          <p className="lead clearfix" />
                        </div>
                      </div>
                    </div>
                  </fieldset>
                </div>
              </div>

              <div>
                {this.renderSearchResult(this.state.newData)}
              </div>


              {/* {this.state.isAddRuleEnabled && (
                <RulesFormBox ref="rules" ruleType="rateCard" selectedData={this.state.selectedData} {...this.props} />
              )} */}

              <div className="row">

                <div className="col-md-5">
                  <div className="form-group radio">
                    <label>
                      <input type="radio"
                        id="createRule"
                        checked={this.state.createRule}
                        // onChange={(e) => this.onChangeCountBasedWaiver(item.id, e)}
                        onChange={(e) => this.onSelectRule(e)}
                        ref="createRule" />

                      <button
                        disabled={this.state.createRule !== true ? true : false}
                        className="btn btn-primary"
                        data-toggle="collapse"
                        data-target="#collapseExample4"
                        aria-expanded="false"
                        aria-controls="collapseExample"
                        onClick={this.onAddRule}
                      >
                        Add Another Rule
                </button>
                    </label>
                  </div>
                </div>

                {/* <div className="col-md-3">
              <button
                className="btn btn-primary"
                data-toggle="collapse"
                data-target="#collapseExample4"
                aria-expanded="false"
                aria-controls="collapseExample"
                onClick={this.onAddRule}
              >
                Add Another Rule
          </button>
            </div> */}
                <div className="col-md-5">
                  <div className="form-group radio">
                    <label>
                      <input type="radio"
                        id="cloneRule"
                        checked={this.state.cloneTemplate}
                        // onChange={(e) => this.onChangeCountBasedWaiver(item.id, e)}
                        onChange={(e) => this.onSelectCloneRule(e)}
                        ref="cloneRule" />


                      <button
                        disabled={this.state.cloneTemplate !== true ? true : false}
                        type="button"
                        className="btn btn-primary"
                        onClick={() => {
                          this.setState({
                            openModal: !this.state.openModal,
                            rateCardTemplateId: ""
                          });
                        }}
                      >
                        Copy from existing Rate Card Template
                            </button>
                    </label>
                  </div>
                </div>
              </div>

              {/* <!-- Modal --> */}
              {/* <div id="myModal" className="modal fade" role="dialog">
                <div className="modal-dialog"> */}

              {/* <!-- Modal content--> */}
              {/* <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal">&times;</button>
                      <h4 className="modal-title">Modal Header</h4>
                    </div>
                    <div className="modal-body">
                      <p>Some text in the modal.</p>
                    </div>
                    <div className="modal-footer">
                      <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                  </div>

                </div>
              </div> */}



              <div>{this.onRenderDuplicateModal(this.state.duplicate)}</div>

              <div>{this.onRenderSuccessModal(this.state.success)}</div>

              <p className="lead clearfix" />

              <div className="form-group">
                {/* <button type="button" onClick={this.onCheckingDuplicate} className="btn btn-lg btn-block btn-success" data-toggle="modal" data-target="#myModal">Check</button> */}
                <button className="btn btn-lg btn-block btn-success" onClick={this.onCheckingDuplicate}>
                  Check Duplicate Rate Cards!
                </button>
              </div>


              <div className="form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </form>
        }

        {/* </Form> */}

        {this.state.openModal && (
          <CloneRateTemplateModal
            rateCardTemplateId={this.state.rateCardTemplateId}
            onSelection={this.onSelection}
            onOpenMainModal={this.onOpenMainModal}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRateCardtTemplate);






