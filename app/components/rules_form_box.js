import React from 'react';
import RuleFormBox from 'components/rule_form_box';

class RulesFormBox extends React.Component {

  renderRule = (rule, index) => {
    var key = `rule-${rule.timestamp}`;
    return (
      <RuleFormBox
        key={key}
        index={index}
        rule={rule}
        ruleType={this.props.ruleType}
        selectedData={this.props.selectedData}
        editLock={this.props.editLock}
        multiFindInput={this.props.multiFindInput}
        multiFindSearch={this.props.multiFindSearch}
        multiFindLock={this.props.multiFindLock}
        multiFindClear={this.props.multiFindClear}

        searchMerchant={this.props.searchMerchant}
        lockMerchantSearch={this.props.lockMerchantSearch}

        interchanges={this.props.interchanges}
        taxAccounts={this.props.taxAccounts}
        taxes={this.props.taxes}
        cesses={this.props.cesses}
        changeRule={this.props.changeRule}
        removeRule={this.props.removeRule}
      />
    );
  }

  renderRules = () => {
    const rules = this.props.newRuleset.rules;
    return rules.map(this.renderRule);
  }

  render() {
    const ruleNodes = this.renderRules();
    return (
      <div>
        {ruleNodes}
      </div>
    );
  }
}

export default RulesFormBox;
