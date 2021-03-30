import React from "react";
import EntryTypeFormGroup from 'components/entry_type_form_group';
import PartySearchFormGroup from "components/party_search_form_group";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";

class CommonRateCardRuleForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            taxable: false,
            systemReversible: true,
            filterExpression: false,
            commission: false,
            perTransaction: false,
            timeBasedWaiver: false,
            countBasedWaiver: false,
            waiver: false
        }
    }

    getData = () => {
        const {
            name,
            entryFor,
            txnType,
            fromPartySearch,
            toPartySearch,
            entryType,
            taxable,
            filterExpressionText
        } = this.refs;
        const { partyType: fromPartyType, isExpression: fromExpression } = fromPartySearch.getData();
        const { partyType: toPartyType, isExpression: toExpression } = toPartySearch.getData();
        let waiverLimitCount = 0,
            taxExemptionThreshold = 0,
            waiverStartDate = null,
            waiverEndDate = null;
        // waiverStartDate = getDefaultEffectiveFrom(),
        // waiverEndDate = getDefaultEffectiveTo();
        if (!this.state.commission && (this.state.taxable || this.props.preFilledTemplate.taxable)) {
            taxExemptionThreshold = Number(this.refs.taxExemptionThreshold.value)
        }
        if (this.state.timeBasedWaiver) {
            waiverStartDate = this.refs.waiverStartDate.value;
            waiverEndDate = this.refs.waiverEndDate.value;
        }
        if (this.state.countBasedWaiver) {
            waiverLimitCount = Number(this.refs.waiverLimitCount.value);
        }
        return {
            name: name.value,
            entryFor: entryFor.value,
            txnType: txnType.value,
            fromExpression,
            fromPartyType,
            toPartyType,
            toExpression,
            ...this.state,
            taxable: taxable.checked,
            filterExpression: this.state.filterExpression ? filterExpressionText.value : '',
            waiverLimitCount,
            taxExemptionThreshold,
            waiverStartDate,
            waiverEndDate,
            ...entryType.getData(),
        };
    }

    onChangeCheckbox = (event) => {
        if (event.target.id === 'countBasedWaiver') {
            this.state.timeBasedWaiver && this.setState({ timeBasedWaiver: false });
            this.setState({ [event.target.id]: !this.state[event.target.id] });
        } else if (event.target.id === 'timeBasedWaiver') {
            this.setState({ [event.target.id]: !this.state[event.target.id] });
            this.state.countBasedWaiver && this.setState({ countBasedWaiver: false });
        } else if (event.target.id === 'waiver') {
            this.setState({ countBasedWaiver: false, timeBasedWaiver: false, [event.target.id]: !this.state[event.target.id] });
        } else if (event.target.id === 'taxable') {
            this.setState({ taxable: this.state.commission ? false : this.state.taxable ? false : true });
        } else {
            this.setState({ [event.target.id]: !this.state[event.target.id] });
        }
        setTimeout(() => {
            this.props.onRuleChange();
        }, 1500);
    }

    render() {
        const { preFilledTemplate } = this.props;


        return (
            <div>
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label">Name:</label>
                        <input
                            className="form-control" type="text"
                            required={true}
                            defaultValue={preFilledTemplate.name ? preFilledTemplate.name : ""}
                            onChange={this.props.onRuleChange}
                            ref="name" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Entry For:</label>
                        <input
                            className="form-control" type="text"
                            required={true}
                            defaultValue={preFilledTemplate.entryFor ? preFilledTemplate.entryFor : ""}
                            onChange={this.props.onRuleChange}
                            ref="entryFor" />
                    </div>
                    <div className="form-group">
                        <label className="control-label">Transaction Type:</label>
                        <input
                            className="form-control" type="text"
                            required={true}
                            defaultValue={preFilledTemplate.transactionType ? preFilledTemplate.transactionType : ""}
                            onChange={this.props.onRuleChange}
                            ref="txnType" />
                    </div>
                    <p className="lead clearfix"></p>
                    <div className="form-group checkbox">
                        <label>
                            <input type="checkbox"
                                id="filterExpression"
                                checked={(this.state.filterExpression || preFilledTemplate.filterExpression) ? true : false}
                                onChange={this.onChangeCheckbox}
                                ref="filterExpression" />Filter</label>
                    </div>
                    {(this.state.filterExpression || preFilledTemplate.filterExpression) &&
                        <div className="form-group">
                            <label className="control-label">Filter Expression:</label>
                            <input
                                className="form-control" type="text"
                                required={true}
                                defaultValue={preFilledTemplate.filterExpression}
                                onChange={this.props.onRuleChange}
                                ref="filterExpressionText" />
                        </div>
                    }
                    <p className="lead clearfix"></p>
                    <EntryTypeFormGroup
                        required={true}
                        defaultValue={preFilledTemplate.entryType ? preFilledTemplate.entryType : ""}
                        ref="entryType"
                        onChange={this.props.onRuleChange} />

                    <PartySearchFormGroup
                        ref="fromPartySearch"
                        index={this.props.index}
                        forComponent="new_ruleset"
                        searchingFor="FromParty"
                        hasExpression={true}
                        required={true}
                        searchResult={this.props.rule.fromPartySearchResult}
                        multiFindInput={this.props.multiFindInput}
                        multiFindSearch={this.props.multiFindSearch}
                        multiFindLock={this.props.multiFindLock}
                        editLock={this.props.editLock}
                        multiFindClear={this.props.multiFindClear}
                    // isExpressionType={preFilledTemplate.fromParty ? true : false}
                    // expressionValue={preFilledTemplate.fromParty}
                    // expressionType={preFilledTemplate.fromPartyType}
                    />
                    <PartySearchFormGroup
                        ref="toPartySearch"
                        index={this.props.index}
                        forComponent="new_ruleset"
                        searchingFor="ToParty"
                        hasExpression={true}
                        required={true}
                        searchResult={this.props.rule.toPartySearchResult}
                        multiFindInput={this.props.multiFindInput}
                        multiFindSearch={this.props.multiFindSearch}
                        multiFindLock={this.props.multiFindLock}
                        editLock={this.props.editLock}
                        multiFindClear={this.props.multiFindClear}
                        isExpressionType={preFilledTemplate.toParty ? true : false}
                        expressionValue={preFilledTemplate.toParty ? preFilledTemplate.toParty : ""}
                    // toPartyType={preFilledTemplate.toPartyType}
                    />

                </div>
                <div className="col-md-6">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group checkbox">
                                <label>
                                    <input type="checkbox"
                                        id="systemReversible"
                                        checked={this.state.systemReversible}
                                        onChange={this.onChangeCheckbox}
                                        ref="systemReversible" />System Reversible</label>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group checkbox">
                                <label>
                                    <input type="checkbox"
                                        id="perTransaction"
                                        checked={this.state.perTransaction}
                                        onChange={this.onChangeCheckbox}
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
                                        checked={this.state.commission}
                                        onChange={this.onChangeCheckbox}
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
                                        checked={this.state.commission ? false : preFilledTemplate.taxable ? true : this.state.taxable}
                                        onChange={this.onChangeCheckbox}
                                        ref="taxable" />Taxable</label>
                            </div>
                        </div>
                    </div>
                    {!this.state.commission && (this.state.taxable || this.props.preFilledTemplate.taxable) &&
                        <div className="form-group">
                            <label className="control-label">Tax Exemption Threshold:</label>
                            <input
                                className="form-control" type="number"
                                required={true} min="0" step="1"
                                // defaultValue={0}
                                defaultValue={preFilledTemplate.taxExemptionThreshold ? preFilledTemplate.taxExemptionThreshold : 0}
                                onChange={this.props.onRuleChange}
                                ref="taxExemptionThreshold" />
                        </div>
                    }
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group checkbox">
                                <label>
                                    <input type="checkbox"
                                        id="waiver"
                                        checked={this.state.waiver}
                                        onChange={this.onChangeCheckbox}
                                        ref="countBasedWaiver" />Waiver</label>
                            </div>
                        </div>
                    </div>
                    {this.state.waiver &&
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group radio">
                                    <label>
                                        <input type="radio"
                                            id="countBasedWaiver"
                                            checked={this.state.countBasedWaiver}
                                            onChange={this.onChangeCheckbox}
                                            ref="countBasedWaiver" />Count Based Waiver</label>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group radio">
                                    <label>
                                        <input type="radio"
                                            id="timeBasedWaiver"
                                            checked={this.state.timeBasedWaiver}
                                            onChange={this.onChangeCheckbox}
                                            ref="timeBasedWaiver" />Time Based Waiver</label>
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.timeBasedWaiver &&
                        <div className="form-group">
                            <div className="row">
                                <div className="col-sm-4 col-md-6">
                                    <label className="control-label">Waiver Start Date:</label>
                                    <input
                                        className="form-control" type="text"
                                        placeholder="DD/MM/YYYY 12:00 am"
                                        defaultValue={getDefaultEffectiveFrom()}
                                        required={true}
                                        onChange={this.props.onRuleChange}
                                        ref="waiverStartDate" />
                                </div>
                                <div className="col-sm-4 col-md-6">
                                    <label className="control-label">Waiver End Date:</label>
                                    <input
                                        className="form-control" type="text"
                                        placeholder="DD/MM/YYYY 12:00 am"
                                        defaultValue={getDefaultEffectiveTo()}
                                        required={true}
                                        onChange={this.props.onRuleChange}
                                        ref="waiverEndDate" />
                                </div>
                            </div>
                        </div>
                    }
                    {this.state.countBasedWaiver &&
                        <div className="form-group">
                            <label className="control-label">Waiver Limit Count:</label>
                            <input
                                className="form-control" type="number"
                                required={true} min="0" step="1"
                                onChange={this.props.onRuleChange}
                                ref="waiverLimitCount" />
                        </div>
                    }
                    {this.props.children}
                </div>
            </div>
        );
    }
}

CommonRateCardRuleForm.defaulProps = {
    hasExpression: false
}

export default CommonRateCardRuleForm;
