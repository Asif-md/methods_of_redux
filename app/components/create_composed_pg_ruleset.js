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
import RateTemplateModal from "components/rate_card_template_modal";
import PartySearchFormGroup from "components/party_search_form_group";
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
const cardList = [
  "NONE",
  "AMEX",
  "DINERS_CLUB",
  "MAESTRO",
  "MASTER_CARD",
  "RUPAY",
  "VISA"
];
const cardeventTypes = [
  "PG_DC_PAYMENT",
  "PG_CC_PAYMENT",
  "WALLET_PG_TOPUP_PAYMENT_SUCCESS"
];
// ['PG_REDEMPTION_DC', 'PG_REDEMPTION_CC', 'WALLET_PG_TOPUP', 'WALLET_PG_TOPUP_PAYMENT_SUCCESS'];

class CreateComposedPGRuleset extends React.Component {
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
      bankCode,
      mid,
      cardIssuer,
      cardEventType,
      effectiveFrom,
      effectiveTo,
      rateCardId,
      settlementMode,
      disableOnWeekends,
      disableOnHolidays,
      internalWalletTopUp
    } = this.refs;
    let cardIssuerValues = [].filter
      .call(cardIssuer.options, o => o.selected)
      .map(o => o.value);

    return {
      mid: mid.value.split(","),
      pgId:
        this.props.report.pgId && this.props.report.pgId.locked
          ? this.props.report.pgId.details[this.props.report.pgId.index].result
          : "",
      bankCode: bankCode.value.split(","),
      rateCardId: rateCardId.value,
      cardIssuer: cardIssuerValues,
      cardEventType: cardEventType.value,
      settlementMode: settlementMode.value,
      internalWalletTopUp: internalWalletTopUp.checked,
      disableOnWeekends: disableOnWeekends.checked,
      disableOnHolidays: disableOnHolidays.checked,
      rateCardTemplateId: this.state.rateCardTemplateId,
      effectiveTo: dateStringToISO(effectiveTo.value),
      effectiveFrom: dateStringToISO(effectiveFrom.value)
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
          submitAction={this.props.createComposedPGRuleset}
        >
          <h1 className="page-header">Create Composed PG Ruleset</h1>
          <div className="row">
            <div className="col-md-6">
              <PartySearchFormGroup
                ref="pgId"
                index={0}
                forComponent="report"
                searchingFor="Pg Id"
                hasExpression={false}
                required={true}
                searchResult={this.props.report.pgId}
                multiFindInput={this.props.multiFindInput}
                multiFindSearch={this.props.multiFindSearch}
                multiFindLock={this.props.multiFindLock}
                editLock={this.props.editLock}
                multiFindClear={this.props.multiFindClear}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">MID:</label>
                <input
                  className="form-control"
                  type="text"
                  ref="mid"
                  placeholder="L93650,L124165"
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Rate Card Id:</label>
                <input className="form-control" type="text" ref="rateCardId" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Bank Code:</label>
                <input
                  className="form-control"
                  type="text"
                  required={true}
                  ref="bankCode"
                  placeholder="820,1350"
                />
              </div>
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
                <label className="control-label">Settlement Mode:</label>
                <select
                  defaultValue={""}
                  className="form-control"
                  ref="settlementMode"
                  required={true}
                >
                  <option value="" disabled>
                    {"Select settlement mode"}
                  </option>
                  {settlementModesList.map(mode => {
                    return <option key={`sub-option-${mode}`}>{mode}</option>;
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Card event type:</label>
                <select
                  defaultValue={""}
                  className="form-control"
                  required={true}
                  ref="cardEventType"
                >
                  <option value="" disabled>
                    {"Select card event type"}
                  </option>
                  {cardeventTypes.map(eventType => {
                    return (
                      <option key={`sub-option-${eventType}`}>
                        {eventType}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Card Issuer:</label>
                <select
                  multiple={true}
                  className="form-control"
                  required={true}
                  ref="cardIssuer"
                >
                  <option value="" disabled>
                    {"Select card issuer"}
                  </option>
                  {cardList.map(eventType => {
                    return (
                      <option
                        selected={eventType === "NONE" ? eventType : ""}
                        key={`sub-option-${eventType}`}
                      >
                        {eventType}
                      </option>
                    );
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
                  <input type="checkbox" ref="internalWalletTopUp" />
                  Internal Wallet TopUp
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
                Create Composed PG Ruleset
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
)(CreateComposedPGRuleset);
