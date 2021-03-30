/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import { Link } from "react-router-dom";
import Form from "components/form";
import * as routes from "routes";
import { dateStringToISO } from "utils/helpers";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";
import PartySearchFormGroup from "components/party_search_form_group";
import RateTemplateModal from "components/rate_card_template_modal";
const settlementModesList = [
  "T0",
  "T1",
  "T2",
  "T3",
  "T4",
  "T5",
  "T6",
  "T7",
  "T15",
  "T30"
];

class CreateComposedMerchantRuleset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      rateCardTemplateId: "",
      shortId: ""
    };
  }




  getData = () => {
    const {
      effectiveFrom,
      effectiveTo,
      settlementMode,
      disableOnWeekends,
      disableOnHolidays,
      invoiceGenerationThreshold,
      createRedemptionSettlementRules,
      recordSalesRegister,
      createTaxRule
    } = this.refs;
    return {
      merchantId:
        this.props.report.merchantDetails &&
          this.props.report.merchantDetails.locked
          ? this.props.report.merchantDetails.details[
            this.props.report.merchantDetails.index
          ].result
          : "",
      settlementMode: settlementMode.value,
      disableOnWeekends: disableOnWeekends.checked,
      disableOnHolidays: disableOnHolidays.checked,
      rateCardTemplateId: this.state.rateCardTemplateId,
      effectiveTo: dateStringToISO(effectiveTo.value),
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      invoiceGenerationThreshold: Number(invoiceGenerationThreshold.value),
      createRedemptionSettlementRules: createRedemptionSettlementRules.checked,
      recordSalesRegister: recordSalesRegister.checked,
      createTaxRule: createTaxRule.checked
    };
  };

  onSelection = (id, shortId) => {
    this.setState({ rateCardTemplateId: id, shortId, openModal: false });
  };

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createComposedMerchantRuleset}
        >
          <h1 className="page-header">Create Composed Merchant Ruleset</h1>
          <div className="row">
            <div className="col-md-6">
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
            <div className="row">
              <div className="col-sm-4 col-md-6">
                <label className="control-label">effectiveFrom:</label>
                <input
                  className="form-control"
                  type="text"
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
                  className="form-control"
                  type="text"
                  placeholder="DD/MM/YYYY 12:00 am"
                  defaultValue={getDefaultEffectiveTo()}
                  ref="effectiveTo"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">
                  Invoice Generation Threshold:
                </label>
                <input
                  className="form-control"
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={0}
                  ref="invoiceGenerationThreshold"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Settlement Mode:</label>
                <select
                  defaultValue={""}
                  className="form-control"
                  ref="settlementMode"
                  required={true}
                >
                  <option value="">{"Select settlement mode"}</option>
                  {settlementModesList.map(mode => {
                    return <option key={`sub-option-${mode}`}>{mode}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnWeekends" />
                  Disable On Weekends
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnHolidays" />
                  Disable On Holidays
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group checkbox">
                <label>
                  <input
                    type="checkbox"
                    ref="createRedemptionSettlementRules"
                  />
                  Create Redemption Settlement Rules
                </label>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="recordSalesRegister" />
                  Record Sales Register
                </label>
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


          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Rate Card Template:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  onChange={() => null}
                  value={this.state.shortId}
                  ref="shortID"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <button
                  type="button"
                  className="btn btn-info"
                  onClick={() => {
                    this.setState({
                      openModal: !this.state.openModal,
                      rateCardTemplateId: ""
                    });
                  }}
                >
                  Select Rate Card Template ID
                </button>
              </div>
            </div>
          </div>



          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-md btn-block btn-success"
                type="submit"
              >
                Create Composed Merchant Ruleset
              </button>

              <div className="col-md-6 form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </div>
          </div>
        </Form>
        {this.state.openModal && (
          <RateTemplateModal
            rateCardTemplateId={this.state.rateCardTemplateId}
            onSelection={this.onSelection}
          />
        )}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComposedMerchantRuleset);
