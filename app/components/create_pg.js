/**
 * Created by ashwin.raghavan on 03/02/17.
 */

import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import * as routes from "routes";
import {Link} from "react-router-dom";
import Form from "components/form";
import RuleSlabs from "components/rule_slabs";
import {dateStringToISO} from "utils/helpers";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";

const eventTypes = ['PG_REDEMPTION_DC', 'PG_REDEMPTION_CC', 'WALLET_PG_TOPUP', 'EXTERNAL_WALLET_PG_TOPUP']
const settlementModes = ['T0','T1','T2','T3','T4','T5','T6','T7','T15','T30'];

class CreatePG extends React.Component{

  getData = ()  => {
    const {
      cardEventType,
      pgId,
      mid,
      rateCardId,
      bankCode,
      cardIssuer,
      fees,
      surcharge,
      taxExemptionThreshold,
      settlementMode,
      effectiveFrom,
      effectiveTo,
      disableOnWeekends,
      disableOnHolidays
    } = this.refs;

    return {
      cardEventType: cardEventType.value,
      pgId: pgId.value,
      mid: mid.value,
      rateCardId: rateCardId.value,
      bankCode: bankCode.value,
      cardIssuer: cardIssuer.value == "" ? [] : (cardIssuer.value).split(','),
      fees: fees.getSlabs(),
      surcharge: surcharge.getSlabs(),
      taxExemptionThreshold: taxExemptionThreshold.value,
      settlementMode: settlementMode.value,
      effectiveFrom: dateStringToISO(effectiveFrom.value),
      effectiveTo: dateStringToISO(effectiveTo.value),
      disableOnWeekends: disableOnWeekends.checked,
      disableOnHolidays: disableOnHolidays.checked,
    }
  }

  render(){
    return(
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createPG}>
          <h1 className="page-header">
            Create PG Ratecard
          </h1>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Card event type:</label>
                <select
                  className="form-control"
                  required = {true}
                  ref="cardEventType">
                  {
                    eventTypes.map((eventType) => {
                      return (<option key={`sub-option-${eventType}`}>{eventType}</option>);
                    })
                  }
                </select>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">PGID:</label>
                <input className="form-control" type="text" required = {true}
                       ref="pgId"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">MID:</label>
                <input className="form-control" type="text"
                       ref="mid"/>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Bank Code:</label>
                <input className="form-control" type="text" required = {true}
                       ref="bankCode"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Rate Card Id:</label>
                <input className="form-control" type="text"
                       ref="rateCardId"/>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label className="control-label">Card Issuer (optional):</label>
                <input className="form-control" type="text" placeholder="eg. VISA,MASTER_CARD,MAESTRO,MAESTRO_16,MAESTRO_16_OPT,RUPAY"
                       ref="cardIssuer"/>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-7">
              <p className="lead remove-margin">Fee - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-md-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-md-2">
                  <label className="control-label">Fee :</label>
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-3">
                </div>
              </div>
              <RuleSlabs ref="fees" rate = {true}/>
            </div>
          </div>
          <hr/>

          <div className="row form-group">
            <div className="col-md-7">
              <p className="lead remove-margin">Surcharge - Slabs</p>
              <br/>
              <div className="row">
                <div className="col-md-3">
                  <label className="control-label">From ( paisa ) :</label>
                </div>
                <div className="col-md-3">
                  <label className="control-label">To ( paisa ) :</label>
                </div>
                <div className="col-md-2">
                  <label className="control-label">Fee :</label>
                </div>
                <div className="col-md-1">
                </div>
                <div className="col-md-3">
                </div>
              </div>
              <RuleSlabs ref="surcharge" rate = {true}/>
            </div>
          </div>

          <hr/>

          <div className="row">
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Tax exemption threshold (paisa):</label>
                <input className="form-control" type="number" min="0" required = {true} defaultValue={0}
                       ref="taxExemptionThreshold"/>
              </div>
            </div>
            <div className="col-md-3">
              <div className="form-group">
                <label className="control-label">Settlement Mode:</label>
                <select
                  className="form-control"
                  required = {true}
                  ref="settlementMode">
                  {
                    settlementModes.map((settlementMode) => {
                      return (<option key={`sub-option-${settlementMode}`}>{settlementMode}</option>);
                    })
                  }
                </select>
              </div>
            </div>
          </div>

          <div className="row form-group">
            <div className="col-md-3">
              <label className="control-label">Effective From:</label>
              <input
                className="form-control" type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveFrom()}
                ref="effectiveFrom"/>
            </div>

            <div className="col-md-3">
              <label className="control-label">Effective To:</label>
              <input
                className="form-control" type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveTo()}
                ref="effectiveTo"/>
            </div>
          </div>

          <div className="row">
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnWeekends"/>Disable on Weekends</label>
              </div>
            </div>
            <div className="col-md-2">
              <div className="form-group checkbox">
                <label>
                  <input type="checkbox" ref="disableOnHolidays"/>Disable on Holidays</label>
              </div>
            </div>
          </div>

          <br/>

          <div className="row">
            <div className="col-md-6">
              <button
                className="btn btn-md btn-block btn-success"
                type="submit">Create Composite PG Ratecard</button>

              <div className="col-md-6 form-group">
                or <Link to={routes.ROOT_PATH}>cancel</Link>
              </div>
            </div>
          </div>

        </Form>
      </div>
  )}
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePG);