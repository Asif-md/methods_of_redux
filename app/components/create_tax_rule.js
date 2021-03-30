import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "stateToProps"
import Form from "components/form";
import Input from "components/input"
import { getDefaultEffectiveFrom, getDefaultEffectiveTo, dateStringToISO } from "../utils/helpers"
import * as routes from "routes"
import PartySearchFormGroup from "components/party_search_form_group";

class CreateTaxRule extends Component {

    componentDidMount() {
        this.props.getSacCode()
    }

    getData = () => {

        const {
            name,
            transactionType,
            entryFor,
            hsn_code,
            sac_code,
            effectiveFrom,
            effectiveTo,
        } = this.refs;

        return {
            name: name.value(),
            transactionType: transactionType.value(),
            entryFor: entryFor.value(),
            hsn: hsn_code.value,
            sac: sac_code.value,
            toPartyId: this.props.report.merchantDetails &&
                this.props.report.merchantDetails.locked
                ? this.props.report.merchantDetails.details[
                    this.props.report.merchantDetails.index
                ].id
                : "",
            toPartyType: "MERCHANT",
            effectiveFrom: dateStringToISO(effectiveFrom.value),
            effectiveTo: dateStringToISO(effectiveTo.value)
        };
    }

    render() {

        const { getSacCodeTypes } = this.props

        return (
            <div className="page-container">
                <Form
                    {...this.props}
                    serializeForm={this.getData}
                    submitAction={this.props.createTaxRulesets}>
                    <h1 className="page-header">
                        <span className="required-message">All fields are required</span>
                        Create Tax Rule
                    </h1>

                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label"> Name:</label>
                                <Input ref="name" focus={true} maxLength={100} />
                            </div>
                            <div className="form-group">
                                <label className="control-label">Transaction Type</label>
                                <Input ref="transactionType" />
                            </div>
                            <div className="form-group">
                                <label className="control-label"></label>
                                <Input ref="entryFor" />
                            </div>
                            <div className="form-group">
                                <label className="control-label">HSN Code:</label>
                                {/* <Input ref="hsn_code" /> */}
                                <input className="form-control" type="text" ref="hsn_code" />
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <label className="control-label">Select SAC Code:</label>
                                        <select
                                            className="form-control"
                                            required={true}
                                            ref="sac_code">
                                            <option value="">{"Select SAC Code"}</option>
                                            {
                                                getSacCodeTypes.map((type) => {
                                                    return (<option key={`sub-option-${type.id}`}>{type.code}</option>);
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-md-12">
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
                                </div>
                            </div>
                            <div className="form-group">
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

                            <div className="form-group">
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


export default connect(mapStateToProps, mapDispatchToProps)(CreateTaxRule)