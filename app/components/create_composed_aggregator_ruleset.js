/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import { Link } from "react-router-dom";
import Form from "components/form";
import * as routes from "routes";
import { dateStringToISO } from "utils/helpers";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";
import RateTemplateModal from "components/rate_card_template_modal";
import PartySearchFormGroup from "components/party_search_form_group";
class CreateComposedAggregatorRuleset extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            openModal: false,
            rateCardTemplateId: '',
            shortId: ''
        }
    }

    componentDidMount() {
        this.props.getAggregatorServiceType();
    }

    getData = () => {
        const {
            providerId,
            serviceType,
            effectiveFrom,
            effectiveTo,
            createTaxRule
        } = this.refs;
        return {
            providerId: providerId.value,
            serviceType: serviceType.value,
            providerName: this.props.report.providerDetails && this.props.report.providerDetails.locked
                ? this.props.report.providerDetails.details[this.props.report.providerDetails.index].result
                : '',
            rateCardTemplateId: this.state.rateCardTemplateId,
            effectiveTo: dateStringToISO(effectiveTo.value),
            effectiveFrom: dateStringToISO(effectiveFrom.value),
            createTaxRule: createTaxRule.checked
        }
    }

    onSelection = (id, shortId) => {
        this.setState({ rateCardTemplateId: id, shortId, openModal: false });
    }

    render() {
        return (
            <div className="page-container">
                <Form
                    {...this.props}
                    serializeForm={this.getData}
                    submitAction={this.props.createComposedAggregatorRuleset}>
                    <h1 className="page-header">
                        Create Composed Aggregator Ruleset
            </h1>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Service type:</label>
                                <select
                                    className="form-control"
                                    required={true}
                                    ref="serviceType">
                                    <option value="">{"Select service type"}</option>
                                    {
                                        this.props.aggregatorServiceTypes.map((type) => {
                                            return (<option key={`sub-option-${type.id}`}>{type.id}</option>);
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Provider Id:</label>
                                <input className="form-control" type="text" required={true}
                                    ref="providerId" />
                            </div>
                        </div>
                    </div>
                    {/* <div className="row">
                <div className="col-md-6">
                    <div className="form-group">
                        <label className="control-label">Provider Name:</label>
                        <input className="form-control" type="text" required = {true}
                            ref="providerName"/>
                    </div>
                </div>
            </div> */}
                    <div className="row">
                        <div className="col-md-6">
                            <PartySearchFormGroup
                                ref="providerName"
                                index={0}
                                forComponent="report"
                                searchingFor="Provider Name"
                                hasExpression={false}
                                required={true}
                                searchResult={this.props.report.providerDetails}
                                multiFindInput={this.props.multiFindInput}
                                multiFindSearch={this.props.multiFindSearch}
                                multiFindLock={this.props.multiFindLock}
                                editLock={this.props.editLock}
                                multiFindClear={this.props.multiFindClear}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4 col-md-6">
                                <label className="control-label">effectiveFrom:</label>
                                <input
                                    className="form-control" type="text"
                                    placeholder="DD/MM/YYYY 12:00 am"
                                    defaultValue={getDefaultEffectiveFrom()}
                                    ref="effectiveFrom"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="row">
                            <div className="col-sm-4 col-md-6">
                                <label className="control-label">Effective To:</label>
                                <input
                                    className="form-control" type="text"
                                    placeholder="DD/MM/YYYY 12:00 am"
                                    defaultValue={getDefaultEffectiveTo()}
                                    ref="effectiveTo" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label className="control-label">Rate Card Template:</label>
                                <input className="form-control" type="text" required={true} onChange={() => null} value={this.state.shortId}
                                    ref="shortID" />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-3">
                            <div className="form-group">
                                <button type="button" className="btn btn-info" onClick={() => { this.setState({ openModal: !this.state.openModal, rateCardTemplateId: '' }) }}>Select Rate Card Template ID</button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group checkbox">
                                <label>
                                    <input type="checkbox" ref="createTaxRule" />
                                    Create Tax Rule
                                </label>
                            </div>
                        </div>

                    </div>

                    <br />
                    <br />

                    <div className="row">
                        <div className="col-md-6">
                            <button
                                className="btn btn-md btn-block btn-success"
                                type="submit">Create Composed Aggregator Ruleset</button>
                            <div className="col-md-6 form-group">
                                or <Link to={routes.ROOT_PATH}>cancel</Link>
                            </div>
                        </div>
                    </div>
                </Form>
                {this.state.openModal &&
                    <RateTemplateModal
                        rateCardTemplateId={this.state.rateCardTemplateId}
                        onSelection={this.onSelection}
                    />
                }
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateComposedAggregatorRuleset);

