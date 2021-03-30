import React from "react";
import CommonRuleBox from "components/common_rule_box";
import EntryTypeFormGroup from "components/entry_type_form_group";
import MerchantSearchFormGroup from "components/merchant_search_form_group";

class SlabbedFixedCommissionRule extends React.Component {
  getData = () => {
    const { commonRule, entryType, merchantSearch } = this.refs;

    return {
      commissions: this.props.getSlabs(),
      ...merchantSearch.getData(),
      ...entryType.getData(),
      ...commonRule.getData()
    };
  };

  render() {
    return (
      <div className="row">
        <CommonRuleBox ref="commonRule" {...this.props} />
        <div className="col-md-6">
          <EntryTypeFormGroup
            ref="entryType"
            onChange={this.props.onRuleChange}
          />

          <MerchantSearchFormGroup
            ref="merchantSearch"
            index={this.props.index}
            searchResult={this.props.rule.merchantSearchResult}
            searchAction={this.props.searchMerchant}
            lockAction={this.props.lockMerchantSearch}
          />

          <p className="lead remove-margin">Slabs</p>
          <hr />
          <div className="row">
            <div className="col-md-3">
              <label className="control-label">From ( paisa ) :</label>
            </div>
            <div className="col-md-3">
              <label className="control-label">To ( paisa ) :</label>
            </div>
            <div className="col-md-2">
              <label className="control-label">Fee ( % value ) :</label>
            </div>
            <div className="col-md-2" />
          </div>
          {this.props.renderSlabs()} 
        </div>
      </div>
    );
  }
}

export default SlabbedFixedCommissionRule;
