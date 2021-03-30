import React from "react";
import CommonRuleBox from "components/common_rule_box";
import EntryTypeFormGroup from "components/entry_type_form_group";
import PartySearchFormGroup from "components/party_search_form_group";

class AccountingEntryRule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterExpression: false
      // timeBasedWaiver: false,
      // countBasedWaiver: false,
      // waiver: false
    };
  }
  getData = () => {
    const {
      name,
      entryFor,
      txnType,
      entryType,
      toPartySearch,
      fromPartySearch,
      filterExpressionText
    } = this.refs;

    const {
      partyType: toPartyType,
      isExpression: toExpression
    } = toPartySearch.getData();
    const {
      partyType: fromPartyType,
      isExpression: fromExpression
    } = fromPartySearch.getData();
    return {
      ...entryType.getData(),
      name: name.value,

      entryFor: entryFor.value,
      transactionType: txnType.value,
      toPartyType,
      toExpression,
      fromPartyType,
      fromExpression,
      filterExpression: this.state.filterExpression
        ? filterExpressionText.value
        : ""
    };
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.id]: !this.state[event.target.id] });
  };

  getRules = () => {
    return this.props.newRuleset.rules.map(extractRuleFromStore);
  };

  render() {
    return (
      <div className="row">
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

          {/* Filter Expression */}
          <div className="form-group checkbox">
            <label>
              <input
                type="checkbox"
                id="filterExpression"
                checked={this.state.filterExpression ? true : false}
                onChange={this.onChangeCheckbox}
                ref="filterExpression"
              />
              Filter
            </label>
          </div>
          {this.state.filterExpression && (
            <div className="form-group">
              <label className="control-label">Filter Expression:</label>
              <input
                className="form-control"
                type="text"
                required={true}
                // defaultValue={preFilledTemplate.filterExpression}
                onChange={this.props.onRuleChange}
                ref="filterExpressionText"
              />
            </div>
          )}

          <p className="lead clearfix" />

          <PartySearchFormGroup
            ref="fromPartySearch"
            index={this.props.index}
            forComponent="new_ruleset"
            searchingFor="FromParty"
            hasExpression={true}
            required={false}
            searchResult={this.props.rule.fromPartySearchResult}
            multiFindInput={this.props.multiFindInput}
            multiFindSearch={this.props.multiFindSearch}
            multiFindLock={this.props.multiFindLock}
            editLock={this.props.editLock}
            multiFindClear={this.props.multiFindClear}
          />
        </div>
        <div className="col-md-6">
          <PartySearchFormGroup
            ref="toPartySearch"
            index={this.props.index}
            forComponent="new_ruleset"
            searchingFor="ToParty"
            hasExpression={true}
            required={false}
            searchResult={this.props.rule.toPartySearchResult}
            multiFindInput={this.props.multiFindInput}
            multiFindSearch={this.props.multiFindSearch}
            multiFindLock={this.props.multiFindLock}
            editLock={this.props.editLock}
            multiFindClear={this.props.multiFindClear}
          />
          <EntryTypeFormGroup
            ref="entryType"
            onChange={this.props.onRuleChange}
          />
        </div>
      </div>
    );
  }
}

export default AccountingEntryRule;
