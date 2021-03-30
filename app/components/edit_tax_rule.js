import React, { Component } from 'react'
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps"
import Form from "components/form";
import Input from "components/input";
import { Link } from "react-router-dom";
import * as routes from "routes";
import PartySearchFormGroup from "components/party_search_form_group";
import { dateStringToISO, epochToISO, isoToDateString } from "utils/helpers";

class EditTaxRule extends Component {

    constructor() {
        super();
        this.state = {
            effectiveFrom: "",
            effectiveTo: ""
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        params && params.taxRuleId && this.props.showTaxRule(params.taxRuleId);
        this.props.getSacCode()
    }

    getData = () => {

        const {
            name,
            // transactionType,
            // entryFor,
            // hsn_code,
            // sac_code,
            effectiveFrom,
            effectiveTo,
        } = this.refs;



        return {
            name: name.value,
            // transactionType: transactionType.value,
            // entryFor: entryFor.value,
            // hsnCode: hsn_code.value,
            // sacCode: sac_code.value,
            // merchantId: this.props.report.merchantDetails &&
            //     this.props.report.merchantDetails.locked
            //     ? this.props.report.merchantDetails.details[
            //         this.props.report.merchantDetails.index
            //     ].id
            //     : "",
            effectiveFrom: dateStringToISO(effectiveFrom.value),
            effectiveTo: dateStringToISO(effectiveTo.value)
        };
    }

    render() {

        const { getSacCodeTypes, taxRule } = this.props





        return (
            <div className="page-container">
                <Form
                    {...this.props}
                    serializeForm={this.getData}
                    submitAction={this.props.editTaxRule}
                    editStatus={true}
                    id={taxRule.id}>

                    <h1 className="page-header">
                        <span className="required-message">All fields are required</span>
                        Update Tax Rule
                    </h1>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label"> Name:</label>
                                <input className="form-control" ref="name" defaultValue={taxRule.name} focus={true} maxLength={100} />
                            </div>
                            <p className="lead clearfix"></p>
                            <div className="form-group">
                                <label className="control-label">Transaction Type</label>
                                <input className="form-control" disabled ref="transactionType" defaultValue={taxRule.transactionType} />
                            </div>
                            <p className="lead clearfix"></p>
                            <div className="form-group">
                                <label className="control-label">Entry For:</label>
                                <input className="form-control" disabled ref="entryFor" defaultValue={taxRule.entryFor} />
                            </div>
                            <p className="lead clearfix"></p>
                            <div className="form-group">
                                <label className="control-label">HSN Code:</label>
                                <input className="form-control" disabled ref="hsn_code" defaultValue={taxRule.hsn} />
                            </div>
                            <p className="lead clearfix"></p>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="control-label">Select SAC Code:</label>
                                        <input className="form-control" disabled ref="sac_code" defaultValue={taxRule.sac} />
                                    </div>
                                </div>
                            </div>


                            <p className="lead clearfix"></p>

                            <div className="form-group">
                                <label className="control-label">Merchant Type:</label>
                                <select

                                    className="form-control"
                                    required={false}

                                >
                                    <option value="">Merchant</option>
                                </select>
                            </div>
                            <div>
                                <label className="control-label">Merchant:</label>
                                <div className="input-group">
                                    <input
                                        disabled
                                        className="form-control"
                                        type="text"
                                        placeholder="Interchange"
                                        required={false}
                                        value={taxRule.toPartyId}

                                    />
                                    <a
                                        href="#"
                                        className="input-group-addon btn btn-primary"
                                    >
                                        Search
                                        </a>
                                </div>
                            </div>

                            <p className="lead clearfix"></p>

                            {/* <div className="col-md-12">
                                    <PartySearchFormGroup
                                        ref="merchantId"
                                        index={0}
                                        forComponent="report"
                                        searchingFor="Merchant"
                                        hasExpression={false}
                                        required={true}
                                        searchResult={this.props.report.merchantDetails}
                                        multiFindInput={this.props.multiFindInput}
                                        multiFindSearch={this.props.multiFindSearch}
                                        multiFindLock={this.props.multiFindLock}
                                        editLock={this.props.editLock}
                                        multiFindClear={this.props.multiFindClear}
                                    />
                                </div> */}

                            <div className="form-group">
                                <label className="control-label">Effective From:</label>
                                <input
                                    className="form-control" type="text"
                                    placeholder="DD/MM/YYYY 12:00 am"
                                    required={true} defaultValue={epochToISO(taxRule.effectiveFrom)}
                                    ref="effectiveFrom"

                                />

                            </div>

                            <p className="lead clearfix"></p>

                            <div className="form-group">
                                <label className="control-label">Effective To:</label>
                                <input
                                    className="form-control"
                                    type="text"
                                    placeholder="DD/MM/YYYY 12:00 am"
                                    defaultValue={epochToISO(taxRule.effectiveTo)}
                                    required={true}
                                    ref="effectiveTo"

                                />

                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <button
                                        className="btn btn-md btn-block btn-success"
                                        type="submit">Create Tax Rule</button>
                                    <div className="col-md-6 form-group">
                                        or <Link to={routes.ROOT_PATH}>cancel</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTaxRule);
