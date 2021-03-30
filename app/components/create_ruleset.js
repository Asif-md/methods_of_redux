import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { mapStateToProps, mapDispatchToProps } from "stateToProps";
import Form from "components/form";
import RulesFormBox from "components/rules_form_box";
import { extractRuleFromStore } from "utils/extract_data_from_store";
import { dateStringToISO } from "utils/helpers";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";
import RateTemplateModal from "components/rate_card_template_modal";

import * as routes from "routes";

class CreateRuleset extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      openModal: false,
      isAddRuleEnabled: false,
      shortId: "",
      rateCardTemplateId: "",
      name: ""
    };
  }




  componentWillUnmount() {
    this.props.locationChange();

  }

  onSelection = (id, shortId) => {
    this.setState({ rateCardTemplateId: id, shortId, openModal: false });
  };

  getData = () => {
    const rules = this.getRules();
    const ruleset = this.getRuleset();
    return {
      ruleset,
      rules
    };
  };

  getRuleset = () => {
    const {
      name,
      forEvent,
      merchantFilter,
      providerNameFilter,
      pgIdFilter,
      filterExpression,
      effectiveFrom,
      effectiveTo
    } = this.refs;
    let data = {
      name: name.value,
      forEvent: forEvent.value,
      pgIdFilter: pgIdFilter.value,
      merchantFilter: merchantFilter.value,
      filterExpression: filterExpression.value,
      providerNameFilter: providerNameFilter.value,
      effectiveTo: dateStringToISO(effectiveTo.value),
      effectiveFrom: dateStringToISO(effectiveFrom.value)
    };
    if (this.state.rateCardTemplateId) {
      data.rateCardTemplateId = this.state.rateCardTemplateId;
    }
    return data;
  };

  getRules = () => {
    return this.props.newRuleset.rules.map(extractRuleFromStore);
  };

  onAddRule = event => {
    event.preventDefault();
    if (!this.state.isAddRuleEnabled) {
      this.setState({ isAddRuleEnabled: true });
      return;
    } else {
      const index = Date.now();
      this.props.addRule(index);
    }
  };

  render() {
    return (
      <div className="page-container">
        <Form
          {...this.props}
          serializeForm={this.getData}
          submitAction={this.props.createRuleset}
        >
          <h1 className="page-header">
            <span className="required-message">All fields are required</span>
            Create Ruleset
          </h1>

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
                        <label className="control-label">Name:</label>
                        <input
                          className="form-control"
                          type="text"
                          required={true}
                          ref="name"
                          onChange={this.handleChange}
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">For Event:</label>
                        <input
                          className="form-control"
                          type="text"
                          required={true}
                          ref="forEvent"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">
                          Merchant Filter:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required={false}
                          ref="merchantFilter"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">
                          Provider Name Filter:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required={false}
                          ref="providerNameFilter"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">Pg Id Filter:</label>
                        <input
                          className="form-control"
                          type="text"
                          required={false}
                          ref="pgIdFilter"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">
                          Filter Expression:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required={false}
                          ref="filterExpression"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">effectiveFrom:</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="DD/MM/YYYY 12:00 am"
                          defaultValue={getDefaultEffectiveFrom()}
                          ref="effectiveFrom"
                        />
                      </div>
                      <p className="lead clearfix" />
                      <div className="form-group">
                        <label className="control-label">Effective To:</label>
                        <input
                          className="form-control"
                          type="text"
                          placeholder="DD/MM/YYYY 12:00 am"
                          defaultValue={getDefaultEffectiveTo()}
                          ref="effectiveTo"
                        />
                      </div>
                      <div className="form-group">
                        <label className="control-label">
                          Rate Card Template:
                        </label>
                        <input
                          className="form-control"
                          type="text"
                          required={false}
                          onChange={() => null}
                          value={this.state.shortId}
                          ref="shortID"
                        />
                      </div>
                      <p className="lead clearfix" />
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
                    </div>
                  </div>
                </div>
              </fieldset>
            </div>
          </div>

          {this.state.isAddRuleEnabled && (
            <RulesFormBox ref="rules" {...this.props} />
          )}

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

          <p className="lead clearfix" />

          <div className="form-group">
            <button className="btn btn-lg btn-block btn-success" type="submit">
              Create Ruleset
            </button>
          </div>

          <div className="form-group">
            or <Link to={routes.ROOT_PATH}>cancel</Link>
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
)(CreateRuleset);
