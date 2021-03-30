/**
 * @author ashwin.raghavan
 */
import React from "react";
import { connect } from "react-redux";
import { mapStateToProps, mapDispatchToProps } from 'stateToProps';
import Boolean from "components/boolean";
import PleaseWait from "components/please_wait";
import BackLink from "components/back_link";
import {LIST_RULESETS_PATH} from "routes";
import {isoToDateString} from "utils/helpers";
import getRuleComponentForShow from "components/show_rules/index";

class ShowRuleset extends React.Component{
  componentDidMount() {
    const {params} = this.props.match;
    params && params.rulesetId && this.props.showRuleset(params.rulesetId);
  }

  onApprove = (ruleset, event) => {
    event.preventDefault();

    const { attemptApprove } = this.props;
    attemptApprove('ruleset', ruleset);
  }

  onActivateRuleset = (ruleset, event) => {
    event.preventDefault();

    const { attemptActivate } = this.props;
    attemptActivate('ruleset', ruleset);
  }

  onDeactivateRuleset = (ruleset, event) => {
    event.preventDefault();

    const { attemptDeactivate } = this.props;
    attemptDeactivate('ruleset', ruleset);
  }

  onActivateFilter = (filter, index, event) => {
    event.preventDefault();

    const { attemptActivate } = this.props;
    attemptActivate(
      'filter',
      filter,
      {
        index
      }
    );
  }

  onDeactivateFilter = (filter, index, event) => {
    event.preventDefault();

    const { attemptDeactivate } = this.props;
    attemptDeactivate(
      'filter',
      filter,
      {
        index
      }
    );
  }

  onApproveRule = (rule, index, event) => {
    event.preventDefault();

    const { attemptApprove: attemptApproveAction } = this.props;
    attemptApproveAction(
      'rule',
      rule,
      {
        ruleType: rule.type,
        index
      }
    );
  }

  onActivateRule = (rule, index, event) => {
    event.preventDefault();

    const { attemptActivate } = this.props;
    attemptActivate(
      'rule',
      rule,
      {
        ruleType: rule.type,
        index
      }
    );
  }

  onDeactivateRule = (rule, index, event) => {
    event.preventDefault();

    const { attemptDeactivate } = this.props;
    attemptDeactivate(
      'rule',
      rule,
      {
        ruleType: rule.type,
        index
      }
    );
  }

  renderRulesetHeader = (ruleset) => {
    const onApprove = this.onApprove.bind(null, ruleset);
    const onActivate = this.onActivateRuleset.bind(null, ruleset);
    const onDeactivate = this.onDeactivateRuleset.bind(null, ruleset);

    return (
      <div className="clearfix">
        <div className="btn-toolbar pull-right">
          <BackLink to={LIST_RULESETS_PATH} />
          <a className="btn btn-sm btn-success" href="#" onClick={onApprove}>
            Approve
          </a>
          <a className="btn btn-sm btn-primary" href="#" onClick={onActivate}>
            Activate
          </a>
          <a className="btn btn-sm btn-danger" href="#" onClick={onDeactivate}>
            De-activate
          </a>
        </div>
        <h1 className="page-header">
          Ruleset Details:<br/>
          <small>{ruleset.name}</small>
        </h1>
      </div>
    );
  }

  renderRulesetPanel = (ruleset) => {
    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <fieldset>
            <legend data-toggle="collapse" data-target="#collapseExample1" aria-expanded="false" aria-controls="collapseExample">
              Ruleset - <small>{ruleset.name}</small>
            </legend>
            <div className="collapse in" id="collapseExample1">
              <div className="form-group">
                <Boolean
                  flag={ruleset.approved}
                  trueText="Approved"
                  falseText="Un-Approved"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
                <Boolean
                  flag={ruleset.active}
                  trueText="Activated"
                  falseText="De-activated"
                  trueStatus="label-success details"
                  falseStatus="label-danger details" />
              </div>
              <div className="form-group">
                <label className="control-label text-muted">Event Name:</label>
                <span className="details">{ruleset.forEvent}</span>
              </div>
              <div className="form-group">
                <label className="control-label text-muted">Priority:</label>
                <span className="details">{ruleset.priority}</span>
              </div>
              <div className="form-group">
                <div className="row">
                  <div className="col-sm-6 col-md-4">
                    <label className="control-label text-muted">Effective From:</label>
                    <input
                      className="form-control" type="text"
                      placeholder="DD/MM/YYYY 12:00 am"
                      required = {true}
                      ref="effectiveFrom"/>
                  </div>
                  <div className="col-sm-6 col-md-4">
                    <label className="control-label text-muted">Effective To:</label>
                    <span className="details">{isoToDateString(ruleset.effectiveTo)}</span>
                  </div>
                </div>
              </div>
            </div>
          </fieldset>
        </div>
      </div>
    );
  }

  renderFilterPanel = (filter, index) => {
    const onActivate = this.onActivateFilter.bind(null, filter, index);
    const onDeactivate = this.onDeactivateFilter.bind(null, filter, index);

    return (
      <div key={`filter-${filter.id}`}>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse" data-target="#collapseExample2" aria-expanded="false" aria-controls="collapseExample">
                <div className="btn-toolbar pull-right">
                  <a className="btn btn-sm btn-primary" href="#" onClick={onActivate}>
                    Activate
                  </a>
                  <a className="btn btn-sm btn-danger" href="#" onClick={onDeactivate}>
                    De-activate
                  </a>
                </div>
                Filter - <small>{filter.name}</small>
              </legend>
              <div className="collapse in" id="collapseExample2">
                <div className="row">
                  <div className="col-md-12">
                    <div className="form-group">
                      <label className="control-label text-muted">Status:</label>
                      <br/>
                      <Boolean
                        flag={filter.active}
                        trueText="Activated"
                        falseText="De-activated"
                        trueStatus="label-success details"
                        falseStatus="label-danger details" />
                    </div>
                    <div className="form-group">
                      <label className="control-label text-muted">Expression:</label>
                      <span className="details">{filter.expression}</span>
                    </div>
                  </div>
                </div>
              </div>
            </fieldset>
          </div>
        </div>
        <br/>
      </div>
    );
  }

  renderRulePanel = (rule, index) => {
    const onApprove = this.onApproveRule.bind(null, rule, index);
    const onActivate = this.onActivateRule.bind(null, rule, index);
    const onDeactivate = this.onDeactivateRule.bind(null, rule, index);
    const ShowRule = getRuleComponentForShow(rule.type);

    return (
      <div key={`rule-${rule.id}`}>
        <div className="panel panel-default">
          <div className="panel-body">
            <fieldset>
              <legend data-toggle="collapse" data-target="#collapseExample3" aria-expanded="false" aria-controls="collapseExample">
                <div className="btn-toolbar pull-right">
                  <a className="btn btn-sm btn-success" href="#" onClick={onApprove}>
                    Approve
                  </a>
                  <a className="btn btn-sm btn-primary" href="#" onClick={onActivate}>
                    Activate
                  </a>
                  <a className="btn btn-sm btn-danger" href="#" onClick={onDeactivate}>
                    De-activate
                  </a>
                </div>
                Rule - <small>{rule.name}</small>
              </legend>

              <ShowRule rule={rule} />

            </fieldset>
          </div>
        </div>
        <br/>
      </div>
    );
  }

  renderFilterPanels = (ruleset) => {
    return (
      <div>
        {ruleset.filters.map(this.renderFilterPanel)}
      </div>
    );
  }

  renderRulePanels = (ruleset) => {
    return (
      <div>
        {ruleset.rules.map(this.renderRulePanel)}
      </div>
    );
  }

  renderRuleset = () => {
    const ruleset = this.props.ruleset;

    return (
      <div>
        {this.renderRulesetHeader(ruleset)}
        <br/>
        {this.renderRulesetPanel(ruleset)}
        <br/>
        {this.renderFilterPanels(ruleset)}
        <br/>
        {this.renderRulePanels(ruleset)}
      </div>
    );
  }

  renderData = () => {
    if (Object.keys(this.props.ruleset).length) {
      return this.renderRuleset();
    } else {
      return (
        <PleaseWait message="Loading" />
      );
    }
  }

  render() {
    return (
      <div className="page-container">
        {this.renderData()}
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ShowRuleset);
