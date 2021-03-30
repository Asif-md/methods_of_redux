import React from "react";
import * as rules from "components/rules/rule_types";
import getRuleComponent from "components/rules/index";
import RuleSlab from "components/rule_slab";
import RateCardRuleSlab from "components/rate_card_rule_slab";
import TaxAccountFormGroup from "components/tax_account_form_group";
import PleaseWait from "components/please_wait";
import Templates from "../preFilledTemplates";

class RuleFormBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ruleType: null,
      ruleComponent: null,
      slabs: [this.getNewSlabRef()],
      taxable: false,
      preFilledTemplate: Templates.templateListValue.DEFAULT
    };
  }

  getData = () => {
    const { type, rule } = this.refs;
    const ruleData = rule ? rule.getData() : {};
    return {
      type: type.value,
      ...ruleData
    };
  };

  getSlabs = () => {
    const slabRefs = this.state.slabs;
    const ruleRefs = this.refs.rule.refs;

    return slabRefs.map(sr => ruleRefs[sr].getData());
  };

  onRuleTypeChange = event => {
    event.preventDefault();

    const ruleType = event.target.value;
    const ruleComponent = getRuleComponent(ruleType);

    this.setState({
      ruleComponent,
      ruleType,
      slabs: [this.getNewSlabRef()]
    });

    this.onRuleChange();
  };

  onPrefillTemplateChange = event => {
    event.preventDefault();
    let index = this.props.index;
    this.setState(
      {
        preFilledTemplate: Templates.templateListValue[event.target.value] || {}
      },
      () => {
        this.props.multiFindInput(
          "new_ruleset",
          "ToParty",
          "Expression",
          this.state.preFilledTemplate.toParty,
          "Interchange",
          { index },
          true
        );
        this.props.multiFindSearch(
          "new_ruleset",
          "FromParty",
          "Interchange",
          this.state.preFilledTemplate.fromParty,
          { index },
          true
        );
        setTimeout(() => {
          this.props.multiFindLock(
            "new_ruleset",
            "ToParty",
            "Expression",
            0,
            index
          );
        }, 1500);
        this.onRuleChange();
      }
    );
  };

  onRuleChange = event => {
    if (event) {
      event.preventDefault();
    }

    // this.setState({ [event.target.name]: event.target.value });

    this.props.changeRule(this.props.index, this.getData());
  };

  getNewSlabRef = () => {
    const index = Date.now();
    return `slab-${index}`;
  };

  onAddSlab = event => {
    event.preventDefault();

    this.setState({ slabs: [...this.state.slabs, this.getNewSlabRef()] });
  };

  removeSlab = slabIndex => {
    const oldSlabs = this.state.slabs;
    const index = oldSlabs.indexOf(slabIndex);

    if (this.props.ruleType === "rateCard" && oldSlabs.length === 1) {
      return;
    }
    this.setState({
      slabs: [
        ...this.state.slabs.slice(0, index),
        ...this.state.slabs.slice(index + 1)
      ]
    });
  };

  onTaxableToggle = event => {
    const taxable = event.target.checked;
    this.setState({
      taxable
    });
  };

  renderRuleComponent = () => {
    const RuleComponent = this.state.ruleComponent;
    if (RuleComponent) {
      return (
        <RuleComponent
          ref="rule"
          index={this.props.index}
          rule={this.props.rule}
          editLock={this.props.editLock}
          multiFindInput={this.props.multiFindInput}
          multiFindSearch={this.props.multiFindSearch}
          multiFindLock={this.props.multiFindLock}
          multiFindClear={this.props.multiFindClear}
          searchMerchant={this.props.searchMerchant}
          lockMerchantSearch={this.props.lockMerchantSearch}
          interchanges={this.props.interchanges}
          onRuleChange={this.onRuleChange}
          onAddSlab={this.onAddSlab}
          renderSlabs={this.renderSlabs}
          getSlabs={this.getSlabs}
          taxable={this.state.taxable}
          renderTaxableFieldset={this.renderTaxableFieldset}
          onTaxableToggle={this.onTaxableToggle}
          preFilledTemplate={this.state.preFilledTemplate}
        />
      );
    } else {
      return null;
    }
  };

  renderSlab = (slab, index) => {
    const Slab =
      this.props.ruleType === "rateCard" ? RateCardRuleSlab : RuleSlab;
    return (
      <Slab
        ref={slab}
        key={slab}
        index={slab}
        rateCardRuleType={this.state.ruleType}
        onRuleChange={this.onRuleChange}
        onAddSlab={this.onAddSlab}
        removeSlab={this.removeSlab}
      />
    );
  };

  renderSlabs = () => {
    return this.state.slabs.map(this.renderSlab);
  };

  renderTaxes = () => {
    const taxes = this.props.taxes;

    if (taxes.length === 0) {
      return <PleaseWait style="inline" />;
    } else {
      return (
        <select
          className="form-control"
          required={true}
          onChange={this.onRuleChange}
          ref="taxIds"
          multiple
        >
          {taxes.map(tax => {
            return (
              <option key={`tax-option-${tax.id}`} value={tax.id}>
                {tax.name}
              </option>
            );
          })}
        </select>
      );
    }
  };

  renderCesses = () => {
    const cesses = this.props.cesses;
    if (cesses.length === 0) {
      return <PleaseWait style="inline" />;
    } else {
      return (
        <select
          className="form-control"
          required={false}
          onChange={this.onRuleChange}
          ref="cessIds"
          multiple
        >
          {cesses.map(cess => {
            return (
              <option key={`cess-option-${cess.id}`} value={cess.id}>
                {cess.name}
              </option>
            );
          })}
        </select>
      );
    }
  };

  renderTaxableFieldset = () => {
    if (this.state.taxable) {
      return (
        <fieldset>
          <div className="form-group">
            <label className="control-label">Taxes:</label>
            {this.renderTaxes()}
          </div>

          <div className="form-group">
            <label className="control-label">Cesses:</label>
            {this.renderCesses()}
          </div>

          <TaxAccountFormGroup
            ref="taxAccount"
            taxAccounts={this.props.taxAccounts}
            onChange={this.onRuleChange}
          />
        </fieldset>
      );
    } else {
      return null;
    }
  };

  renderPrefillSelect = () => {
    return (
      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label className="control-label">Prefilled Templates:</label>
            <select
              className="form-control"
              required={false}
              onChange={this.onPrefillTemplateChange}
              ref="templateType"
            >
              <option value="">Select Prefilled Templates</option>
              {Templates.templateList.map(type => {
                return <option key={`sub-option-${type}`}>{type}</option>;
              })}
            </select>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const ruleComponentNode = this.renderRuleComponent();

    return (
      <div className="panel panel-default">
        <div className="panel-body">
          <fieldset>
            <legend
              data-toggle="collapse"
              data-target="#collapseExample3"
              aria-expanded="false"
              aria-controls="collapseExample"
            >
              Rule
              <div className="pull-right">
                <button
                  className="btn btn-danger"
                  onClick={() => {
                    this.props.removeRule(this.props.index);
                  }}
                >
                  <span className="glyphicon glyphicon-minus" />
                </button>
              </div>
            </legend>

            <div className="collapse in" id="collapseExample3">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label className="control-label">Rule Types:</label>
                    <select
                      className="form-control"
                      required={true}
                      defaultValue={""}
                      onChange={this.onRuleTypeChange}
                      ref="type"
                    >
                      <option value="">Select Rule Type</option>
                      {this.props.ruleType === "rateCard" && (
                        <option>{rules.BASIC_RATE_CARD_RULE}</option>
                      )}
                      <option>{rules.PRE_CALCULATED_RATE_CARD_RULE}</option>
                      {/* {this.props.ruleType === "rateCard" && (
                        <option>{rules.COUNT_BASED_RATE_CARD_RULE}</option>
                      )} */}
                      {/* <option>{rules.FIXED_COMMISSION_RULE}</option>
                          <option>{rules.FIXED_INTERCHANGE_FEE_RULE}</option>
                          <option>{rules.FIXED_RATE_COMMISSION_RULE}</option>
                          <option>{rules.FIXED_RATE_INTERCHANGE_FEE_RULE}</option>
                          <option>{rules.SLABBED_FIXED_COMMISSION_RULE}</option>
                          <option>{rules.SLABBED_FIXED_INTERCHANGE_FEE_RULE}</option>
                          <option>{rules.SLABBED_FIXED_RATE_COMMISSION_RULE}</option>
                          <option>{rules.SLABBED_FIXED_RATE_INTERCHANGE_FEE_RULE}</option>  */}
                      {this.props.ruleType !== "rateCard" && (
                        <option>{rules.ACCOUNT_ENTRY_RULE}</option>
                      )}
                    </select>
                  </div>
                </div>
              </div>
              {Templates.templateRuleSetList.indexOf(this.state.ruleType) !==
                -1 && this.renderPrefillSelect()}
              {ruleComponentNode}
            </div>
          </fieldset>
        </div>
      </div>
    );
  }
}

RuleFormBox.defaultProps = {
  ruleType: ""
};

export default RuleFormBox;
