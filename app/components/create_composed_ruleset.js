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
import * as rules from "components/rules/rule_types";
import getRuleComponent from "components/rules/index";
import Templates from "../preFilledTemplates";
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
      shortId: "",
      slabs: [this.getNewSlabRef()],
    };
  }
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
  onRuleChange = event => {
    if (event) {
      event.preventDefault();
    }

    // this.setState({ [event.target.name]: event.target.value });

    // this.props.changeRule(this.props.index, this.getData());
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

  getNewSlabRef = () => {
    const index = Date.now();
    return `slab-${index}`;
  };


  // getData = () => {
  //   const { type, rule } = this.refs;
  //   const ruleData = rule ? rule.getData() : {};
  //   return {
  //     type: type.value,
  //     ...ruleData
  //   };
  // };

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
  onSelection = (id, shortId) => {
    this.setState({ rateCardTemplateId: id, shortId, openModal: false });
  };

  render() {
    const ruleComponentNode = this.renderRuleComponent();
    return (
      <div className="page-container">
       
      

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
                      <option value="">Select Ruleset Type</option>
                     
                        <option>{rules.COMPOSED_MERCHANT_RULE_SET}</option>
                       <option>{rules.COMPOSED_CAMPAIGN_RULE_SET}</option>
                      
                    </select>
                  </div>
                </div>
              </div>
              {Templates.templateRuleSetList.indexOf(this.state.ruleType) !==
                -1 && this.renderPrefillSelect()}
              {ruleComponentNode}
            </div>



        
  
       
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateComposedMerchantRuleset);
