import React from "react";
import PayerSearchFormGroup from "components/payer_search_form_group";
import { getDefaultEffectiveFrom, getDefaultEffectiveTo } from "utils/helpers";

class CommonRuleBox extends React.Component {
  getData = () => {
    const {
      name,
      entryFor,
      txnType,
      effectiveFrom,
      effectiveTo,
      priority,
      payerSearch
    } = this.refs;

    return {
      name: name.value,
      entryFor: entryFor.value,
      txnType: txnType.value,
      effectiveFrom: effectiveFrom.value,
      effectiveTo: effectiveTo.value,
      priority: priority.value,
      ...payerSearch.getData()
    };
  };

  render() {
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label className="control-label">Name:</label>
          <input
            className="form-control"
            type="text"
            required={true}
            onChange={this.props.onRuleChange}
            ref="name"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Entry For:</label>
          <input
            className="form-control"
            type="text"
            required={true}
            onChange={this.props.onRuleChange}
            ref="entryFor"
          />
        </div>
        <div className="form-group">
          <label className="control-label">Transaction Type:</label>
          <input
            className="form-control"
            type="text"
            required={true}
            onChange={this.props.onRuleChange}
            ref="txnType"
          />
        </div>
        <div className="form-group">
          <div className="row">
            <div className="col-sm-4 col-md-6">
              <label className="control-label">Effective From:</label>
              <input
                className="form-control"
                type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveFrom()}
                required={true}
                onChange={this.props.onRuleChange}
                ref="effectiveFrom"
              />
            </div>
            <div className="col-sm-4 col-md-6">
              <label className="control-label">Effective To:</label>
              <input
                className="form-control"
                type="text"
                placeholder="DD/MM/YYYY 12:00 am"
                defaultValue={getDefaultEffectiveTo()}
                required={true}
                onChange={this.props.onRuleChange}
                ref="effectiveTo"
              />
            </div>
          </div>
        </div>
        <div className="form-group">
          <label className="control-label">Priority:</label>
          <input
            className="form-control"
            type="number"
            required={true}
            min="0"
            step="1"
            onChange={this.props.onRuleChange}
            ref="priority"
          />
        </div>

        <PayerSearchFormGroup
          ref="payerSearch"
          index={this.props.index}
          forComponent="new_ruleset"
          hasExpression={this.props.hasExpression}
          payerSearchResult={this.props.rule.payerSearchResult}
          multiFindInput={this.props.multiFindInput}
          multiFindSearch={this.props.multiFindSearch}
          multiFindLock={this.props.multiFindLock}
          multiFindClear={this.props.multiFindClear}
        />
        {this.props.children}
      </div>
    );
  }
}

CommonRuleBox.defaulProps = {
  hasExpression: false
};

export default CommonRuleBox;
