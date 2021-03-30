import React from "react";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";

class Ruleset extends React.Component{
  getData = () => {
    const {
      name,
      eventName,
      order,
      effectiveFrom,
      effectiveTo
    } = this.refs;

    return {
      name: name.value,
      eventName: eventName.value,
      order: order.value,
      effectiveFrom: effectiveFrom.value,
      effectiveTo: effectiveTo.value
    };
  }

  render() {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <fieldset>
            <legend data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">Ruleset</legend>
            <div className="collapse in" id="collapseExample1">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label">Name:</label>
                    <input
                      className="form-control" type="text"
                      required = {true}
                      ref="name"/>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Event Name:</label>
                    <input
                      className="form-control" type="text"
                      required = {true}
                      ref="eventName"/>
                  </div>
                  <div className="form-group">
                    <label className="control-label">Order:</label>
                    <input
                      className="form-control" type="number"
                      required = {true} min="0" step="1"
                      ref="order"/>
                  </div>
                </div>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-md-3">
                    <label className="control-label">Effective From:</label>
                    <input
                      className="form-control" type="text"
                      placeholder="DD/MM/YYYY 12:00 am"
                      defaultValue={getDefaultEffectiveFrom()}
                      required = {true}
                      ref="effectiveFrom"/>
                  </div>
                  <div className="col-sm-6 col-md-3">
                    <label className="control-label">Effective To:</label>
                    <input
                      className="form-control" type="text"
                      placeholder="DD/MM/YYYY 12:00 am"
                      defaultValue={getDefaultEffectiveTo()}
                      required = {true}
                      ref="effectiveTo"/>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

export default Ruleset;
